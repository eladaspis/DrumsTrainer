import spotipy
import pandas as pd
from spotipy.oauth2 import SpotifyClientCredentials
from models.song import Song


class SongsLoader:

    def __init__(self, client_id, client_server):
        client_credentials_manager = SpotifyClientCredentials(client_id, client_server)
        self.spotify_account = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    def load(self):
        playlist_id = '359KGrfJm6irmJh0tIM6XH'
        df = self.get_playlist_df(playlist_id)
        self._save_df_on_db(df)

    def _get_playlist_by_id(self, playlist_id):
        results = self.spotify_account.playlist(playlist_id)
        return results

    def get_playlist_df(self, playlist_id):
        results = self._get_playlist_by_id(playlist_id)
        ids = []
        for item in results['tracks']['items']:
                track = item['track']['id']
                ids.append(track)

        song_meta = {
            'id': [],
            'album': [],
            'name': [],
            'artist': [],
        }

        for song_id in ids:
            meta = self.spotify_account.track(song_id)
            song_meta['id'].append(song_id)

            album = meta['album']['name']
            song_meta['album'] += [album]

            song = meta['name']
            song_meta['name'] += [song]

            s = ', '
            artist = s.join([singer_name['name'] for singer_name in meta['artists']])
            song_meta['artist'] += [artist]



        song_meta_df = pd.DataFrame.from_dict(song_meta)

        features = self.spotify_account.audio_features(song_meta['id'])
        features_df = pd.DataFrame.from_dict(features)

        # convert milliseconds to mins
        # duration_ms: The duration of the track in milliseconds.
        # 1 minute = 60 seconds = 60 × 1000 milliseconds = 60,000 ms
        features_df['duration_ms']=features_df['duration_ms']/60000

        # combine two dataframe
        df = song_meta_df.merge(features_df)
        return df

    def _save_df_on_db(self, df):
        selected_columns = ['name', 'artist', 'album', 'tempo', 'time_signature']
        for name, artist, album, tempo, time_signature in df[selected_columns].to_numpy():
            song = Song(
                name=name,
                artist=artist,
                album=album,
                tempo=tempo,
                time_signature=time_signature
            ).save()



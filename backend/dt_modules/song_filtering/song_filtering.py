from dt_modules.songs_loader.songs_loader import SongsLoader
from models.song import Song


class SongsFiltering:
    songs_loader: SongsLoader

    def __init__(self, songs_loader: SongsLoader):
        self.spotify_account = songs_loader

    @staticmethod
    def sort_by_tempo_and_signature(tempo: float, offset: float, time_signature: int):
        raw_query = {'tempo': {'$gte': tempo - offset, '$lt': tempo + offset}, 'time_signature': {'$eq': time_signature}}
        # raw_query = {'time_signature': {'$eq': time_signature}}
        filtered_songs = Song.objects.filter(__raw__=raw_query)
        # current_user_id = User.objects.filter(id=ObjectId(current_user_id))
        return filtered_songs

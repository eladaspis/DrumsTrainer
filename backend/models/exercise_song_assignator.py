from mongoengine import Document, StringField, EmbeddedDocumentField, FloatField

from dt_modules.song_filtering.song_filtering import SongsFiltering
from models.exercise.adaptive_exercise import AdaptiveExercise
from models.song import Song


class ExerciseSongAssignator(Document):
    current_user = StringField(required=True)
    exercise = EmbeddedDocumentField(AdaptiveExercise)
    current_song = Document(Song)
    history_of_chosen_songs = set()

    def fit_exercise_to_songs(self):
        suitable_songs = SongsFiltering.sort_by_tempo_and_signature(
            tempo=self.exercise.tempo,
            offset=10,
            time_signature=self.exercise.time_signature
        )
        return suitable_songs

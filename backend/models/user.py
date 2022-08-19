from mongoengine import ListField, EmbeddedDocument, StringField, IntField, Document, EmbeddedDocumentField, ObjectIdField
from mongoengine.base import EmbeddedDocumentList

from models.exercise.adaptive_exercise import AdaptiveExercise
from models.song import Song


class User(Document):

    songs_id = ListField(ObjectIdField())

    def add_song(self, song: Song):
        if song.id not in self.songs_id:
            self.songs_id += [song.id]

    def find_suitable_song(self, exercise: AdaptiveExercise):
        suitable_songs = []
        if exercise.user_id == self._id:
            for song in self.songs:
                if exercise.current_tempo - 10 < song.tempo < exercise.current_tempo + 10:
                    suitable_songs += song
        return suitable_songs


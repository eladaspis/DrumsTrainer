from mongoengine import Document, StringField, EmbeddedDocumentField, FloatField

from models.exercise.base_exercise import BaseExercise


class AdaptiveExercise(BaseExercise):
    user_id = StringField(required=True)
    tempo = FloatField(default=100.0)

    def set_tempo(self, new_tempo):
        self.tempo = new_tempo

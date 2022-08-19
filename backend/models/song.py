# from bson import ObjectId
from mongoengine import StringField, IntField, FloatField, Document


class Song(Document):
    name = StringField()
    artist = StringField()
    album = StringField()
    tempo = FloatField()
    time_signature = IntField()

    def __str__(self):
        result = f"{self.name} by {self.artist}, in album: {self.album}. Tempo: {self.tempo}, Time Signature: {self.time_signature}"
        return result
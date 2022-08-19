from mongoengine import Document, StringField, IntField, ListField


class BaseExercise(Document):
    meta = {'allow_inheritance': True}
    name = StringField()
    notation = StringField()
    time_signature = IntField(required=True)
    categories = ListField(StringField(unique=True))

    def __str__(self):
        result = f"{self.name}, notation: {self.notation}, Time Signature: {self.time_signature}, categories: {self.categories}"
        return result



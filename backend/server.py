import os

from bson.objectid import ObjectId
from flask import Flask, jsonify, json, send_from_directory, request

from dt_modules.song_filtering.song_filtering import SongsLoader, SongsFiltering
from dt_modules.database.database import Database
from models.exercise.adaptive_exercise import AdaptiveExercise
from models.exercise.base_exercise import BaseExercise
from models.exercise.exercise_category import ExerciseCategory
from models.song import Song
from models.user import User

app = Flask(__name__)

@app.route('/get-click1')
def get_click1():
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               'click1.mp3', as_attachment=True)


@app.route('/get-exercises')
def get_exercises():
    exercises = AdaptiveExercise.objects()
    result = exercises.to_json()
    return result


@app.route('/get-exercise/<int:exercise_id>')
def get_exercise(exercise_id):
    exercises = BaseExercise.objects()
    exercise = exercises[exercise_id]
    result = exercise.to_json()
    return result

@app.route('/increase-tempo', methods=['POST'])
def increase_tempo():
    content = request.get_json(silent=True)
    # print(content)
    exercise = AdaptiveExercise.objects(id=ObjectId(content['user']))[0]
    exercise.set_tempo(content['tempo'])
    exercise.save()
    return '', 200

@app.route('/decrease-bpm/<int:usr_id>/<int:exercise_id>', methods=['POST'])
def decrease_bpm():
    exercise = AdaptiveExercise()
    exercise.decrease_tempo()

@app.route('/create-demo-exercise')
def create_demo_exercise():
    # exercise = BaseExercise(
    #     name='Single Strokes',
    #     notation="c c c '!accent!'c|c c c '!accent!'  c|",
    #     time_signature=100,
    #     categories=[ExerciseCategory.ACCENT.value, ExerciseCategory.TRIPLETS.value]
    # ).save()
    #
    # exercise = BaseExercise(
    #     name='Double Strokes',
    #     notation="c c c c|c c c '!accent!'  c|",
    #     time_signature=100,
    #     categories=[ExerciseCategory.ACCENT.value]
    # ).save()
    with open("./fixtures/exercises/single_strokes.txt") as file:
        notation = file.read()
    # exercise = BaseExercise(
    #     name='Single Strokes',
    #     notation=notation,
    #     time_signature=100,
    #     categories=[ExerciseCategory.ACCENT.value, ExerciseCategory.SINGLES.value]
    # ).save()

    exercise = AdaptiveExercise(
        name='Single Strokes',
        notation=notation,
        categories=[ExerciseCategory.ACCENT.value, ExerciseCategory.SINGLES.value],
        time_signature=4,
        tempo=123,
        user_id='demo_user'
    ).save()

    with open("./fixtures/exercises/double_strokes.txt") as file:
        notation = file.read()

    exercise = AdaptiveExercise(
        name='Double Strokes',
        notation=notation,
        categories=[ExerciseCategory.ACCENT.value],
        time_signature=5,
        tempo=83,
        user_id='demo_user'
    ).save()

    return jsonify('RESPONSE :)')
    # return jsonify(lines)


@app.route('/create-account')
def create_account():
    user = User().save()
    return 'a'


@app.route('/add-song-to-user/<user_id>/<song_id>')
def add_song_to_user(user_id: str, song_id: str):
    current_song = None
    if song := Song.objects(id=ObjectId(song_id))[0]:
        if user := User.objects(id=ObjectId(user_id))[0]:
            user.add_song(song)
            current_song = song
            user.save()
    return str(current_song)


@app.route('/load-songs/<client_id>/<client_secret>')
def load_songs(client_id: str, client_secret: str):
    client_id = '2ebc0e57e6474799a858baff2e24df70'
    client_secret = 'df0f973850a540afa281c06840a56723'
    songs_loader = SongsLoader(client_id, client_secret)
    songs_loader.load()


@app.route('/sort-songs/<tempo>/<offset>/<int:time_signature>')
def build_songs_sorter(tempo: float, offset: float, time_signature: int):
    filtered_songs = SongsFiltering.sort_by_tempo_and_signature(tempo=float(tempo), offset=float(offset), time_signature=time_signature)
    result = []
    for song in filtered_songs:
        result += [str(song)]
    return jsonify(result)


if __name__ == "__main__":
    db = Database()
    db.build_db()

    app.run(debug=True)


@app.after_request
def set_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    return response

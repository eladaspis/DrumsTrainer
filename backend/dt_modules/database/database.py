import logging
import os

from mongoengine import connect


class Database:

    def __init__(self):
        self.log = logging.getLogger(__name__)

    def build_db(self):
        connect(
            db="test",
            host=os.environ.get("MONGO_HOST", "localhost"),
            port=27017
        )
        self.log.debug("Database built")

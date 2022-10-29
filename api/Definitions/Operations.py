from pymongo import MongoClient
from bson.objectid import ObjectId
import random


class SuperCrud:

    #mongoport = random.randint(27017, 27019)
    #client = MongoClient('localhost', 27015, username='mongo', password='Jafra2018!')
    client = MongoClient('qpass-pro.pw', 27015, username='mongo', password='Jafra2018!')
    newdb = client['QPass-Pro']
    #collection = newdb['table']

    def get(self, table):

        collection = self.newdb[table]
        queryInfo = []

        for query in collection.find({}):
            query['_id'] = str(query['_id'])
            query['id'] = query['_id']
            del query['_id']
            queryInfo.append(query)

        return queryInfo

    def get_by_id(self, id, table):

        collection = self.newdb[table]
        try:
            query = collection.find_one({'_id': ObjectId(id)})
            query['id'] = str(query['_id'])
            del query['_id']

            return query

        except:

            return {'status': 'not found'}

    def create(self, data, table):

        collection = self.newdb[table]
        insert = collection.insert_one(data)
        return collection.find_one({'_id': insert.inserted_id})

    def update(self, id, data, table):

        collection = self.newdb[table]
        try:
            collection.find_one_and_update({'_id': ObjectId(id)}, {'$set': data})
            updt = collection.find_one({'_id': ObjectId(id)})
            updt['id'] = str(updt['_id'])
            del updt['_id']

            return updt

        except:

            return {'status': 'not found'}

    def delete(self, id, table):

        collection = self.newdb[table]
        remove = collection.find_one({'_id': ObjectId(id)})

        if remove is not None:

            collection.delete_one({'_id': ObjectId(id)})

            return {'status': 'deleted'}

        else:

            return {'status': 'not found'}

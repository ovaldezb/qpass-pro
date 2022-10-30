import uvicorn
import time
from typing import Union
from fastapi import FastAPI, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from Definitions.Operations import SuperCrud

# Mongo Connection-Operations
superCrud = SuperCrud()

# FastAPI Object
app = FastAPI(title='QPass-Pro', description='new release', version='1.1.3')

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/{item_id}')
async def index(request: Request, item_id):
    print('Sleeping for 10')

    print(await request.json())
    print(item_id)
    return {'message': 'tx completed'}

@app.get('/Usuarios')
async def get_users(request: Request):

    #print(await request.json())
    return superCrud.get(table='usuarios')

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5007, debug=True)



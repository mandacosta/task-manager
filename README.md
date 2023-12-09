# Task Manager🏁

#### Description:
Task Manager is a simple and yet elegant CRUD API, because it was built without any frameworks, only with native features from NodeJS. Its purpose is to create, list, update and delete tasks as well as being able to create several tasks at once by reading from a given csv file.

#### Routes:
- `POST - /tasks`    
- `GET - /tasks`    
- `PUT - /tasks/:id`    
- `DELETE - /tasks/:id`    
- `PATCH - /tasks/:id/complete` => Marking a task as done

#### Reading from csv:
- Lib: csv-parse => It implements a Read Streams to acquaire data from a csv file
- The csv-handler.js file implements a logic to receive data from the csv file using csv-parse. After that it iterates over the resulting array creating an array of objects without assuming the only sent properties are "title" and "description" so that, if needed, more properties could be sent. Finally it makes a request using the fetch API to the POST: /tasks endpoint.

 💙

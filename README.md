# A Node.js task manager REST API with Mongoose
A Node.js REST API with [Mongoose](https://mongoosejs.com/docs/) and [Express.js](http://expressjs.com/)

This is part of Andrew Mead's (mead.io) "The Complete Node.js Developer Course".

## Goal
Create a task manager via a REST API.

## CURL examples

Below are a few `curl` commands to exercise the REST API task resources

```
# create a new task
curl -i  -X POST -H "Content-Type: application/json" -i "localhost:3000/tasks" --data '{"description":"Buy some groceries"}'

# return all tasks
curl -X GET -H "Content-Type: application/json" -i "localhost:3000/tasks"

# return one task
curl -X GET -H "Content-Type: application/json" -i "localhost:3000/tasks/:id"
```


Below are a few `curl` commands to exercise the REST API user resources

```
# create a new user
curl -X POST -H "Content-Type: application/json" -i "localhost:3000/users" --data '{"name":"James", "password":"somePaw98", "email":"test@test.com", "age":38}'

# return all users
curl -X GET -H "Content-Type: application/json" -i "localhost:3000/users"

# return one user
curl -X GET -H "Content-Type: application/json" -i "localhost:3000/users/:id"
```


# A Node.js task manager REST API with Mongoose
A Node.js REST API with [Mongoose](https://mongoosejs.com/docs/) and [Express.js](http://expressjs.com/)

This is part of Andrew Mead's (mead.io) "The Complete Node.js Developer Course".

## Goal
Create a task manager via a REST API.

Additionaly uses:
 * [async/await](https://javascript.info/async-await) to handle asyncronous operations
 * [bcryptjs](https://www.npmjs.com/package/bcryptjs) to hash passwords
 * [JWT](https://www.npmjs.com/package/jsonwebtoken) for representing claims securely between the client and the API
 * [Express.js middleware](https://expressjs.com/en/guide/using-middleware.html) to validate user sessions


## CURL examples

Below are a few `curl` commands to exercise the REST API task resources

```
# create a new task
curl -i  -X POST -H "Content-Type: application/json" -i "localhost:3000/tasks" -d '{"description":"Buy some groceries"}'

# return all tasks
curl -X GET -H "Content-Type: application/json" -i "localhost:3000/tasks"

# return one task
curl -X GET -H "Content-Type: application/json" -i "localhost:3000/tasks/:id"

# update the details of a task
curl -X PATCH -H "Content-Type: application/json" -i "localhost:3000/tasks/:id" -d '{"description":"Buy four apples"}'

# delete one task
curl -X DELETE -H "Content-Type: application/json" -i "localhost:3000/tasks/:id"
```


Below are a few `curl` commands to exercise the REST API user resources

```
# create a new user
curl -X POST -H "Content-Type: application/json" -i "localhost:3000/users" -d '{"name":"James", "password":"somePaw98", "email":"test@test.com", "age":38}'

# return user profile
curl -X GET -H "Content-Type: application/json" -i "localhost:3000/users/me"

# return one user
curl -X GET -H "Content-Type: application/json" -i "localhost:3000/users/:id"

# update the details of an user
curl -X PATCH -H "Content-Type: application/json" -i "localhost:3000/users/:id" -d '{"age":50}'

# delete one user
curl -X DELETE -H "Content-Type: application/json" -i "localhost:3000/users/:id"
```


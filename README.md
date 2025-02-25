# Fitness app - assignment

### Requirements

- node.js ^12.14.0
- postgres ^11.5
- favourite IDE
- git

### How to start

- fork or download this repository
- install dependencies with `npm i`
- create fitness_app database (application access `postgresql://localhost:5432/fitness_app`, make sure you use correct port and db name )
- create db schema and populate db with `npm run seed`
- run express server with `npm start`

### How submit assignment

- create public bitbucket or github repository
- commit and push changes continuously
- use proper commit messages
- share your solution with us (link or read permissions for martin.durny@goodrequest.com)

### You can

- change project structure
- change or add any npm module
- change db model (add tables, table columns...)
- change anything if you can say why

---

## Scenario

The goal of this assignement is to modify given REST API written in express.js using typescript. Public API consist of 2 endpoints `[get]` `localhost:8000/exercises` (list of exercises) and `[get]` `localhost:8000/programs` programs (list of programs).

Structure of API responses

```javascript
{
  data: {
    id: 1;
  }
  message: 'You have successfully created program';
}
```

or

```javascript
{
  data: [
    {
      id: 1,
      name: 'Program 1',
    },
  ];
  message: 'List of programs';
}
```

---

## Task 1 - DONE

Create authorization layer to enable users to access private API (next Task)

DONE - create new db model User(name:string , surname: string, nickName:string, email: string, age: number, role:[ADMIN/USER])
DONE - add authorization layer
DONE - user can register using email, password and role (for purpose of this assignment, user can choose his role in registration)
DONE - user can log in with email and password
DONE - use proper way how to store user data
DONE - you can use any authorization approach or npm module (preferred is JWT strategy and passport)

---

## Task 2 - DONE

Create private API for user with role [ADMIN]

ADMIN can:

DONE - create, update or delete exercises

DONE - edit exercises in program (add or remove)
DONE - get all users and all its data
DONE - get user detail
DONE - update any user (name, surname, nickName, age, nickName, role)

## Task 3 - DONE

---

Create private API for user with role [USER]

USER can:

DONE - get all users (id, nickName)
DONE - get own profile data (name, surname, age, nickName)

DONE - track exercises he has completed (he can track same exercise multiple times, we want to save datetime of completion and duration in seconds)
DONE - see list of completed exercises (with datetime and duration) in profile

DONE - remove tracked exercise from completed exercises list

USER cannot:

DONE - access ADMIN API
DONE - get or update another user profile

---

## Bonus task 1 - pagination, filter, search - DONE

DONE - Add pagination to exercise list using query => `/exercises?page=1&limit=10` return 1 page of exercises in maximal length of 10.

DONE - Add filter by program => `/exercises?programID=1` return only exercises of program with id = 1

DONE - add fultext search on exercise name => `/exercises?search=cis` => return only exercises which name consist of string `cis`

---

## Bonus task 2 - validation - DONE

DONE - Create validation service to check request body, query and params to make sure user sends valid request. For example, in registration, user must send valid email, otherwise return status code 400.
DONE - Also you can use validation on query in bonus task 1.

---

## Bonus task 3 - localization

Create localization service to send message attribute in API responses in correct language. Default language is EN, optional is SK. User can send all requests with HTTP header `language: 'sk'` or `language: 'en'` to receive required language localization.

example of response for request with `language: 'sk'`

```javascript
{
  data: {
    id: 1;
  }
  message: 'Program bol úspešne vytvorený';
}
```

---

## Bonus task 4 - error handling - DONE

Create proper way how to handle all errors in application. Use console.error display error in terminal, user can never see stack trace or real error message. You can write error logs to file.

response status code >= 500

```javascript
{
  data: {
  }
  message: 'Something went wrong';
}
```

# Feedback zadanie

## TASK 1

1. POST /register - neošetrený prípad, ak už taký user v systéme existuje
   - po ukončení registrácie by som už asi považoval používateľa za prihláseného, nech sa nemusí znova prihlasovať cez POST /login
2. POST /login
   - nerozumiem vytváraniu "veľkého" userResponse objektu, keď do response ide len "name" a "surname"

## TASK 2

1. PUT /exercises/:id
   - najprv sa načíta exercise z databázy a až tak sa validuje request body, to nie je správne
2. exercise.service
   - je tam funkcia ktorá načítava exercise na základe ID, ak exercise neexistuje, nemusí vraciať error, aj null je validná hodnota, s ktorou sa možno neskôr dá pracovať (vo všeobecnosti)
     error by som vracal až vyššie, v controlleri (ak getExerciseById vrátilo null, potom throw 404)
3. chýba kontrola, či v DB existuje daný program, ak neexistuje, malo by to vrátiť 404
4. DELETE /exercises/:id
   - vo funkcii deleteExercise sa opakuje kód, ktorý už raz máme vo funkcii getExerciseById
5. GET /users
   - pravdepodobne by som tento endpoint rozdelil na dva samostatné, pre admina a pre bežného používateľa, minimálne z dôvodu rôznych atribútov v response
6. GET /users/:id
   - user.service: to isté, čo pri exercise.service vyššie
7. PUT /users/:id
   - pri kontrole, či daný používateľ existuje, môžeme použíť existujúcu funkciu z user.service, takto sa len zbytočne duplikuje kód

## TASK 3

1. GET /profile
   - zbytočné definovanie a použitie funkcie getOwnProfileService(id). user už je v session, koniec koncov aj tento nakoniec ide do response. Navyše na získavanie usera na základe jeho id už jednu funkciu definovanú máme (fetchUserById)
   - chýba zoznam dokončených cvičení prihláseného používateľa

## BONUS TASK 1

- ok

## BONUS TASK 2

- napriek vytvoreniu validateRequest funkcie, nie je použitá všade a aj tak sa vstupy niektorých requestov validujú v hlavnej funkcii requestu

## BONUS TASK 3

- ok

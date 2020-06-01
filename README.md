[![mailto:paulononaka@email.com](https://img.shields.io/badge/contact-@paulononaka-blue.svg?style=flat)](mailto:paulononaka@email.com)

<hr />
<h2 align="center">
  ✨ Currency Converter - Made with nest.js for the backend and Gastby for the frontend.✨
</h2>
<hr />

A website and a webservice that allows the user to convert between two currencies.

## Description

- The user can input a source currency, an amount in the source currency, and an output currency
- The user will see the value in the output currency
- The user can see a history of the last 10 currency conversions that were performed
- At least US dollars, Euros, and Japanese Yen are supported as input and output currencies

### Project structure


```
client      // Client made with Gastby
server      // Server made with Nest.js
```

### Setup

Create your own API KEY at https://free.currencyconverterapi.com/free-api-key and create an entrance for API_KEY in the .env file.
```
$ cp .example.env .env
```

```bash
$ docker-compose up
```

### Running the app

Frontend: http://localhost:8000

APIs: 

- GET http://localhost:3000/convert?from=USD&to=BRL&amount=2.5
- GET http://localhost:3000/history

## Testing (backend)

```
# Get into server folder
$ cd server

# Start mongo for running e2e and smoke tests.
$ docker-compose up mongo

# Unit tests
$ yarn test

# E2E tests
$ yarn test:e2e

# Unit tests coverage
$ yarn test:cov

# Smoke tests
$ yarn test:smoke

# All tests
$ yarn tests
```


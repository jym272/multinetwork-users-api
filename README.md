### Multinetwork Users API

#### Part of [multinetwork project](https://github.com/jym272/multinetwork-k8s)

#### This project needs an `.env` file in the root directory with the following:

```dotenv
PORT=3050
POSTGRES_USER=jorge
POSTGRES_DB=users
POSTGRES_PASSWORD=123456
POSTGRES_HOST=localhost
POSTGRES_PORT=5234
AUTH_API_HOST=localhost
AUTH_API_PORT=3051
```

#### Environments

There is a github `testing` environment that is used for testing the project in the
workflow `run-test.yml`.

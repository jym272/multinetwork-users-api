#!/usr/bin/env bash


# curl to localhost:8080/signup with { "email": jym282@gmail.com, "password": "password" }
curl -s -X POST -H "Content-Type: application/json" -d '{"email": "jym272@email.com", "password": "Adiniii27A"}' http://localhost:3050/signup | jq

# login
curl -s -X POST -H "Content-Type: application/json" -d '{"email": "jym272@email.com", "password": "Adiniii27A"}' http://localhost:3050/login | jq

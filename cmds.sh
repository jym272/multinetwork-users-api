#!/usr/bin/env bash


# curl to localhost:8080/signup with { "email": jym282@gmail.com, "password": "password" }
curl -s -X POST -H "Content-Type: application/json" -d '{"email": "jym272@email.com", "password": "Adiniii27A"}' http://localhost:3050/signup | jq

# login
curl -s -X POST -H "Content-Type: application/json" -d '{"email": "jym272@email.com", "password": "Adiniii27A"}' http://localhost:3050/login | jq
#result:
#{
#  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6eyJhdXRoZW50aWNhdGUiOnRydWV9LCJpYXQiOjE2NzQwNzgyNjcsImV4cCI6MTY3NDE2NDY2NywiYXVkIjoidGFza3MtYXBpIiwiaXNzIjoiYXV0aC1hcGkiLCJzdWIiOiJqeW0yNzJAZW1haWwuY29tIiwianRpIjoiMSJ9.H4C6-MeNE_zq5U_Rah_hqq07eeT2iX89sK05XuSn9Pw"
#}
token=$(curl -s -X POST -H "Content-Type: application/json" -d '{"email": "jym272@email.com", "password": "Adiniii27A"}' http://localhost:3050/login | jq -r '.token')

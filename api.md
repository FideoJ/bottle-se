FORMAT: 1A
HOST: https://localhost:8080

# Bottle

## Session

### Create a session [POST /sessions]

+ Request (application/json)

        {
            "username": "user",
            "password": "pass",
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "登录成功",
            "data": {
                "user_id": 1,
                "username": "user",
                "nickname": "吕剪刀",
                "gender": "male",
                "created_at": "2017-12-24T07:02:23.000Z"
            }
        }

+ Response 403 (application/json)

        {
            "status": "FORBIDDEN"
            "msg": "用户名或密码错误",
            "data": {}
        }


### Delete a session [DELETE /sessions/self]

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "登出成功",
            "data": {}
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED"
            "msg": "未登录",
            "data": {}
        }
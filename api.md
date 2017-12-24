FORMAT: 1A
HOST: https://localhost:8080

# Bottle

# Group Session

## Session

### Create a session [POST /sessions]

+ Request (application/json)

        {
            "username": "user",
            "password": "pass"
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

# Group User

## User

### Create a user [POST /users]

+ Request (application/json)

        {
            "username": "user",
            "password": "pass",
            "nickname": "nickname",
            "gender": "male"
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "注册成功",
            "data": {}
        }

+ Response 409 (application/json)

        {
            "status": "CONFLICT_USERNAME",
            "msg": "用户名已存在",
            "data": {}
        }

### Retrieve a user [GET /users/self]

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "获取用户资料成功",
            "data": {}
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED"
            "msg": "未登录",
            "data": {}
        }

### Update a user [PUT /users/self]

+ Request (application/json)

        {
            "password": "pass",
            "nickname": "吕剪刀",
            "gender": "male"
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "更新用户资料成功",
            "data": {}
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED"
            "msg": "未登录",
            "data": {}
        }

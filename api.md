FORMAT: 1A
HOST: https://bottle.resetbypear.com/api

# Bottle

# Group Session

## Sessions Collection [/sessions]

### Create a session [POST]

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

## Session [/sessions/self]

### Delete a session [DELETE]

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

## Users Collection [/users]

### Create a user [POST]

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

## User [/users/self]

### Retrieve a user [GET]

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

### Update a user [PUT]

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

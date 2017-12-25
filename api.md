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
            "status": "UNAUTHORIZED",
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
            "msg": "用户user6注册成功",
            "data": {
                "user_id": 7,
                "username": "user6",
                "nickname": "nickname",
                "gender": "male"
            }
        }

+ Response 409 (application/json)

        {
            "status": "CONFLICT_USERNAME",
            "msg": "用户名user6已存在",
            "data": {}
        }

## User [/users/self]

### Retrieve a user [GET]

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "获取用户资料成功",
            "data": {
                "user_id": 1,
                "username": "user",
                "nickname": "吕剪刀2",
                "gender": "male",
                "created_at": "2017-12-24T07:02:23.000Z"
            }
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED",
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
            "data": {
                "user_id": 1,
                "username": "user",
                "nickname": "nickname",
                "gender": "male"
            }
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED",
            "msg": "未登录",
            "data": {}
        }

# Group Bottle

## Bottles Collection [/bottles]

### Create a bottle [POST]

+ Request (application/json)

        {
            "content": "A wonderful bottle.",
            "location": {
                "formatted_address": "广东省广州市番禺区小谷围街道大学城中环东路",
                "latitude": 23.059375,
                "longitude": 113.399920
            }
        }

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "创建漂流瓶成功",
            "data": {}
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED",
            "msg": "未登录",
            "data": {}
        }

### Retrieve nearby bottles [GET /bottles/nearby/{?latitude,longitude,latitude_span,longitude_span}]

**Note:** "Nearby" is a rectangular region whose length is **2 \* latitude_span**, width is **2 \* longitude_span**, and center is **(latitude, longitude)**.

+ Parameters
    - latitude : 23.059375 (number, required) - Center Latitude
    - longitude : 113.399920 (number, required) - Center Longitude
    - latitude_span : 0.054567 (number, required) - Latitude Span
    - longitude_span : 0.076545 (number, required) - Longitude Span

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "查询附近的漂流瓶成功",
            "data": {
                "center": {
                    "latitude": 23.059375,
                    "longitude": 113.399920
                },
                "span": {
                    "latitude": 0.054567,
                    "longitude" 0.076545
                },
                "bottles": [
                    {
                        "bottle_id": 1,
                        "location": {
                            "formatted_address": "广东省广州市番禺区小谷围街道大学城中环东路",
                            "latitude": 23.059375,
                            "longitude": 113.399920
                        }
                    }, {
                        "bottle_id": 2,
                        "location": {
                            "formatted_address": "广东省广州市番禺区小谷围街道大学城中环东路111号",
                            "latitude": 23.059315,
                            "longitude": 113.399990
                        }
                    }, {
                        "bottle_id": 3,
                        "location": {
                            "formatted_address": "广东省广州市番禺区小谷围街道大学城广外东路广东外语外贸大学",
                            "latitude": 23.059375,
                            "longitude": 116.000967
                        }
                    }
                ]
            }
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED",
            "msg": "未登录",
            "data": {}
        }

### Retrieve created bottles [GET /bottles/created]

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "查询创建的漂流瓶列表成功",
            "data": {
                "bottles": [
                    {
                        "bottle_id": 1,
                        "content": "This is a bottle.",
                        "location": {
                            "formatted_address": "广东省广州市番禺区小谷围街道大学城中环东路",
                            "latitude": 23.059375,
                            "longitude": 113.399920
                        },
                        "created_at": "2017-12-25T07:02:23.000Z",
                        "openers_count": 3
                    }, {
                        "bottle_id": 2,
                        "content": "This is a nice bottle.",
                        "location": {
                            "formatted_address": "广东省广州市番禺区小谷围街道大学城中环东路111号",
                            "latitude": 23.059315,
                            "longitude": 113.399990
                        },
                        "created_at": "2017-12-26T07:02:23.000Z",
                        "openers_count": 10
                    }, {
                        "bottle_id": 3,
                        "content": "This is a funny bottle.",
                        "location": {
                            "formatted_address": "广东省广州市番禺区小谷围街道大学城广外东路广东外语外贸大学",
                            "latitude": 23.059375,
                            "longitude": 116.000967
                        },
                        "created_at": "2017-12-27T07:02:23.000Z",
                        "openers_count": 15
                    }
                ]
            }
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED",
            "msg": "未登录",
            "data": {}
        }

### Retrieve opened bottles [GET /bottles/opened]

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "查询打开的漂流瓶列表成功",
            "data": {
                "bottles": [
                    {
                        "bottle_id": 1,
                        "content": "This is a bottle.",
                        "location": {
                            "formatted_address": "广东省广州市番禺区小谷围街道大学城中环东路",
                            "latitude": 23.059375,
                            "longitude": 113.399920
                        },
                        "owner": {
                            "user_id": 1,
                            "username": "user",
                            "nickname": "nickname",
                            "gender": "male"
                        },
                        "created_at": "2017-12-25T07:02:23.000Z",
                        "open_at": "2017-12-26T07:02:23.000Z"
                    }, {
                        "bottle_id": 2,
                        "content": "This is a nice bottle.",
                        "location": {
                            "formatted_address": "广东省广州市番禺区小谷围街道大学城中环东路111号",
                            "latitude": 23.059315,
                            "longitude": 113.399990
                        },
                        "owner": {
                            "user_id": 2,
                            "username": "user2",
                            "nickname": "nickname",
                            "gender": "female"
                        },
                        "created_at": "2017-12-26T07:02:23.000Z",
                        "open_at": "2017-12-27T07:02:23.000Z"
                    }, {
                        "bottle_id": 3,
                        "content": "This is a funny bottle.",
                        "location": {
                            "formatted_address": "广东省广州市番禺区小谷围街道大学城广外东路广东外语外贸大学",
                            "latitude": 23.059375,
                            "longitude": 116.000967
                        },
                        "owner": {
                            "user_id": 3,
                            "username": "user3",
                            "nickname": "nickname",
                            "gender": "female"
                        },
                        "created_at": "2017-12-27T07:02:23.000Z",
                        "open_at": "2017-12-28T07:02:23.000Z"
                    }
                ]
            }
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED",
            "msg": "未登录",
            "data": {}
        }

## Bottle [/bottles/{bottle_id}]

### Open a bottle [POST /bottles/{bottle_id}/open]

+ Parameters
    - bottle_id : 1 (number, required) - Bottle ID


+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "打开漂流瓶成功",
            "data": {
                "bottle_id": 3,
                "content": "This is a bottle.",
                "owner": {
                    "user_id": 1,
                    "username": "user",
                    "nickname": "nickname",
                    "gender": "male"
                },
                "location": {
                    "formatted_address": "广东省广州市番禺区小谷围街道大学城广外东路广东外语外贸大学",
                    "latitude": 23.059375,
                    "longitude": 116.000967
                },
                "created_at": "2017-12-27T07:02:23.000Z",
                "open_at": "2017-12-28T07:02:23.000Z"
            }
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED",
            "msg": "未登录",
            "data": {}
        }

+ Response 404 (application/json)

        {
            "status": "NOT_FOUND",
            "msg": "漂流瓶1不存在",
            "data": {}
        }

### Retrieve a bottle's openers [GET /bottles/{bottle_id}/openers]

+ Parameters
    - bottle_id : 1 (number, required) - Bottle ID

+ Response 200 (application/json)

        {
            "status": "OK",
            "msg": "查询漂流瓶的打开者列表成功",
            "data": {
                "openers_count": 3,
                "openers": [
                    {
                        "user_id": 2,
                        "username": "user2",
                        "nickname": "nickname",
                        "gender": "male",
                        "open_at": "2017-12-25T07:02:23.000Z"
                    }, {
                        "user_id": 3,
                        "username": "user3",
                        "nickname": "nickname",
                        "gender": "female",
                        "open_at": "2017-12-26T07:02:23.000Z"
                    }, {
                        "user_id": 4,
                        "username": "user4",
                        "nickname": "nickname",
                        "gender": "female",
                        "open_at": "2017-12-27T07:02:23.000Z"
                    }
                ]
            }
        }

+ Response 401 (application/json)

        {
            "status": "UNAUTHORIZED",
            "msg": "未登录",
            "data": {}
        }

+ Response 403 (application/json)

        {
            "status": "FORBIDDEN",
            "msg": "您不是该瓶子的主人",
            "data": {}
        }

+ Response 404 (application/json)

        {
            "status": "NOT_FOUND",
            "msg": "漂流瓶1不存在",
            "data": {}
        }

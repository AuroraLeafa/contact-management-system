# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json 
{
    "username" : "Aurora",
    "password" : "confidential",
    "name" : "Aurora Leafa"
}
```

Response Body (Success) :

```json
{
    "data" {
        "username"  : "Aurora",
        "name"      : "Aurora Leafa"
    }
}
```

Response Body (Failed) :

```json
{
    "error" : "Username Must Not Be Blank, ..."
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json 
{
    "username" : "Aurora",
    "password" : "confidential",
}
```

Response Body (Success) :

```json
{
    "data" {
        "username"  : "Aurora",
        "name"      : "Aurora Leafa",
        "token"     : "uuid"
    }
}
```

Response Body (Failed) :

```json
{
    "error" : "Username or Password is incorrect, ..."
}
```

## GET User

Endpoint : POST /api/users/current

Request Header :
    - X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" {
        "username"  : "Aurora",
        "name"      : "Aurora Leafa",
    }
}
```

Response Body (Failed) :

```json
{
    "error" : "UNAUTHORIZED, ..."
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
    - X-API-TOKEN : token

Request Body :

```json
{
    "password"  : "confidential",
    "name"      : "Aurora Leafa"
}
```

Response Body (Success) :

```json
{
    "data" {
        "username"  : "Aurora",
        "name"      : "Aurora Leafa",
    }
}
```

Response Body (Failed) :

```json
{
    "error" : "UNAUTHORIZED, ..."
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :
    - X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" : "OK"
}
```

Response Body (Failed) :

```json
{
    "error" : "UNAUTHORIZED, ..."
}
```
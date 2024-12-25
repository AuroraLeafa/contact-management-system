# Address API Spec

## Register Address

Endpoint : POST /api/contacts/:idContact/addresses

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "Jl.Jalan",
  "city": "Kota",
  "province": "Provinsi",
  "country": "Negara",
  "postal_code": "12345"
}
```

Response Body (Success) :

```json
{
    "data" {
        "id"        : 1,
        "street"    : "Jl.Jalan",
        "city"      : "Kota",
        "province"  : "Provinsi",
        "country"   : "Negara",
        "postal_code" : "12345"
    }
}
```

Response Body (Failed) :

```json
{
  "error": "street is required, ..."
}
```

## GET Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
    "data" {
        "id"        : 1,
        "street"    : "Jl.Jalan",
        "city"      : "Kota",
        "province"  : "Provinsi",
        "country"   : "Negara",
        "postal_code" : "12345"
    }
}
```

Response Body (Failed) :

```json
{
  "error": "Street not found, ..."
}
```

## Update User

Endpoint : PATCH /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "Jalan Apa",
  "city": "Kota Apa",
  "province": "Provinsi Apa",
  "country": "Negara Apa",
  "postal_code": "23123"
}
```

Response Body (Success) :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota Apa",
    "province": "Provinsi Apa",
    "country": "Negara Apa",
    "postal_code": "23123"
  }
}
```

Response Body (Failed) :

```json
{
  "error": "Street is required, ..."
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "error": "Address Not Found, ..."
}
```

## LIST Address

Endpoint : GET /api/contacts/:idContact/addresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jl.Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postal_code": "12345"
    },
    {
      "id": 2,
      "street": "Jl.Jalan",
      "city": "Kota",
      "province": "Provinsi",
      "country": "Negara",
      "postal_code": "12345"
    },
  ]
}
```

Response Body (Failed) :

```json
{
  "error": "Street not found, ..."
}
```

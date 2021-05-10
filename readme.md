## Add new paymnet
```sh
[POST]      {{baseURl}/api/payment
```
##### Request body
-customer_id
-amount
-currency
##### Response

```sh
{
    "status": 200,
    "message": "payment successfully created for customer renad",
    "payment_id": 3
}
```

## Get payment details for a payment
```sh
[GET]      {{baseURl}/api/payment/:payment_id
```
##### Request params
-payment_id

##### Response
-if success 
```sh
{
    "id": 1,
    "customer_id": 1,
    "amount": 30,
    "currency": "SAR",
    "status": "unpaid",
    "dueDate": "2021-05-10T05:01:47.088Z",
    "paidDate": null
}
```
-if not found
```sh
{
    "status": 404,
    "message": "Resource not found."
}
```

## Update payment status
```sh
[PATCH]      {{baseURl}/api/payment/:payment_id
```
##### Request params
-payment_id

##### Request body
-status
```sh
{
    "status":"paid"
}
```

##### Response
-if success 
```sh
{
    "status": 200,
    "payment": {
        "id": 1,
        "customer_id": 1,
        "amount": 30,
        "currency": "SAR",
        "status": "paid",
        "dueDate": "2021-05-10T05:06:10.382Z",
        "paidDate": "2021-05-10T05:06:12.732Z"
    }
}
```
-if not found
```sh
{
    "status": 404,
    "message": "Resource not found."
}
```
## Cancel payment
```sh
[DELETE]      {{baseURl}/api/payment/:payment_id
```
##### Request params
-payment_id

##### Response

```sh
{
    "status": 200,
    "payment": {
        "id": 1,
        "customer_id": 1,
        "amount": 30,
        "currency": "SAR",
        "status": "cancelled",
        "dueDate": "2021-05-10T05:14:12.512Z",
        "paidDate": "2021-05-10T05:23:03.015Z"
    }
}
```
## GET reminder
```sh
[GET]      {{baseURl}/api/reminder
```
##### Response

```sh
{
    "status": 200,
    "data": {
        "id": 1,
        "customer_id": 1,
        "amount": 30,
        "currency": "SAR",
        "status": "unpaid",
        "dueDate": "2021-05-10T05:14:12.512Z",
        "paidDate": null
    }
}
```

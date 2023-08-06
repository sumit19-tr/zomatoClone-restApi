# page 1
> list of city
  http://localhost:9344/location  
> list of restaurants
  http://localhost:9344/restaurants
> rest wrt to state
  http://localhost:9344/restaurant/4
> list of mealtype
  http://localhost:9344/MealTypes      

Assingment 5 (Nodejs)

> Q2.Take City name (Example:Mumbai) as params in the URL and find restaurant data with respect to the city name
  http://localhost:9344/RestaurantWrtCityname/Delhi

> Q3.write an API to list all the mealtypes in the quick searches
  http://localhost:9344/widget

# page 2
> Restaurants wrt to mealType
  http://localhost:9344/restaurntss?mealId=5
> Restaurants wrt to mealType & Cuisine
  http://localhost:9344/filter/1?cuisineId=5
> Restaurants wrt to mealType & Cost
  http://localhost:9344/filter/1?hcost=800&lcost=600
> Sort on basis of price
  http://localhost:9344/filter/1?hcost=600&lcost=100&sort=-1

# page 3
> details of restaurants
  http://localhost:9344/details/12  
> menu wrt to restaurant
  http://localhost:9344/menu/4 

# page 4
> Menu Details
  http://localhost:9344/menuItem
  {
    "id":[5,9,12,14]
  }

> Place Order
http://localhost:9344/placeOrder {
    "orderId" : 54135145,
    "name" : "Sumit",
    "email" : "sumit123@gmail.com",
    "address" : "hno 399",
    "phone" : 7987848362,
    "cost" : 391,
    "menuItem" : [
        89,34,23
    ]
}

# Page 5
> List order
  http://localhost:9344/orders
> Order wrt to Email
  http://localhost:9344/orders?email=anchal@gmail.com
> Update payment details
  http://localhost:9344/updateOrder/54135145
  {
    "status":"Delivered",
    "bank_name":"SBI",
    "date":"16/01/2023"
}
> Delete orders
  http://localhost:9344/deleteOrder/63e7ea86beb0fffbf8421e67




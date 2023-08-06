let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
// let port = process.env.PORT || 9310;
let port = 9344; 
let cors = require('cors');
let mongo = require('mongodb');
let bodyParser = require('body-parser');
let MongoClient = mongo.MongoClient;
let mongoUrl = "mongodb+srv://test:XKuhQ4x3x1CvkUag@cluster0.mwoz2jr.mongodb.net/?retryWrites=true&w=majority";
let db;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('Hii from express');
})

//get all locations
app.get('/location',(req,res)=> {
    db.collection('location').find().toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//get all Restaurants
app.get('/restaurant/:id',(req,res)=>{
    // console.log(req.params.id)
    let state_id = Number(req.params.id)
    db.collection('RestaurantsData').find({state_id:state_id}).toArray((err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

// Assingment 5 (Nodejs)
// 2.Take City name (Example:Mumbai) as params in the URL and find restaurant data with respect to the city name
app.get('/RestaurantWrtCityname/:cityName',(req,res)=>{
    // console.log(req.params.id)
    let cityName = req.params.cityName;
    db.collection('RestaurantWrtCity').find({city_name:cityName}).toArray((err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

//list of Mealtypes
app.get('/MealTypes',(req,res)=>{
    db.collection('Mealtypes').find().toArray((err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

//3 write an API to list all the mealtypes in the quick searches
app.get('/widget',(req,res)=>{
    db.collection('Mealtypes').find().toArray((err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

// details of particular restaurants
app.get('/details/:restId',(req,res)=>{
    let id = Number(req.params.restId);
    db.collection('RestaurantsData').find({restaurant_id:id}).toArray((err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

//details of particular restaurants on basis of object id
app.get('/details/:restId',(req,res)=>{
    // let id = Number(req.params.restId);
    let id = mongo.ObjectId(req.params.restId)//http://localhost:9344/details/63dd54badb72e573eeb46e87
    db.collection('RestaurantsData').find({_id:id}).toArray((err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

app.get('/details/:restId',(req,res)=>{
    // let id = Number(req.params.restId);
    let restaurant_id = Number(req.params.restId)
    db.collection('RestaurantsData').find({restaurant_id}).toArray((err,data) =>{//if the value same at both side then we can also write single variable also
        if(err) throw err;
        res.send(data)
    })
})

//menu wrt to restaurant
app.get('/menu/:restId',(req,res)=>{
    let rest_id = Number(req.params.restId);
    // let restaurant_id = Number(req.params.restId)
    db.collection('RestaurantMenu').find({restaurant_id:rest_id}).toArray((err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

//get all Restaurants
app.get('/restaurntss',(req,res)=>{
    console.log(req.query.mealId);
    let query = {};
    let stateId = Number(req.query.stateId)
    let mealId = Number(req.query.mealId)
    if(stateId){
        query={state_id:stateId}
    }
    else if(mealId){
        query={"mealTypes.mealtype_id":mealId}
    }
    else{
        query = {};
    } 
    db.collection('RestaurantsData').find(query).toArray((err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

//listing page data
app.get('/filter/:mealId',(req,res)=>{
    let mealId = Number(req.params.mealId);
    let cuisineId = Number(req.query.cuisineId);
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);
    let sort = {cost:1}
    let query = {}

    if(req.query.sort){
        sort={cost:req.query.sort}
    }//if two 'if' without else then both 'if' will work        

    if(cuisineId){
        query={
            "mealTypes.mealtype_id":mealId,
            "cuisines.cuisine_id":cuisineId
        }
    }
    else if(hcost && lcost){
        query={
            "mealTypes.mealtype_id":mealId,
            "$and":[{cost:{$gt:lcost,$lt:hcost}}]
        }
    }
    else{
        query={
            "mealTypes.mealtype_id":mealId,
        }
    }
    db.collection('RestaurantsData').find(query).sort(sort).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//place order
app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed'); 
    })
})

//update order
app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,result) => {
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})
// menu details
app.post('/menuItem',(req,res) =>{
    if(Array.isArray(req.body.orderId)){
        db.collection('RestaurantMenu').find({menu_id:{$in:req.body.orderId}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{
        res.send('Invalid Input')
    }
})

//delete order
app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted');
    })
})

//order
app.get('/orders',(req,res) => {
    let query = {}
    let email = req.query.email;
    if(email){
        query={email}
    }
    db.collection('orders').find(query).toArray((err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//get all Restaurants
app.get('/restaurants',(req,res)=>{
    db.collection('RestaurantsData').find().toArray((err,data) =>{
        if(err) throw err;
        res.send(data)
    })
})

//get all users
app.get('/users',(req,res)=>{
    db.collection('users').find().toArray((err,data) =>{
        if(err) throw err;
        res.send(data);
    })
})

//Connection with db
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while Connecting');
    db =  client.db("sample_restaurants");
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Server is Running on port ${port}`);
    })
})
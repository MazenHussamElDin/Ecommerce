const { log } = require('console');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var Product = require('./models/product');


mongoose.connect(`mongodb+srv://MazenHossam:pass123@atlascluster.vsczh.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=AtlasCluster`)
.then(() => {
    console.log("CONNECTED SUCCESSFULLY TO DATABASE!");
})
.catch((err) => {
    console.error("ERROR, CANNOT CONNECT TO DATABASE!", err);
});


const cors = require('cors');

app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json());

app.post('/addproduct', (req, res) => {
    var data = req.body;

    console.log(data);
    
    var newProduct = new Product({
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image,
        rating: {rate: data.rating.rate, count: data.rating.count}
    });

    newProduct.save()
        .then(() => {
            console.log("PRODUCT ADDED SUCCESSFULLY!");
            res.send({ msg: 'PRODUCT ADDED SUCCESSFULLY!' });
        })
        .catch((error) => {
            console.error("ERROR, PRODUCT NOT ADDED!", error);
            res.status(500).send("Internal Server Error: Could not add product.");
        });
});




app.get('/getById/:id', (req,res)=>{
    var prodid = +req.params.id;
    
    
      Product.findOne({id:prodid}).then((product)=>{
        if(product){
          res.json({productdata:product});
        }else{
          res.json({msg:"NO PRODUCT WITH THIS ID"});
        }
      }).catch((err)=>{
        res.json({msg:"FAILED TO FIND THIS PROD"});
      })
  });


  app.get('/all',(req, res)=>{
    Product.find().then((data)=>{
      if(data){
        res.json(data);
      }else{
        res.json({msg:"Error, Failed to get all products!"});
      }
    }).catch((err)=>{
      console.log("Error, Failed to get all products!");
    })
  })


app.listen(3004,()=>
{
    console.log("Server Connected!");
    
})
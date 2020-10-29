
import * as express from "express";
import * as mongoose from 'mongoose'
const cors = require("cors");
import userRouter from './app/routes/userRouter';
import adminRouter from './app/routes/adminRouter';
require("dotenv").config();
import {datas} from './app/Bookdatas';

// set up express here

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
//api details page


app.get('/api/ubdetails/:id', (req, res) => {
  const productId=req.params.id;
  
  const product=datas.find(x=>"x.id"===productId);
  if (product)
    res.send(product);
  else
    res.status(404).send({msg:"product not found."})
});

//api fro book homepage

app.get('/api', (req, res) => {
  res.send(datas);
});


// set up mongoose here

mongoose.connect(
  'mongodb+srv://Sonsingh:20U1pN19fqJZT1nt@cluster0.mcc9q.mongodb.net/Singsyslm?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    
  
  }
).then(() => {
  return console.log(`Database Successfully connected`);
})
.catch(error => {
  console.log("Error connecting to database: ", error);
  return process.exit(1);
});

// set up routes here

app.use("/users" , userRouter);
app.use("/admins" , adminRouter);

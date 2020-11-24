
import * as express from "express";
import * as mongoose from 'mongoose'
import *as  path from 'path';
const cors = require("cors");
import userRouter from './app/routes/userRouter';
import adminRouter from './app/routes/adminRouter';
require("dotenv").config();
import uploadRoute from './app/routes/uploadRouter';
import  * as bodyParser from 'body-parser';
import  productRoute from './app/routes/productRoute';

// set up express here

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

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
app.use(bodyParser.json());
app.use("/users" , userRouter);
app.use("/admins" , adminRouter);
app.use('/api/products/', productRoute);
app.use('/api/uploads', uploadRoute);
app.use('/uploads', express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
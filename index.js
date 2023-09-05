import express, { request, response } from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// );

app.get('/',(request,response)=>{
   console.log(request)
   return response.status(234).send('welcome to mern stack')
});

app.use('/books', booksRoute);

// app.post('/books', async (request,response) => {
//     try {
//         if(
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({
//               Message: 'Send all required fileds: title, author, publishYear',
//             });
//         }

//     const newBook = {
//         title:request.body.title,
//         author:request.body.author,
//         publishYear: request.body.publishYear,
//     };    

//     const book = await Book.create(newBook);
    
//     return response.status(201).send(book);
//     } catch(error){
//         console.log(error.message);
//         response.status(500).send({message:error.message});
//        }
// });


// app.get('/books/:id',async(request,response) => {
//     try {

//         const { id } = request.params;
//         const book = await Book.findById({id});

//         return response.status(200).json(book);
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message:error.message});
//     }
// });

// app.put('/books/:id',async(request,response)=>{
//     try {
//         if(
//         !request.body.title ||
//         !request.body.author ||
//         !request.body.publishYear
//         ) {
//             return response.status(400).send({
//              message: 'Send all required fields: title, author, publishYear',
//             });
//         }

//         const {id} = request.params;

//         const result = await Book.findByIdAndUpdate(id, request.body);
        
//         if (!result){
//             return response.status(404).json({message:'book not found'});
//         }
//         return response.status(200).send({message:'Book updated'});
//     }catch (error){
//         console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });
// app.delete('/books/:id',async(request,response) => {
//     try {

//         const { id } = request.params;

//         const result = await Book.findByIdAndDelete(id);

//         if(!result){
//             return response.status(404).json({message:'Book not found'});
//         }
//         return response.status(200).send({message:'Book deleted SuccessFully'});
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({message:error.message});
//     }
// });


// app.listen(PORT, () => {
//     console.log(`App is Listening to port: ${PORT}`);
// });

mongoose
   .connect(mongoDBURL)
   .then(() => {
     console.log('App conneccted to database');
     app.listen(PORT, () => {
        console.log(`App is Listening to port: ${PORT}`);
    });
   })
   .catch((error)=>{
     console.log(error);
   });
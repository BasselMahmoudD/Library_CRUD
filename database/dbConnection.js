import { connect } from 'mongoose';


export  let dbConnection = await connect('mongodb://127.0.0.1:27017/Task8').then(()=>{
    console.log("Database connected");
}).catch(()=>{
    console.log("Database Disconnected");
})

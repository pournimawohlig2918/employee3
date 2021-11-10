const mongoose = require('mongoose');

const connectDB = async() => {
    try{
mongoose.connect('mongodb://localhost:27017/employeedata', {
    useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.')}
    else 
    { 
        console.log('Error in DB connection : ' + err)}
})
}catch(err) {

}
}
/*const connectDB = async() => {
    try{
// mongodb connection string
const con = await mongoose.connect(process.env, {
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true
 })
    }catch(err){

    }
}*/
module.exports = connectDB;

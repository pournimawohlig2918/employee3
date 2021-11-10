const mongoose = require('mongoose');

var schema = new mongoose.Schema({ 
id:{
    type: String,
    required: true
},
username:{
    type: String,
required: true
},

password:{
type: String,
required: true
},
email:{
    type: String, 
    required: true
},
salary:{
type:String,
title: 'salary'
}
})

const employeedata = mongoose.model('Employee',schema);

module.exports = employeedata;
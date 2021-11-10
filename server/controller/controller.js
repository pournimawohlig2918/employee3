const { response } = require('express');
var employeedata = require('../model/model');

// create and save new user 
exports.create = (req,res) => {
// validate request
if(!req.body){
    res.status(400).send({message:"Content can not be empty!"});
    return;
}
//console.log("gdh",req.body);
//new user
const user = new employeedata({
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    salary: req.body.salary
});

//console.log("fgqyghgswhq",user);

//save user in the database
user
.save(user)
.then(data => {
   // res.send(data)
   res.redirect('add-user')
})
.catch(err =>{
res.status(500).send({
    message: err.message || "Some error occurred while creating acreate operation"
});
})
}

// retrieve and return all users/ a single user 
exports.find = async (req,res) => {

   try{
//    // For Fetching Post
//    app.get('/', async (req, res) => {
//        try {
//            // Adding Pagination
//            const limitValue = req.query.limit || 2;
//            const skipValue = req.query.skip || 0;
//            const posts = await postModel.find()
//                .limit(limitValue).skip(skipValue);
//            res.status(200).send(posts);
//        } 
//    });
    if(req.query.id){
 const id = req.query.id;

 employeedata.findById(id)
 .then(data =>{
     if(!data){
          res.status(404).send({ message :"Not found user with id" +id})
     } else{
         console.log("user data", data);
         res.render("update_user",{user: data})
     }
     })
     .catch(err =>{
         res.status(500).send({message: "Error retrieving user with id" +id})
     })

    } else{
        //console.log("inside else")
        const user = await employeedata.find()
        if(!user) {
            res.send("no user found")
        }
        const limitValue = req.query.limit || 10;
        const pages = req.query.pages || 1;
        const current = req.query.current || 1
        const users = await employeedata.find()
            .limit(limitValue).skip(pages);
        res.render('index',{users, pages, current});
    }

}  catch(err){
res.send("show error");
}
} 

// Update a new identified user by user id
exports.update = (req,res) => {
    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update can not be empty"})
    }
    const id = req.params.id;
    employeedata.findByIdAndUpdate(id,req.body)
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found!`})
        }else{
            res.redirect('http://localhost:3000')
               // message : "User Updated successfully"
        }
    })
.catch(err =>{
    res.status(500).send({message : "Error Update user information"})
})
}

//Delete a user with specified user id in the request
exports.delete = (req,res) => {
const id = req.params.id;

employeedata.findByIdAndDelete(id)
.then(data => {
        if(!data){
            res.status(404).send({ message: `Cannot delete with id ${id}. Maybe id is wrong`})
        }else{
            res.send({
                message : "User was deleted successfully!"
            })  
        }
})
.catch(err =>{
    res.status(500).send({
        message: "Could not delete User with id=" +id
    });
});
}


// var pageCount =  (".setPagination").length / pageSize;

// for(var i = 0 ; i<pageCount;i++){
//     $("#pagin").append('<li><a href="#">'+(i+1)+'</a></li> ');
// }
// $("#pagin li").first().addClass("active")
// showPage = function(page) {
//     $(".setPagination").hide();
//     $(".setPagination").each(function(n) {
//         if (n >= pageSize * (page - 1) && n < pageSize * page)
//             $(this).show();
//     });        
// }
// showPage(1);

// $("#pagin li").click(function() {
//     $("#pagin li").removeClass("active");
//     $(this).addClass("active");
//     showPage(parseInt($(this).text())) 
// });
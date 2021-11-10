const axios = require('axios');

let homeRoutes =(req,res) => {
    // Make a get request to /api/users
axios.get('http://localhost:3000/api/users')
.then(function(response) {
    console.log(response)
    res.render(`index`,{ users:response.data});
})
.catch(err =>{
    res.send(err);
})

}

let add_user = (req, res) => {
    console.log("bhedbg");
    res.render(`add_user`); 
}
let update_user = (req, res) => {
    axios.get('http://localhost:3000',{ params:{id:req.query.id}})
    .then(function(userdata) {
        console.log("jay jay");
        res.render("update_user",{user:userdata.data})
    })
    .catch(err => {
        res.send(err);
    })
}
module.exports ={homeRoutes, add_user, update_user}
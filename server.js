//Name: _______Tatiana Kashcheeva_____________________ Student ID: ______148366206________ Date: ___6 December__2022__

//Your app’s URL  : __________https://witty-frog-toga.cyclic.app/departments_______________________________
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const path = require("path");
var final = require("./final");
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/finalViews/home.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "/finalViews/register.html"));
});

app.get("/signIn", (req, res) => {
    res.sendFile(path.join(__dirname, "/finalViews/signIn.html"));
});

app.post("/register", (req, res) => {
    final.register(req.body).then(function(user)
    {
        res.send(`${user.email} registered successfully <br><a href="/">Go Home</a><br>`)
    })
    .catch(function(err)
    {
        res.send(`Error: ${err}`)
    })
});

app.post("/signIn", (req, res) => {
    final.signIn(req.body).then(function(user)
    {
        res.send(`${user.email} signed successfully <br><a href="/">Go Home</a><br>`)
    })
    .catch(function(err)
    {
        res.send(`Error: ${err}`)
    })
});

app.get('*',function(req,res)
{
    res.status(404).send("Not Found");
})

// setup http server to listen on HTTP_PORT
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

final.startDB().then(function()
{
    app.listen(HTTP_PORT, onHttpStart);
})
.catch(function(err)
{
    console.log(err)
})
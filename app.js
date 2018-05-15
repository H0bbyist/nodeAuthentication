const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));

let users = [];

app.use(require('express-session')({
    secret : 'cat',
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/login', (req, res) => {
    res.send(
        ` 
            <div style="margin:100px">
            <h1>Login</h1>
            <form action="/login" method="post">
                <div>
                    <label>Username:</label>
                    <input type="text" name="username"/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password"/>
                </div>
                <div>
                    <input type="submit" value="Log In"/>
                </div>
            </form>
            </div>
        `
    ); 

    console.log(users)
});


app.post('/login',
    passport.authenticate('local', {    successRedirect: '/dashboard',
                                        failureRedirect: '/login',})
);




app.get('/register', (req, res) => {

    res.send(`
    <div style="margin: 100px">
    <h1>Registration</h1>
    <form action="/register" method="POST">
    <label>username:</label>
      <input type="text" name="username" /><br>
      <label>Password:</label>
      <input type="text" name="password" />
      <input type="submit" />
    </form>
    </div>

    `)
})


app.post('/register', (req, res) => {

    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 8);


    users.push({ username: username, password: password});
    console.log(users);
    res.redirect('/login');


})


app.get('/dashboard', (req, res) => {
    
    if (!req.isAuthenticated()) {
        res.redirect('/login');
        return
    }

    res.send('You are authenticated')
})



passport.use(new localStrategy(

    function(username, password, done) {
        let user = users.find((user) => {
            return(user.username == username && bcrypt.compareSync(password,user.password))
        });

        if(!user) {
            return done(null, false, {message : "Incorrect credentials"}); 
        }

        return done(null, username)
    }
));


passport.serializeUser(function(user,done) {
    done(null,user);
});

passport.deserializeUser(function(user, done) {
    console.log('deserialize user called');
    return done(null, {firstName : 'foo', lastName : 'bar'})
})



port = 4444;

app.listen(port, () => {
    console.log('Server running on ' + port)
})
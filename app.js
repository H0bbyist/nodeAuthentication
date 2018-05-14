const express = require('express');
const app = express();



app.get('/', (req, res) => {
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
})

port = 3000;

app.listen(port, () => {
    console.log('Server running on ' + port)
})
const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log("listening to port 3000");
});

//express.static = method to host static files 
app.use(express.static('public'));

//express.json = method to parse
app.use(express.json({
    limit: "1mb"
}));

app.post('/date', (req, res) => {
    console.log('i got a request');
    console.log(req.body);
})
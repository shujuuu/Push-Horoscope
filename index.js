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

// app.post('/date', (req, res) => {
//     console.log('i got a request');
//     console.log(req.body.date);
//     res.json({
//         status: 'success',
//         date: req.body.date
//     })
// })

//sample
let result = {
    goodAct: '\n\t\t\t\t\t\t\t+ Worship+ engagement+ marriage+ business+ sign agreements+ travel+ move house+ open for business+ renovation+ house warming+ install equipment \t\t\t\t\t\t\t',
    badAct: '\n\t\t\t\t\t\t\t+ Demolition+ burial+ assume office\t\t\t\t\t\t\t',
    hours: ['Very Bad',
        'Average ',
        'Average',
        'Good',
        'Bad',
        'Bad',
        'Average',
        'Average',
        'Very Good',
        'Good',
        'Average',
        'Very Bad'
    ]
}

app.get('/list', (req, res) => {
    console.log('getting from list backend');
    res.json({
        result
    })
})
const express = require('express')
const db = require('./connect.js')

const app = express()
require('dotenv').config();
const PORT = process.env.PORT

app.get('/create', (req,res) => {


    const data = [req.query.title, req.query.text,req.query.author,Date().toLocaleString().slice(0,24)];
    for(let i = 0; i<data.length;i++) {data[i] == null ? data[i] = 'blank' : data[i] = data[i]}
    res.json(data)

    const sql = "INSERT INTO notes_main(id, title, text, author, date) VALUES(NULL, ?, ?, ?, ?)";
    
    db.connection.query(sql, data, function(err, results) {
        if(err) console.log(err);
        else console.log("Данные добавлены");
        // res.send("Данные добавлены")
    });
    
    

})

app.get('/show/:limit', (req,res) => {
    let limit = 10
    if(req.params['limit'] > 0) {limit = req.params['limit']}
    console.log(limit)

    db.connection.execute("SELECT * FROM `notes_main` LIMIT " + limit, (err, results) => {
        res.json(results)
        console.log(results)
    })
})

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
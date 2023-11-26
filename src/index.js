const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('연결완료')
})
.catch(err => {
    console.error(err)
});


app.get('/', (req,res) => {
    res.send('Hello, world!!');
})

app.post('/', (req,res) => {
    console.log(req.body);
    res.json(req.body);
})

console.log(path.join(__dirname, '../uploads'));
app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(4000, () => {
    console.log(`${port}번 서버 실행`)
});


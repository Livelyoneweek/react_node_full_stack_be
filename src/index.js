const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

app.get('/', (req,res) => {
    res.send('Hello, world!!');
})

console.log(path.join(__dirname, '../uploads'));
app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(4000, () => {
    console.log(`${port}번 서버 실행`)
});


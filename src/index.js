const express = require('express');

const app = express();
const port = 4000;

app.get('/', (req,res) => {
    res.send('Hello, world!!');
})


app.listen(4000, () => {
    console.log(`${port}번 서버 실행`)
});


const express = require('express');

const app = express();
app.listen(3000, 'localhost')

app.get('/', (req, res) => {
    res.send('how are you?')
})
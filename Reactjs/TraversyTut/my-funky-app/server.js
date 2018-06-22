const express = require('express');
const uuid = require('uuid');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
    res.send({
        projects: [
            {
                id: uuid.v4(),
                title: "balance a tree",
                category: "data structures and algorithms"
            },
            {
                id: uuid.v4(),
                title: "mount sash rod",
                category: "home maintenance"
            },
            {
                id: uuid.v4(),
                title: "write a sorting algorithm",
                category: "data structures and algorithms"
            },
            {
                id: uuid.v4(),
                title: "learn ES6",
                category: "porfessional development"
            }
        ] });
});

app.listen(port, () => console.log('Listening on port ${port}'));
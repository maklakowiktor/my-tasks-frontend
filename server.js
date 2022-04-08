const express = require('express');
const PORT = process.env.PORT || 8080;

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

const app = express();
app.use(requireHTTPS);

app.use(express.static('./dist/my-tasks-frontend/'));


app.get('/*', function(req, res) {
    console.log(req);
    res.sendFile('index.html', { root: './dist/my-tasks-frontend/' });
});

app.listen(PORT);
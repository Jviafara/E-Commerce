require('dotenv').config();
require('./config/connectDB');
const express = require('express');
const routes = require('./routes/router.js');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);

//PayPal API
app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb ');
});

//Routes
app.use('/api', routes);

const port = process.env.PORT || 8080;
app.listen(port, () =>
    console.log(`Server Running on  http://localhost:${port}`)
);

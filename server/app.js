const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

// Handle 404 for any unhandled routes
app.use((req, res) => {
    res.status(404).send({ error: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

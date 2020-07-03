const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const bonds = require('./routes/api/bonds');

const app = express();


app.use(bodyParser.json());
app.use(cors());

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')))

    // app.use('/api/bonds', bonds);
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, '../', 'server', 'routes', 'api', 'bonds.js'))
    // })
}

app.use('/api/bonds', bonds);

const port = 80;


app.listen(port, () => console.log(`[OK] Server start on port ${port}`));
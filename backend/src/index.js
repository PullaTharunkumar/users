const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors')


const app = express();


app.use(cors( {
  origin : 'http://localhost:3000'
}))

app.use(bodyParser.json());
app.use('/api', routes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

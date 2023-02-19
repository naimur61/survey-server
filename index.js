const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.Port || 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => { res.send('Survey server is running !') })


app.listen(port, () => {
   console.log(`survey is running ${port}`);
})

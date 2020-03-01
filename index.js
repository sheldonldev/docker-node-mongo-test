const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded( { extended: false } ));


// Content to MongoDB
mongoose.connect(
    'mongodb://mongo:27017/docker-node-mongo',  // `localhost` is to debug, but should use `mongo` to match server/container name
    { useNewUrlParser: true },
).then( 
    () => console.log('MongoDB Connected')
).catch(
    err => console.log(err)
);


const Item = require('./models/Item');


// route 1
app.get('/', (req, res) => {
    Item.find()
        .then(items => res.render( 'index', { items } ))
        .catch(err => res.status(404).json( { msg: 'No items found' } ));
});
// route 2
app.post('/item/add', (req, res) => {
    const newItem = new Item(
        {
            name: req.body.name
        }
    );
    newItem.save().then(item => res.redirect('/'));
});

const port = 3000

app.listen(port, () => console.log(`Server running on ${port}`))
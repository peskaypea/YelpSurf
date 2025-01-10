const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const SurfSpot = require('./models/surfspot');


mongoose.connect('mongodb://localhost:27017/surf-spot',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/surfspots', async (req, res) => {
    const surfspots = await SurfSpot.find({});
    res.render('surfspots/index', { surfspots });
});

app.get('/surfspots/new', (req, res) => {
    res.render('surfspots/new');
});

app.post('/surfspots', async (req, res) => {
    const surfspot = new SurfSpot(req.body.surfspot);
    await surfspot.save();
    res.redirect(`/surfspots/${surfspot._id}`);

});

app.get('/surfspots/:id', async (req, res) => {
    const surfspot = await SurfSpot.findById(req.params.id);
    res.render('surfspots/show', { surfspot });
});

app.get('/surfspots/:id/edit', async (req, res) => {
    const surfspot = await SurfSpot.findById(req.params.id);
    res.render('surfspots/edit', { surfspot });
});

app.put('/surfspots/:id', async (req, res) => {
    const { id } = req.params;
    const surfspot = await SurfSpot.findByIdAndUpdate(id, {...req.body.surfspot});
    res.redirect(`/surfspots/${surfspot._id}`);
});

app.delete('/surfspots/:id', async (req, res) => {
    const { id } = req.params;
    await SurfSpot.findByIdAndDelete(id);
    res.redirect('/surfspots'); 
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
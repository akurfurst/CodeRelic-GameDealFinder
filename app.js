import express from 'express';

const app = express();
const PORT = 3010;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//Test data to display on main page
const deals = [
    {
        title: "test1",
        price: 20,
        free: false,
        platform: "Steam",
        date: 7
    },
    {
        title: "test2",
        price: 15,
        free: false,
        platform: "xbox",
        date: 14
    },
    {
        title: "test3",
        price: 15,
        free: false,
        platform: "xbox",
        date: 14
    },
    {
        title: "test4",
        price: 15,
        free: false,
        platform: "xbox",
        date: 14
    },
    {
        title: "test5",
        price: 15,
        free: false,
        platform: "xbox",
        date: 14
    }
];

//routing for home page, sends deals array to be displayed in deal cards
app.get('/', (req, res) => {
    res.render('home', {deals});
});

//routing for about-us
app.get('/about-us', (req, res) => {
    res.render('aboutus');
});

//routing to deal from
app.get('/submit-deal', (req, res) => {
    res.render('submit-deal');
});

//routing to admin page
app.get('/admin', (req, res) => {
    res.render('admin', {deals});
});

//routing to form confirmation page and collect user data from from
app.post('/deal-confirm', (req, res) =>{
    //grab user information and add to array
    const deal = {
        title: req.body['game-title'],
        price: req.body.price,
        free: req.body.free,
        url: req.body['deal-url'],
        date: req.body['expiry-date'],
        platform: req.body.platform,
        timestamp: new Date()
    };
    deals.push(deal);
    res.send(deals);
});

//start server and listen on designated port
app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`)
})
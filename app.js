import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

//load environment variables from .env
dotenv.config();
console.log(process.env.DB_HOST);

const app = express();
const PORT = 3010;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//Test data to display on main page

//Create a pool (bucket) of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//database test route
app.get('/db-test', async(req, res) => {
    try{
        const deals = await pool.query('SELECT * FROM deals');
        res.send(deals[0]);
    } catch(err) {
        console.error("Database error: ", err);
    }
});

//routing for home page, sends deals array to be displayed in deal cards
app.get('/', async(req, res) => {
    try {
        let sql = 'SELECT * FROM deals WHERE 1=1';
        let values = [];

        let platforms = req.query.platform;
        let prices = req.query.price
        if(platforms && !Array.isArray(platforms)) {
            platforms = [platforms];
        }
        if(prices && !Array.isArray(prices)) {
            prices = [prices];

        }
        if (platforms && platforms.length > 0){
            const placeholders = platforms.map(() => '?').join(', ');
            sql += ` AND platform IN (${placeholders})`;
            values.push(...platforms);
        }
        

        if (prices && prices.length > 0) {
            const priceConditions = prices.map(()=> 'price <= ?').join('OR');
            sql += ` AND (${priceConditions})`;

        values.push(...prices);
        }
        //console.log(sql);
        //console.log(values);
        const [deals] = await pool.query(sql, values);

        res.render('home', {deals});
    } catch (err) {
        console.error('Error loading filtered deals:', err);
        res.status(500).send('Server error');

    }
    
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
app.get('/admin', async(req, res) => {
    const deals = await pool.query('SELECT * FROM deals');
    //console.log(deals[0]);
    res.render('admin', {deals:deals[0]});
});

//routing to form confirmation page and collect user data from from
app.post('/deal-confirm', async(req, res) =>{
    //grab user information and add to array
    const deal = req.body;
    const params = [
        deal.title,
        deal.price,
        deal.original_price,
        deal.deal_url,
        deal.promo_code,
        deal.expiry_date,
        Array.isArray(deal.platform) ? deal.platform.join(", ") : "none"
    ];
    console.log(deal);
    console.log(params);
    // const deal = {
    //     title: req.body['game-title'],
    //     price: req.body.price,
    //     free: req.body.free ? 'Yes' : 'No',
    //     url: req.body['deal-url'],
    //     date: req.body['expiry-date'],
    //     platform: req.body.platform,
    //     timestamp: new Date()
    // };
    // deals.push(deal);

    //insert user data into database
    const sql = 'insert into deals (title, price, original_price, url, code, date, platform) values (?, ?, ?, ?, ?, ?, ?)';
    const result = await pool.execute(sql, params);


    res.render('confirmation', {deal});
});

//start server and listen on designated port
app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`)
})
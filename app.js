import express from 'express';

const app = express();
const PORT = 3010;
app.set('view engine', 'ejs');
app.use(express.static('public'));

const deals = [
    {
        title: "test1",
        price: 20,
        discount: 15,
        platform: "Steam",
        duration: 7
    },
    {
        title: "test2",
        price: 15,
        discount: 50,
        platform: "xbox",
        duration: 14
    },
    {
        title: "test3",
        price: 15,
        discount: 50,
        platform: "xbox",
        duration: 14
    },
    {
        title: "test4",
        price: 15,
        discount: 50,
        platform: "xbox",
        duration: 14
    },
    {
        title: "test5",
        price: 15,
        discount: 50,
        platform: "xbox",
        duration: 14
    }
];

app.get('/', (req, res) => {
    res.render('home', {deals});
});

app.get('/about-us', (req, res) => {
    res.render('aboutus');
});

app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`)
})
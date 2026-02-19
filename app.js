import express from 'express';

const app = express();
const PORT = 3003;
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () =>{
    console.log(`Server started at http://localhost:${PORT}`)
})
const express = require('express');
const path = require('path');

const shopRouter = require('./routers/shop');
const addProduct = require('./routers/add-product');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/admin', addProduct.router);
app.use(shopRouter);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: '页面走丢了' });
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})



app.listen(3000);
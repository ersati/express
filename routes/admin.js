const express = require('express');
const News = require('../models/news.js');
const router = express.Router();


router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('login');
        return
    }
    next()
})


/* GET home page. */
router.get('/', (req, res) => {
    News.find({}, (err, data) => {
        res.render('admin/index', {
            title: 'admin',
            data
        });
    })
    // const newsData = new News({
    //     title: 'test',
    //     description: 'test'

    // })
    // newsData.save((err) => {
    //     console.log(err)
    // })

});

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', {
        title: 'add news',
        errors: {},
        body: {},
    });

});

router.post('/news/add', (req, res) => {
    const body = req.body;
    const newsData = new News(body);
    const errors = newsData.validateSync();


    newsData.save((err) => {

    });

    res.render('admin/news-form', {
        title: 'add news',
        errors,
        body,

    });

});

router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
        res.redirect('/admin')
    })

});

module.exports = router;
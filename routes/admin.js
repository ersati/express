const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('admin', {
        title: 'admin'
    });
});

module.exports = router;
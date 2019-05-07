const express = require('express');
const router  = express.Router();


// GET root
router.get('/', (req,res) => {
	res.render('index', { title: 'Degnon API', message: 'Home page for Degnon API' });
});

module.exports = router;
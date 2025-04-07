var express = require('express');
var router = express.Router();
const db = require('../db/config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/**Fetch Users */
router.get('/fetchUsers', async function(req, res, next) {
	try { 
		db.query('SELECT * FROM users', (error, result) => {
			if (error) {
				console.log(error);
				res.send({
					data:[],
					status:500,
					message:"failed"
				});
			} else {
				res.send({
					data:result.rows,
					status:200,
					message:"success"
				});
			}
			db.end();
		});
	} catch (err) {
		const { status, message } = getErrorMessage(err);
		res.send({
			status:status,
			message:message,
			data:[]
		});
	}
});

function getErrorMessage(err){
    let statusCode = 500;
    let message = 'Internal Server Error';	

    switch (err.code) {
      case 'ECONNREFUSED':
        statusCode = 503;
        message = 'Database connection refused';
        break;
      case '28000':
        statusCode = 401;
        message = 'Invalid username or password';
        break;
      case '42P01':
        statusCode = 400;
        message = 'Table does not exist';
        break;
      case '23505':
        statusCode = 409;
        message = 'Duplicate entry detected';
        break;
      case '22P02':
        statusCode = 400;
        message = 'Invalid input format';
        break;
      case '42501':
        statusCode = 403;
        message = 'Insufficient privileges';
        break;
      default:
        message = err.message; // Send detailed error in dev mode
    }

	return {
		statusCode:statusCode,
		message:message
	};
}

module.exports = router;

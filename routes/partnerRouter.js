const express = require("express");
const partnerRouter = express.Router();
const Partners = require('../models/partners');

partnerRouter.route('/partners')   
    .get((req, res, next) => {
		Partners.find()
    .then(partner => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partner);
    })
    .catch(err => next(err));
    }) //
    .post((req, res, next) => {
        Partners.create(req.body)
    .then(partner => {
        console.log('Partner Created ', partner);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partner);
    })
    .catch(err => next(err));
    }) //
    .put((req, res) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /partners');
    }) //
    .delete((req, res, next) => {
        Partners.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
    }); //

partnerRouter.route('/:partnerId')
	.get((req, res, next) => {
		Partners.findById(req.params.partnerId)
		.then(partner => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(partner);
		})
		.catch(err => next(err));
	}) //
	.post((req, res) => {
		res.statusCode = 403;
		res.end(`POST operation not supported on /partners/${req.params.partnerId}`);
    }) //
    .put((req, res, next) => {
		Partners.findByIdAndUpdate(req.params.partnerId, {
			$set: req.body
		}, { new: true })
		.then(partner => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(partner);
		})
		.catch(err => next(err));
	}) //
	.delete((req, res, next) => {
		Partners.findByIdAndDelete(req.params.partnerId)
		.then(response => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(response);
		})
		.catch(err => next(err));
	});
	

module.exports = partnerRouter;

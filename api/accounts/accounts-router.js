const router = require('express').Router()
const express = require('express');
const Acct = require('./accounts-model');

const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
} = require('./accounts-middleware');


router.get('/', async (req, res, next) => {
  try {
    const data = await Acct.getAll();
    res.json(data)
  }catch(e){
    next(e)
  }
});

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const data = await Acct.getById(req.params.id);
    res.json(data)
  }catch(e){
    next(e)
  }
});

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try{
    const data = await Acct.create(req.body)
    res.status(201).json(data)
  }catch(e){
    next(e)
  }
});

router.put('/:id', checkAccountPayload, checkAccountId, async (req, res, next) => {
  try{
    const data = await Acct.updateById(req.params.id, req.body)
    res.status(200).json(data)
  }catch(e) {
    next(e)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try{
    const data = await Acct.deleteById(req.params.id);
    res.json(data)
  }catch(e){
    next(e)
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  });
});

module.exports = router;

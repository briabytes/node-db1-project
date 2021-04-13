const express = require('express');
const Account = require('./accounts-model');
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
  } = require('./accounts-middleware');

const router = express.Router()

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Account.getAll()
    res.json(accounts);
  }catch(err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, async (req, res) => {
  res.status(200).json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAcct = await Account.create(req.body)
    res.status(201).json(newAcct);
  }catch(err) {
    next(err);
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, checkAccountNameUnique, async (req, res, next) => {
  const { id } = req.params
  const acctDetails = req.body
  try {
    const updatedAcct = await Account.updateById(id, acctDetails)
    res.status(200).json(updatedAcct)
  }catch(err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedAcct = await Account.deleteById(id)
    res.json(deletedAcct);
  }catch(err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  });
})

module.exports = router;

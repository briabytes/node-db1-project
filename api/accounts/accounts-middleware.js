const express = require('express');
const Account = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body
  if(!name && !budget) {
    res.status(400).json({
      message: 'name and budget are required'
    });
  }if(typeof name !== 'string') {
    res.status(400).json({
      message: 'name of account must be a string'
    });
  }if(name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({
      message: 'name of account must be between 3 and 100'
    });
  }if(typeof budget !== 'number') {
    res.status(400).json({
      message: 'budget of account must be a number'
    });
  }if(budget < 0 || budget > 1000000) {
    res.status(400).json({
      message: 'budget of account is too large or too small'
    });
  }else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  
}

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params
  try {
    const account = await Account.getById(id)
    if(account) {
      req.account = account
      next();
    }else {
      res.status(404).json({
        message: 'account not found'
      });
    }
  }catch(error) {
    next(error);
  }
}

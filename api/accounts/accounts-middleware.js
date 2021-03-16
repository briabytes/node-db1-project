const Acct = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  try{
    if(!req.body.name || req.body.budget){
      res.status(400).json({
        message: 'name and budget are required'
      })
    }else if(typeof req.body.name !== 'string'){
      res.status(400).json({
        message: 'account name must be a string'
      })
    }else if(req.body.name.trim() < 3 || req.body.name.trim() > 100) {
      res.status(400).json({
        message: 'account name must have 3 or more characters'
      })
    }else if(typeof req.body.budget !== 'number'){
      res.status(400).json({
        message: 'budget must be a number'
      })
    }else if(req.body.budget < 0 || req.body.budget > 100000){
      res.status(400).json({
        message: 'budget of account is too big or small'
      })
    }else {
      req.body.name = req.body.name.trim();
      next();
    }
  }catch(e) {
    next(e)
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
    const exisitingAcct = await Acct.getAll()
    const result = exisitingAcct.filter((account) => {
      if(account.name === req.body.name.trim()) {
        return account
      }
    })
    if(result.length > 0) {
      res.status(400).json({
        message: 'name has been taken'
      })
    }else {
      next()
    }
  }catch(e) {
    next(e)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Acct.getById(req.params.id)
    if(!account) {
      res.status(400).json({
        message: 'account is not found'
      })
    }else {
      req.account = account
      next()
    }
  }catch(e) {
    next(e)
  }
}

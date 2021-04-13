const Account = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  const { name, budget } = req.body
  try{
    if(!name || !budget) {
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
      req.body.name = req.body.name.trim()
      next();
    }
  }catch(error){
    next(error)
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
    const account = await Account.getAll()
    const result = account.filter((acct) => {
      if(acct.name === req.body.name.trim()) {
        return account
      }
    })
    if(result.length > 0) {
      res.status(400).json({
        message: 'that name is taken'
      });
    }else {
      next();
    }
  }catch(error){
    next(error);
  }
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

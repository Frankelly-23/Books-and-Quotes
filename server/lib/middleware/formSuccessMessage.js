module.exports = (req, res, next) => {
    
  res.locals.formMessages = req.session.formMessages
  delete req.session.formMessages
  next() 

}

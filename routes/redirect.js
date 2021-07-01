const Url = require('../models/UrlModel');

module.exports = app => {
  app.get("/:short_code", async(req,res) => {
    console.log(req.params.short_code)
    Url.findOne({
      short_code: req.params.short_code
    })
    .then((url) => {
      if (url) return res.redirect(url.longUrl);
      else return res.status(400).send({ message: "No URL FOUND"});
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal server error!"});
    })
  })
}
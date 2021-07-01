const validUrl = require('valid-url');
const Url = require('../models/UrlModel');

const base_url = process.env.base_url;

module.exports = app => {
  app.post("/shorten", async(req,res) => {
    if (req.headers['x-api-key'] != process.env.API_key) return res.status(403).send({ message: "Forbidden action! "});
    
    const { short_code, longUrl } = req.body;
    if (validUrl.isWebUri(longUrl)) {
      Url.findOne({
        longUrl: longUrl
      })
      .then((url) => {
        if (url) return res.status(200).send({ link: url});
        else {
          const shortUrl = base_url + '/' + short_code;
          const url_input = new Url({ short_code, longUrl, shortUrl, date: new Date()});
          url_input.save()
          .then(() => {
            return res.status(200).send({ message: "Successfully entered into database", result: url_input});
          })
        }
      })
      .catch((err) => {
        console.log("error: " + err);
        res.status(500).send({ message: "Server error!"});
      })
    }
    else {
      res.status(401).send({ message: "Invalid LongURL"});
    }
  })
}
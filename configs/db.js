const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connection = mongoose.connect(
  "mongodb+srv://souravpl500:Souravpl500@cluster0.hlt1sxm.mongodb.net/mock?retryWrites=true&w=majority"
);

module.exports = { connection };

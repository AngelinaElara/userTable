const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, require: true},
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  status: {type: Boolean, require: true, default: false},
  createdAt: {type: Date, require: true, default: Date.now},
  updatedAt: {type: Date, require: true, default: null},
})
 
module.exports = model('User', schema)  
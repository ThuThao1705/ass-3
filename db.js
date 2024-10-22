const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thuthao:1234567890@cluster0.u4v4k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;

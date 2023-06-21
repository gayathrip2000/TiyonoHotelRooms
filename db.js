const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);

var mongoURL = 'mongodb+srv://gayathri:gayathri@cluster0.kq6yknb.mongodb.net/mern-room'

mongoose.connect(mongoURL ,{useUnifiedTopology : true ,useNewUrlParser : true})


var connection = mongoose.connection

connection.on('error', ()=> {
    console.log('MongDB Connection Failed')
})

connection.on('connected' , ()=>{
    console.log('MongoDB Connection Successful')
})
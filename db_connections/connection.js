const mongoose = require("mongoose")

const con = process.env.dbURL;
const connect_to_db = async()=>{
    mongoose.connect(con)
    .then((conn)=>{
        console.log(`database is connect to ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log("it have some error");
        console.log(error);
    })
}

module.exports = connect_to_db;
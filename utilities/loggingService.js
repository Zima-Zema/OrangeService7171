var fs = require('fs');

function log(msg) {
    fs.appendFile("../serverError.log",msg,(err)=>{
        console.log(msg)
    })    
}
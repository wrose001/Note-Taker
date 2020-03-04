const fs = require('fs');
//const path = require('path');
const dataPath = require("../db/db.json");
let id = dataPath.length + 1;

module.exports = function(app) {
    app.get('/api/notes', function(req, res){
        res.json(dataPath);
    });

    app.post('/api/notes', function(req, res){
        req.body.id = id++;
        
                        
            dataPath.push(req.body);

            fs.writeFile("./db/db.json", JSON.stringify(dataPath), function(err){
                if(err) throw err;
                console.log("This is ready to read!");
                
            });
            res.json(dataPath);
        });
      
         app.delete("/api/notes/:id", function(req, res) {
            let getId = req.params.id;
            for (let i = 0; i < dataPath.length; i++) {
                console.log(dataPath[i].id, parseInt(getId));
            if(dataPath[i].id === parseInt(getId)){
                dataPath.splice(i, 1);
            }
            }
            fs.writeFile("./db/db.json", JSON.stringify(dataPath), function(err){
                if(err) throw err;
                console.log("This is ready to read!");
                
            })
              res.json(dataPath);  
     })

};
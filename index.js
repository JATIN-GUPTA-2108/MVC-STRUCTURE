var express = require('express');
const fs = require('fs');
bodyParser = require('body-parser');

var app = express();

const projects=[];
let rawdata = fs.readFileSync('data-store.json');
let a = JSON.parse(rawdata);

for(var i in a) {
  projects.push(a[i]);
}


console.log(projects);
  
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/add', (req, res) => {
    res.sendFile(__dirname + '/post.html');
  });
  app.post('/add', (req, res) => {
    const { project_name , project_id} = req.body;
let newproject={
    id: project_id,
    name: project_name
}

projects.push(newproject);
let data = JSON.stringify(projects);

fs.writeFileSync('data-store.json', data);


res.send("PROJECT ADDED SUCCESSFULLY")
  });
  app.get('/projects/:id', function(req, res) {


    const { id } = req.params;

    const sid=id;


    var check=0;
    for(var i = 0; i < projects.length; i++)
    {
      if(projects[i].id == sid)
      {
        
        res.status(200)
        res.send(projects[i]);

      }
    }
    res.status(404)
res.send("not found");
  });
  app.get('*', function(req, res){
    res.send( 404);
  });
  
  app.listen(8000, () => {
    console.log('Our express server is up on port 4000');
  });
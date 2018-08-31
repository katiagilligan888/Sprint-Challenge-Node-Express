const express = require('express'); 
const pModel = require('./data/helpers/projectModel.js'); 
const aModel = require('./data/helpers/actionModel.js'); 


const server = express(); 

server.use(express.json());

server.get("/api/projects", (req, res) => {
    pModel.get().then(projects => {
        res.status(200).json(projects);
    }).catch(err => {
        res.status(500).json({error: "Error retrieving the projects from the database"})
    })
}); 

server.get("/api/projects/:id", (req, res) => {
    const id = req.params.id;
    pModel.get(id).then(project => {
        if(project){
            res.status(200).json(project); 
        }else{
            res.status(404).json({error: "The specified ID does not exist"})
        }
    }).catch(err => {
        res.status(500).json({error: "Error retrieving the project from the database"})
    })
}); 

server.post("/api/projects", (req,res) => {
    const data = req.body; 
    if(data.name && data.description){
        pModel.insert(data).then(newProject => {
            res.status(201).json(newProject)
        }).catch(err => {
            res.status(500).json({error: "Error inserting new project in database"})
        })
    }else {
        res.status(400).json({error: "Please insert name and description in req body"})
    }
})

server.delete("/api/projects/:id", (req, res) => {
    const id = req.params.id; 
    pModel.remove(id).then(count => {
        if(count > 0){
            res.status(200).json({message: "Successfully deleted the project"})
        }
    }).catch(err =>{
        res.status(500).json({error: "There was an error deleting project from database"})
    })
}); 

server.put("/api/projects/:id", (req,res) => {
    const id = req.params.id; 
    const updatedData = req.body; 
    if(updatedData.name && updatedData.description){
        pModel.update(id, updatedData).then(updated => {
            res.status(200).json({updated})
        }).catch(err => {
            res.status(500).json({error: "There was an error updating project in database"})
        })
    }
}); 

// -------------ACTION CRUD OPERATIONS -----------------------------------------------





// Project CRUD Operations ============



server.listen(9000); 
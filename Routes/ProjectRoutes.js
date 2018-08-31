const express = require('express');
const pModel = require('../data/helpers/projectModel.js'); 

const router = express.Router()


router.get("/", (req, res) => {
    pModel.get().then(projects => {
        res.status(200).json(projects);
    }).catch(err => {
        res.status(500).json({error: "Error retrieving the projects from the database"})
    })
}); 

router.get("/:id", (req, res) => {
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

router.get("/:id/actions", (req,res) => {
    const id = req.params.id; 
    pModel.getProjectActions(id).then(projectActions => {
        if(projectActions){
            res.status(200).json(projectActions); 
        }else{
            res.status(404).json({error: "The specified ID does not exist"})
        }
    }).catch(err => {
        res.status(500).json({error:"Error retrieving the project from the database"})
    })
})

router.post("/", (req,res) => {
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

router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    pModel.remove(id).then(count => {
        if(count > 0){
            res.status(200).json({message: "Successfully deleted the project"})
        }
    }).catch(err =>{
        res.status(500).json({error: "There was an error deleting project from database"})
    })
}); 

router.put("/:id", (req,res) => {
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

module.exports = router; 
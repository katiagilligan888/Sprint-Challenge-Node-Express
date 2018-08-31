const express = require('express'); 
const aModel = require('../data/helpers/actionModel.js'); 

const router = express.Router(); 


router.get("/", (req, res) => {
    aModel.get().then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        res.status(500).json({error: "Error retrieving the actions from the database"})
    })
}); 

router.get("/:id", (req, res) => {
    const id = req.params.id;
    aModel.get(id).then(action => {
        if(action){
            res.status(200).json(action); 
        }else{
            res.status(404).json({error: "The specified ID does not exist"})
        }
    }).catch(err => {
        res.status(500).json({error: "Error retrieving the action from the database"})
    })
}); 

router.post("/", (req,res) => {
    const data = req.body; 
    if(data.project_id && data.description && data.notes){
        aModel.insert(data).then(newAction => {
            res.status(201).json(newAction)
        }).catch(err => {
            res.status(500).json({error: "Error inserting new action in database"})
        })
    }else {
        res.status(400).json({error: "Please insert project ID, notes,  and description in req body"})
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    aModel.remove(id).then(count => {
        if(count > 0){
            res.status(200).json({message: "Successfully deleted the action"})
        }
    }).catch(err =>{
        res.status(500).json({error: "There was an error deleting action from database"})
    })
}); 

router.put("/:id", (req,res) => {
    const id = req.params.id; 
    const updatedData = req.body; 
    if(updatedData.project_id && updatedData.description && updatedData.notes){
        aModel.update(id, updatedData).then(updated => {
            res.status(200).json({updated})
        }).catch(err => {
            res.status(500).json({error: "There was an error updating action in database"})
        })
    }
}); 

module.exports = router; 


const express = require('express'); 
const pModel = require('./data/helpers/projectModel.js'); 
const aModel = require('./data/helpers/actionModel.js'); 


const server = express(); 

server.use(express.json());

// ----------- PROJECTS CRUD OPERATORS --------------------------------------------

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

server.get("/api/projects/:id/actions", (req,res) => {
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

server.get("/api/actions", (req, res) => {
    aModel.get().then(actions => {
        res.status(200).json(actions);
    }).catch(err => {
        res.status(500).json({error: "Error retrieving the actions from the database"})
    })
}); 

server.get("/api/actions/:id", (req, res) => {
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

server.post("/api/actions", (req,res) => {
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

server.delete("/api/actions/:id", (req, res) => {
    const id = req.params.id; 
    aModel.remove(id).then(count => {
        if(count > 0){
            res.status(200).json({message: "Successfully deleted the action"})
        }
    }).catch(err =>{
        res.status(500).json({error: "There was an error deleting action from database"})
    })
}); 

server.put("/api/actions/:id", (req,res) => {
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


server.listen(9000); 
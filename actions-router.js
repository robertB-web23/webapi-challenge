const express = require('express');

const router = express.Router();

const Actions = require('./data/helpers/actionModel.js')
const Projects = require('./data/helpers/projectModel.js')


//GET actions

router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        res.status(500).json({ message: "no actions"})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Actions.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({ message: "unable to retrieve action"})
        })
});

//POST Action

router.post('/',validateProjectExistence, (req, res) => {
    newAction = req.body;
    Actions.insert(newAction)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(error => {
        res.status(500).json({ message: "unable to add new action" })
    })
    }   
);

//PUT update action

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Actions.update(id, changes)
        .then(project =>{
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ message: "unable to add post"})
        })
});

//DELETE action

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
        .then(action => {
            res.status(200).json({message: "Action deleted"})
        })
        .catch(error => {
            res.status(500).json({message: "unable to delete action"})
        })
})

function validateProjectExistence(req, res, next) {
    const project = req.body.project_id;

    Projects.get(project)
        .then(project => {
            if(!project) {
                return  res.status(400).json({ message: "invalid project id"})
            }
        next()
        })
        .catch(error => {
            res.status(500).json(error)
        })
}


module.exports = router;

const express = require('express');

const router = express.Router();

const Projects = require('./data/helpers/projectModel.js')


// GET ROUTES //

router.get('/', (req,res) => {
    
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({message: "Unable to retrieve projects", error})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Projects.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ message: "unable to retrieve project"})
        })
});

// POST Project //

router.post('/', (req, res) => {
    newProject = req.body;

    Projects.insert(newProject)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({message:"unable to add project", error})
        })
})

// Update project 

router.put('/:id',validateProjectId, (req,res) => {
    const id = req.params.id;
    const changes = req.body;

    Projects.update(id, changes)
        .then(project =>{
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json({ message: "unable to add post"})
        })
});

// DELETE Project

router.delete('/:id',validateProjectId, (req, res) => {
    const id = req.params.id;
    Projects.remove(id)
        .then(project => {
            res.status(200).json({message: "project deleted"})
        })
        .catch(error => {
            res.status(500).json({message: "unable to delete project"})
        })
})

// middleware

function validateProjectId(req, res, next) {
    const id = req.params.id;

    Projects.get(id)
        .then(project => {
            if(!project) {
                return  res.status(400).json({ message: "invalid project id"})
            }
        next()
        })
        .catch(error => {
            res.status(500).json(error)
        })
};


module.exports = router;
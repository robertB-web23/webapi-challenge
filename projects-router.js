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


module.exports = router;
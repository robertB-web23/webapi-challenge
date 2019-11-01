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


module.exports = router;

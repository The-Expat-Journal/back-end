const router = require('express').Router();

const Photos = require('./photos-model.js');

router.get('/', (req, res) => {
    Photos.find()
        .then(photos => {
            res.status(200).json(photos);
        })
        .catch(error => {
            res.send(error);
        })
});


router.get('/:id', (req, res) => {
    const  { id } = req.params;

    Photos.findById(id)
        .then(photo => {
            if (photo) {
                res.status(200).json(photo);
            } else {
                res.status(404).json({message: "Could not retrieve photo with given id"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Failed to get photo"})
        })
});

router.put('/:id', (req, res) => {
    const photoUpdates = req.body;
    const {id} = req.params;

    Photos.findById(id)
        .then(photo => {
            if(photo) {
                Photos.update(photoUpdates, id)
                    .then(updatedPhoto => {
                        res.status(201).json(updatedPhoto);
                    });
            } else {
                res.status(404).json({message: "Could not find photo with given id"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Failed to update photo"})
        })
});

router.delete('/:id', (req,res) => {
    const {id} = req.params;

    Photos.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({message: "deleted photo"})
            } else {
                res.status(404).json({message: "Could not find photo with given id"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Failed to delete photo"})
        })
});

module.exports = router;

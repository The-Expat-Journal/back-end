const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/:id/stories', (req, res) => {
    const { id } = req.params;
    Users.findStories(id) 
        .then(stories => {
            if (stories.length) {
                res.status(201).json(stories)
            } else {
                res.status(404).json({message: "Could not retrieve stories"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Failed to get stories"})
        })
})

router.post('/:id/stories', (req, res) => {
    const storyInfo = req.body;
    const { id } = req.params;
    storyInfo.user_id = id;
    // storyInfo.date = Date.now()

    Users.addStory(storyInfo)
        .then(story => {
            res.status(201).json(story);
        })
        .catch(error => {
            res.status(500).json({message: "Failed to add new story"})
        })
});

router.delete('/:id', (req,res) => {
    const {id} = req.params;

    Users.remove(id) 
        .then(deleted => {
            if (deleted) {
                res.json({message: "deleted user"})
            } else {
                res.status(404).json({message: "Could not find user with given id"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Failed to delete user"})
        })
});


module.exports = router;
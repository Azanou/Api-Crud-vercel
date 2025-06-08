const express = require('express')

const router = express.Router();

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
    
} = require('../controllers/tasks')


//recuperer toutes les taches  et creer une tache 
router.route('/').get(getAllTasks).post(createTask);

//recuperer et supprimer une tache precise

router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
// controllers/tasks.js
const Task = require('../models/Tasks'); // On importe notre modèle de tâche

// Fonction pour obtenir toutes les tâches (READ)
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}); // Trouve toutes les tâches
        res.status(200).json({ tasks }); // Envoie les tâches avec un statut 200 (OK)
    } catch (error) {
        res.status(500).json({ msg: error.message }); // En cas d'erreur, envoie un statut 500
    }
};

// Fonction pour créer une nouvelle tâche (CREATE)
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body); // Crée une nouvelle tâche avec les données du corps de la requête
        res.status(201).json({ task }); // Envoie la tâche créée avec un statut 201 (Créé)
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Fonction pour obtenir une seule tâche (READ by ID)
const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params; // Récupère l'ID de la tâche depuis les paramètres de l'URL
        const task = await Task.findOne({ _id: taskID }); // Trouve la tâche par son ID

        if (!task) {
            return res.status(404).json({ msg: `Aucune tâche avec l'ID : ${taskID}` }); // Si pas de tâche, 404 (Non trouvé)
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Fonction pour mettre à jour une tâche (UPDATE)
const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params; // Récupère l'ID
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true, // Retourne le document mis à jour
            runValidators: true, // Exécute les validateurs du schéma (comme 'required')
        });

        if (!task) {
            return res.status(404).json({ msg: `Aucune tâche avec l'ID : ${taskID}` });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Fonction pour supprimer une tâche (DELETE)
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params; // Récupère l'ID
        const task = await Task.findOneAndDelete({ _id: taskID }); // Supprime la tâche

        if (!task) {
            return res.status(404).json({ msg: `Aucune tâche avec l'ID : ${taskID}` });
        }

        res.status(200).json({ msg: 'Tâche supprimée avec succès !' }); // Message de succès
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// On exporte toutes nos fonctions
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
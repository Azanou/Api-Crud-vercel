const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    name : {
        type : String,
        required  : [true, "Veuillez ajouter un nom de tache"],
        trim : true,
        maxlength : [20, "le nom de la tache ne peut depasser 20 caracteres"]
    },
    completed : {
        type : Boolean,
        default : false
    }
}
)

module.exports = mongoose.model('Task', TaskSchema);
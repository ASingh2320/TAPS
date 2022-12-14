const mongoose = require('mongoose');
Schema = mongoose.Schema;

const FolderSchema = new mongoose.Schema({
    name: { type: String },
    ownerID: { type: Schema.Types.ObjectId},
    folderId: { type: Schema.Types.ObjectId},
    tags: {type: [String]}

});

module.exports = mongoose.model('Folder', FolderSchema);
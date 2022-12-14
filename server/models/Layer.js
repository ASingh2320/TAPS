const mongoose = require('mongoose');
Schema = mongoose.Schema;

const LayerSchema = new mongoose.Schema(
    {
         //chunks: {type: [Chunk]},
         parentid: { type: Schema.Types.ObjectId },
         class: {type: String},
         compression: {type: String},
         data: { type: [Number]},
         draworder: {type: String},
         encoding: {type: String},
         height: {type: Number},
         id: {type: Number},
         image: {type: String},
         //layers: {type: [Number]},
         locked: {type: Boolean},
         name: {type: String},
         //objects: {type: [Object]},
         offsetx: {type: Number},
         offsety: {type: Number},
         opacity: {type: Number},
         parallaxx: {type: Number},
         parallaxy: {type: Number},
         //properties: {type: [Property]},
         repeatx: {type: Number},
         repeaty: {type: Number},
         startx: {type: Number},
         starty: {type: Number},
         tintcolor: {type: String},
         transparentcolor: {type: String},
         type: {type: String},
         visible: {type: Boolean},
         width: {type: Number},
         x: {type: Number},
         y: {type: Number}
    }
)

const Layer = mongoose.model("Layer", LayerSchema);
module.exports = {Layer, LayerSchema};
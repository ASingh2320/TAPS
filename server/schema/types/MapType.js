const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');
const UserType = require("./UserType");

const User = require('../../models/User');

const MapType = new GraphQLObjectType({
    name: 'Map',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        image: {type: GraphQLString},
        starred: {type: GraphQLBoolean},
        ownerID: {type: GraphQLID},
        folderId: {type: GraphQLID},
        backgroundColor: {type: GraphQLString},
        class: {type: GraphQLString},
        compressionLevel: {type: GraphQLFloat},
        height: {type: GraphQLFloat},
        hexSideLength: {type: GraphQLFloat},
        infinite: {type: GraphQLBoolean},
        collabIDs:{type:GraphQLList(GraphQLID)},
        collabolators:{
           type: GraphQLList(UserType),
           async resolve(parent, args){
               let a=[];
               let ids=parent.collabIDs
 
               for (const id of ids){
                  
                   let b= await User.findById(id);
                   console.log(b)
                  a.push(b)
               }
             
               return a
           }
       },

        /*
        layers: {
            type: GraphQLList(LayerType),
            resolve(parent, args){
                return Layer.find({parentID: parent.id});
            }
        },
        */
        nextlayerid: {type: GraphQLInt},
        nextobjectid: {type: GraphQLString},
        orientation: {type: GraphQLString},
        parallaxOriginX: {type: GraphQLString},
        parallaxOriginY: {type: GraphQLFloat},
        //properties: {type: [Property]},
        renderorder: {type: GraphQLString},
        staggeraxis: {type: GraphQLString},
        staggerindex: {type: GraphQLString},
        tags: {type: GraphQLList(GraphQLString)},
        tiledversion: {type: GraphQLString},
        tileheight: {type: GraphQLFloat},
        //tilesets: {type: GraphQLList(TilesetType)},
        tilewidth: {type: GraphQLFloat},
        type: { type: GraphQLString},
        version: {type: GraphQLString},
        width: {type: GraphQLFloat},
        bio: {type: GraphQLString},
        isEditing: {type: GraphQLID},
        mapData: {type: GraphQLString},
        importedTileList: {type: GraphQLString},
        tilesets: {type: GraphQLString},
        layerOrder: {type: GraphQLString},
        mapHeight: {type: GraphQLInt},
        mapWidth: {type: GraphQLInt} 
    })
});


module.exports = MapType;
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType, GraphQLFloat, GraphQLBoolean, GraphQLScalarType } = require('graphql');

const TilesetInputType = new GraphQLInputObjectType({
    name: "TileInput",
    fields: {
        backgroundcolor: {type: GraphQLString},
        class: {type: GraphQLString},
        columns: {type: GraphQLInt},
        fillmode: {type: GraphQLString},
        firstgid: {type: GraphQLInt},
        //grid: {type: Grid},
        image: {type: GraphQLString},
        imageheight: {type: GraphQLInt},
        imagewidth: {type: GraphQLInt},
        margin: {type: GraphQLInt},
        name: {type: GraphQLString},
        objectalignment: {type: GraphQLString},
        //properties: {type: [Property]},
        spacing:{type: GraphQLInt},
        source: {type: GraphQLInt},
        //terrains: {type: [Terrain]},
        tilecount: {type: GraphQLInt},
        source: {type: GraphQLString},
        tileheight: {type: GraphQLInt},
        tiledversion: {type: GraphQLString},
        tilerendersize: {type: GraphQLString},
        //tiles: {type: [Tile]},
        tilewidth: {type: GraphQLInt},
        //transformations: {type: Transformation},
        transparentcolor: {type: GraphQLString},
        type: {type: GraphQLString},
        version: {type: GraphQLString}
    },
});

module.exports = TilesetInputType;
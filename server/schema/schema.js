const Project = require("../models/Project");
const Client = require('../models/Client');
const Tileset = require('../models/Tileset');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType, GraphQLInt, GraphQLInputObjectType } = require('graphql');

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId);
            }
        }
    })
});
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        hash: {type: GraphQLString},
        username: {type: GraphQLString},
        bio: {type: GraphQLString},
    })
});
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
const ChunkType = new GraphQLObjectType({
    name: 'Chunk',
    fields: () => ({
        id: {type: GraphQLID},
        data: {type: [GraphQLInt]},
        height: {type: GraphQLInt},
        width: {type: GraphQLInt},
        x: {type: GraphQLInt},
        y: {type: GraphQLInt},
    })
});

const TilesetType = new GraphQLObjectType({
    name: 'Tileset',
    fields: () => ({
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
        objectalignment: {type: GraphQLString},
        //properties: {type: [Property]},
        source: {type: GraphQLInt},
        //terrains: {type: [Terrain]},
        tilecount: {type: GraphQLInt},
        source: {type: GraphQLString},
        tiledversion: {type: GraphQLString},
        tilerendersize: {type: GraphQLString},
        //tiles: {type: [Tile]},
        tilewidth: {type: GraphQLInt},
        //transformations: {type: Transformation},
        transparentcolor: {type: GraphQLString},
        type: {type: GraphQLString},
        version: {type: GraphQLString}
    })
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTileSet:{
            type: TilesetType,
            args: {
                TilesetInput: {type: TilesetInputType}
            },
            resolve(parent, args){
                let input = args.TilesetInput;
                const tileset = new Tileset(input);
                return tileset.save();
            }
        },
        addClient:{
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            }
        },
        deleteClient:{
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Client.findByIdAndRemove(args.id);
            }
        },
        addProject:{
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            'new': {value: "Not Started"},
                            'progress': {value: "In Progress"},
                            'completed': {value: "Completed"},
                        }
                    }),
                    defaultValue: "Not Started",
                },
                clientid: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientid,
                });
                return project.save();
            }
        },

        deleteProject:{
            type: ProjectType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return Project.findByIdAndRemove(args.id);
            }
        },

        updateProject: {
            type: ProjectType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            'new': {value: "Not Started"},
                            'progress': {value: "In Progress"},
                            'completed': {value: "Completed"},
                        }
                    }),
                },
            },
            resolve(parent, args){
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        }
                    },
                    {new: true},
                );
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects:{
            type: GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id);
            }
        },
        clients:{
            type: GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id);
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation,
});
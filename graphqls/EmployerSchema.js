const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = require('graphql')

const EmployerSchema = new GraphQLObjectType({
  name: 'Employer',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    location: {
      type: GraphQLString
    },
    password: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
})

module.exports = EmployerSchema

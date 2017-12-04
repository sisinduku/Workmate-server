const { GraphQLInputObjectType, GraphQLFloat } = require('graphql')

const CriteriaInputSchema = new GraphQLInputObjectType({
  name: 'Criteria',
  fields: {
    big5_openness: {
      type: GraphQLFloat
    },
    big5_extraversion: {
      type: GraphQLFloat
    },
    big5_agreeableness: {
      type: GraphQLFloat
    },
    big5_conscientiousness: {
      type: GraphQLFloat
    },
    need_curiosity: {
      type: GraphQLFloat
    },
    need_ideal: {
      type: GraphQLFloat
    },
    need_challenge: {
      type: GraphQLFloat
    },
    need_practicality: {
      type: GraphQLFloat
    },
    value_openness_to_change: {
      type: GraphQLFloat
    },
    value_self_transcendence: {
      type: GraphQLFloat
    },
    value_conservation: {
      type: GraphQLFloat
    },
    value_self_enhancement: {
      type: GraphQLFloat
    }
  }
})

module.exports = CriteriaInputSchema

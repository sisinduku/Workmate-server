const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
require('dotenv').config()

const SearchPersonalityRoute = require('./routes/SearchPersonalityRoute')
const EmployerRoute = require('./routes/EmployerRoute')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const job_seeker = require('./routes/JobSeekerRoute');
app.use('/job_seekers', job_seeker)
app.use('/search_personality', SearchPersonalityRoute)
app.use('/employer', EmployerRoute)

/*
* GRAPHQL SCHEMA
*/
const RootSchema = require('./graphqls/RootSchema');

/*
* Setup endpoint for GraphQL
*/
app.use('/graphql', graphqlHTTP({
  schema: RootSchema,
  graphiql: true
}));

module.exports = app

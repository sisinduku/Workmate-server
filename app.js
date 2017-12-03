const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const SearchPersonalityRoute = require('./routes/SearchPersonalityRoute')
const EmployerRoute = require('./routes/EmployerRoute')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

require('dotenv').config()
const job_seeker = require('./routes/JobSeekerRoute');
app.use('/job_seekers', job_seeker)
app.use('/search_personality', SearchPersonalityRoute)
app.use('/employer', EmployerRoute)

/*
*
* GRAPHQL API
* all in one page, refactor later ;)
*/

const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

/*
* Models
*/
const Employer = require('./models/Employer');
const JobSeeker = require('./models/JobSeeker');

/*
* Utils
*/
const crypto = require('crypto');
const requestPersonality = require('./lib/requestPersonality');
const similarityPersonality = require('./lib/similarityPersonality');

/*
* GraphQL schema
*/
const schema = buildSchema(`
  type Employer {
    _id: ID!,
    name: String,
    company: String,
    location: String,
    password: String,
    createdAt: String,
    updatedAt: String
  }
  
  input JobSeekerData {
    name: String,
    location: String,
    educations: [String],
    skills: [String],
    executive_summary: String
  }

  type JobSeeker {
    _id: ID!,
    name: String,
    location: String,
    educations: [String],
    skills: [String],
    executive_summary: String,
    personality_insight: String,
    password: String
  }

  type JobSeekerByPersonality {
    jobSeeker: JobSeeker,
    similarity: Float
  }

  input Criteria {
    big5_openness: Float,
    big5_extraversion: Float,
    big5_agreeableness: Float,
    big5_conscientiousness: Float,
    need_curiosity: Float,
    need_ideal: Float,
    need_challenge: Float,
    need_practicality: Float,
    value_openness_to_change: Float,
    value_self_transcendence: Float,
    value_conservation: Float,
    value_self_enhancement: Float
  }

  type Query {
    employers: [Employer],
    jobSeeker(_id: ID!): [JobSeeker],
    jobSeekersByPersonality(criteria: Criteria): [JobSeekerByPersonality]
  }
`);

/*
* GraphQL root queries
*/
const root = {
  jobSeekersByPersonality: async ({ criteria }) => {
    try {
      const jobSeekers = await JobSeeker.find({ personality_insight: {$ne: null} });
      return jobSeekers.map(jobSeeker => ({
        jobSeeker,
        similarity: similarityPersonality(criteria, JSON.parse(jobSeeker.personality_insight))
      }))
      .sort((a, b) => b.similarity - a.similarity);
    } 
    catch (err) {
      return err;
    }
  },

  jobSeeker: async ({ _id }) => {
    try {
      const jobSeeker = await JobSeeker.findOne({ _id: _id });
      return jobSeeker;
    } 
    catch (err) {
      return err;
    }
  },

  createJobSeeker: async ({ jobSeekerData }) => {
    try {
      const personality = await requestPersonality(jobSeekerData.executive_summary);
      jobSeekerData.password = crypto.createHash('md5').update(req.body.password).digest('hex');
      jobSeekerData.personality_insight = JSON.stringify(personality);
      const createdJobSeeker = await JobSeeker.create(jobSeekerData);
      return createdJobSeeker;
    }
    catch (err) {
      return err;
    }
  },

  employers: async () => {
    try {
      const employers = await Employer.find({});
      return employers;
    } 
    catch (err) {
      return err;
    }
  }
}


/*
* Setup endpoint for GraphQL
*/
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

module.exports = app

const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

const fetchFunctiontoWatson = (text) => {
  return new Promise(function(resolve, reject) {
    const personality_insights = new PersonalityInsightsV3({
      username: `${process.env.WATSONUSERNAME}`,
      password: `${process.env.WATSONPASSWORD}`,
      version_date: '2017-10-13'
    })

    personality_insights.profile(
      {
        text: text,
        consumption_preferences: true
      },
      function (err, response) {
        if (err) {
          reject(err)
        }
        else {
          resolve(response)
        }
      }
    )
  })
}

module.exports = fetchFunctiontoWatson

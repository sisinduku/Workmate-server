const User = require('../models/User')
const requestPersonality = async (fetchFunctiontoWatson, text) => {
  if (text.length < 100) {
    return {error: 'words count must >= 100'}
  } else {
    return await fetchFunctiontoWatson(text)
  }
}

module.exports = requestPersonality;

const fetchFunctiontoWatson = require('./fetchFunctiontoWatson')

const requestPersonality = async (text) => {
  if (text.length < 100) {
    return new Error('words count must >= 100')
  } else {
    try {
      return await fetchFunctiontoWatson(text)
    } catch (e) {
      throw e
    }
  }
}

module.exports = requestPersonality

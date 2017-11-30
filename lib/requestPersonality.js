const fetchFunctiontoWatson = require('./fetchFunctiontoWatson')

const requestPersonality = async (text) => {
  if (text.length < 100) {
    return {error: 'words count must >= 100'}
  } else {
    try {
      return await fetchFunctiontoWatson(text)
    } catch (e) {
      return e
    }
  }
}

module.exports = requestPersonality

const personality = ['big5_openness', 'big5_extraversion', 'big5_agreeableness', 'big5_conscientiousness']
const needs = ['need_curiosity', 'need_ideal', 'need_challenge', 'need_practicality']
const values = ['value_openness_to_change', 'value_self_transcendence', 'value_conservation', 'value_self_enhancement']

const similarityPersonality = (origin, target) => {
  let distance = 0.0

  if (origin === null) {
    return new Error('origin parameter could not be null')
  } else if (target === null) {
    return new Error('target parameter could not be null')
  }

  // Count distance
  for (let key in origin) {
    if (personality.indexOf(key) !== -1) {
      const index = target.personality.findIndex(row => row.trait_id == key)
      distance += Math.pow(origin[key] - target.personality[index].percentile, 2)
    } else if (needs.indexOf(key) !== -1) {
      const index = target.needs.findIndex(row => row.trait_id == key)
      distance += Math.pow(origin[key] - target.needs[index].percentile, 2)
    } else if (values.indexOf(key) !== -1) {
      const index = target.values.findIndex(row => row.trait_id == key)
      distance += Math.pow(origin[key] - target.values[index].percentile, 2)
    }
  }

  return 1 - (Math.sqrt(distance / (personality.length + needs.length + values.length)))
}

module.exports = similarityPersonality

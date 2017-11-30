const personality = ['Openness', 'Extraversion', 'Agreeableness', 'Conscientiousness']
const needs = ['Curiosity', 'Ideal', 'Challenge', 'Practicality']
const values = ['Openness to change', 'Self-transcendence', 'Conservation', 'Self-enhancement']

const similarityPersonality = (origin, target) => {
  let distance = 0.0

  if (origin === null || target === null) {
    return {error: 'parameter could not be null'}
  }

  // Count personality distance
  origin.personality.forEach((element) => {
    if (personality.indexOf(element.name) !== -1) {
      const index = target.personality.findIndex(row => row.name == element.name)
      distance += Math.pow(element.percentile - target.personality[index].percentile, 2)
    }
  })
  // Count needs distance
  origin.needs.forEach((element, index) => {
    if (needs.indexOf(element.name) !== -1) {
      const index = target.needs.findIndex(row => row.name == element.name)
      distance += Math.pow(element.percentile - target.needs[index].percentile, 2)
    }
  })
  // Count values distance
  origin.values.forEach((element, index) => {
    if (values.indexOf(element.name) !== -1) {
      const index = target.values.findIndex(row => row.name == element.name)
      distance += Math.pow(element.percentile - target.values[index].percentile, 2)
    }
  })

  return 1 - (Math.sqrt(distance / (personality.length + needs.length + values.length)))
}

module.exports = similarityPersonality

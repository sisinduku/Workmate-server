const JobSeeker = require('../models/JobSeeker')
const Employer = require('../models/Employer')

const Redis = require('../lib/Redis')

const summary = require('../__mockData__/summary.json')
const user1 = require('../__mockData__/user1.json')
const user2 = require('../__mockData__/user2.json')
const user3 = require('../__mockData__/user3.json')
const user4 = require('../__mockData__/user4.json')
const user5 = require('../__mockData__/user5.json')
const user6 = require('../__mockData__/user6.json')
const user7 = require('../__mockData__/user7.json')
const user8 = require('../__mockData__/user8.json')

const beforeTestHelper = async () => {
  await Employer.create([
    {
      _id: '507f1f77bcf86cd799439011',
      name: 'Satria Saputra',
      email: "halo@halo.com",
      company: 'PT. Cempaka',
      location: 'Jakarta',
      password: "sdJAS87123jn"
    }, {
      name: 'Satria Garuda',
      email: "halo@halo.com",
      company: 'PT. Garuda',
      location: 'Tangerang',
      password: "sdJAS87123jn"
    }
  ])

  await JobSeeker.insertMany([
    {
      _id: '507f1f77bcf86cd799439012',
      name: 'Satria Saputra',
      location: 'Jakarta',
      email: "halo@halo.com",
      educations: [
        'Universitas Bina Nusantara'
      ],
      skills: [
        'Node.js',
        'Express.js'
      ],
      executive_summary: summary.data,
      personality_insight: JSON.stringify(user2),
      password: "sdJAS87123jn"
    },
    {
      name: 'Bima Ambien',
      location: 'Bogor',
      email: "halo@halo.com",
      educations: [
        'Institut Pertanian Bogor'
      ],
      skills: [
        'Node.js',
        'Express.js'
      ],
      executive_summary: summary.data,
      personality_insight: JSON.stringify(user3),
      password: "sdJAS87123jn"
    },
    {
      name: 'Doni Alamanda',
      location: 'Jakarta',
      email: "halo@halo.com",
      educations: [
        'Universitas Bina Nusantara'
      ],
      skills: [
        'Node.js',
        'Express.js'
      ],
      executive_summary: summary.data,
      personality_insight: JSON.stringify(user4),
      password: "sdJAS87123jn"
    },
    {
      name: 'Crystal Clear',
      location: 'Jakarta',
      email: "halo@halo.com",
      educations: [
        'Universitas Bina Nusantara'
      ],
      skills: [
        'Node.js',
        'Express.js'
      ],
      executive_summary: summary.data,
      personality_insight: JSON.stringify(user5),
      password: "sdJAS87123jn"
    },
    {
      name: 'Cikita Medeni',
      location: 'Jakarta',
      email: "halo@halo.com",
      educations: [
        'Universitas Bina Nusantara'
      ],
      skills: [
        'Node.js',
        'Express.js'
      ],
      executive_summary: summary.data,
      personality_insight: JSON.stringify(user6),
      password: "sdJAS87123jn"
    },
    {
      name: 'Agnes Monikah',
      location: 'Jakarta',
      email: "halo@halo.com",
      educations: [
        'Universitas Bina Nusantara'
      ],
      skills: [
        'Node.js',
        'Express.js'
      ],
      executive_summary: summary.data,
      personality_insight: JSON.stringify(user7),
      password: "sdJAS87123jn"
    },
    {
      name: 'Maria Ozawi',
      location: 'Jakarta',
      email: "halo@halo.com",
      educations: [
        'Universitas Bina Nusantara'
      ],
      skills: [
        'Node.js',
        'Express.js'
      ],
      executive_summary: summary.data,
      personality_insight: JSON.stringify(user8),
      password: "sdJAS87123jn"
    },
  ])
}

const afterTestHelper = async () => {
  await JobSeeker.remove({})
  await Employer.remove({})
  await Redis.flushall()
}

module.exports = {
  beforeTestHelper,
  afterTestHelper
}

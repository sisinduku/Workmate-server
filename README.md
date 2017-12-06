# Workmate
[![Build Status](https://travis-ci.org/sisinduku/workmate-server.svg?branch=merge-with-search-personlity)](https://travis-ci.org/sisinduku/workmate-server)
[![Test Coverage](https://api.codeclimate.com/v1/badges/90f92f59c47730959d03/test_coverage)](https://codeclimate.com/github/sisinduku/workmate-server/test_coverage)

This application is a platform for a employer to find candidate of employee according to required criteria base on a personality insight. To using this application, a job seeker can input biodata and executive summry. Base on biodata and executive summary then application will be a analyze it, then show the result. The result of the analysis is oppenness, extraversion, agreeableness, conscientiousness, curiousity, ideal, challange, practicality, stimulation, helping other, tradition, achievment

# Installation
Using NPM
```
npm install
```
or yarn
```
yarn
```
Run:
Using NPM
```
npm dev
```
or yarn
```
yarn dev
```

# GraphQL End Point
You can access GraphQL in

`localhost:3000/graphql`

# REST API
List of workmate routes:

| Route | HTTP | Description |
| ------ | ------ | ------ |
| `/job_seekers/:id` | GET | Show profile job seeker by id |
| `/job_seekers` | POST | Create new profile Job Seeker |
| `/job_seekers/:id` | PUT | Update profile Job Seeker |
| `/job_seekers/:id` | DELETE | Delete profile Job Seeker |
| `/employer/get_employer` | GET | Show All profile Employer |
| `/employer/get_employer/:employerId` | GET | Show profile Employer by id |
| `/employer/update_employer/:employerId` | POST | Update profile Employer |
| `/employer/post_employer` | POST | Create new profile employer |
| `/search_personality` | POST | Search all profile Job Seeker |
| `/send_email` | POST | Send Email invitation to Job Seeker |

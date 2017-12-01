const redis = require('redis');
client = redis.createClient(6379)

class JobSeekerRedis {
  static set(id,data){
    return client.set(id, JSON.stringify(data), 'EX', 3600)
  }
  static del(id){
    return client.del(id)
  }
  static async get(id){
    let promiseJobSeeker = new Promise((resolve,reject) => {
      client.get(id, (err, reply) => {
        if (err) {
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
    let redisJobSeeker = await promiseJobSeeker
    console.log('im from redis');
    return (JSON.parse(redisJobSeeker))
  }
}

module.exports = JobSeekerRedis

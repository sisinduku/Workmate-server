const app = require('./app')

app.listen(process.env.PORT || 3000, () => {
  if (process.env.PORT)
    console.log('Hello from port: ', process.env.PORT)
  else
    console.log('Hello from port: 3000')
})

// require packages used in the project
const express = require('express')
const app = express()
const port = 7000
// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
// for index
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
// for show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurants = restaurantList.results.find (
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id 
  )
  res.render('show', { restaurants })
})

// for show
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantSearch = restaurantList.results.filter(
    (restaurant) => { return restaurant.name.toLowerCase().includes (keyword.toLowerCase())}
  )
  res.render('index', { restaurants: restaurantSearch, keyword: keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
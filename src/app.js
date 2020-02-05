const path    = require('path'),
      express = require('express'),
      hbs     = require('hbs')

const geocode  = require('./utils/geocode'),
      forecast = require('./utils/forecast')

console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath           = path.join(__dirname,'../templates/views')
const partialsPath        = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:    'help',
        helpText: 'This is some helpful text.',
        name:     'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address!'
        })
    }

    geocode(address = req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            
            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Meat',
        errorMessage: 'Help page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Meat',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000, () => {          // start the app, listen on port:3000 (dev)
    console.log('Server is up on port 3000.')
})            
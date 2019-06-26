const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handle bar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Raghava'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Raghava'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'How can I help you?',
        title: 'Help ',
        name: 'Raghava'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Provide an Address'
        })
    }


    geocode(req.query.address, (error, {longitude,latitude, location}={}) => {
        if(error){
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })

    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res)=> {
    res.render('404',{
        title: '404 ',
        name: 'Raghava',
        errorMessage: 'Help Article Not Found',
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404 ',
        name: 'Raghava',
        errorMessage: 'Page Not Found',
    })
})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})

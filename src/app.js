const express=require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

app.use(express.static(publicDirectoryPath))
app.get('', (req,res)=>{
    res.render('index', { 
            title:'Weather App',
            name:'Santhosh PG'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', { 
            title:'About me',
            name:'Santhosh PG'
    })
})
 
app.get('/help', (req,res)=>{
    res.render('help', { 
            title:'help',
            name:'Santhosh PG'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!'
        })
    }
        geocode(req.query.address, (error,{latitude, longitude, location}= {}) =>{
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })
            })
            
        })

    // res.send({forecast:'rainy',
    //           location:'vizag',
    //           address:req.query.address  })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide search term'
        })
    }

    console.log(req.query)
    res.send({product:[]})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Santhosh PG',
        errorMessage:'Help artical not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:404,
        name:'Santhosh PG',
        errorMessage:'Page not found.'
    })
})

app.listen(port, () =>{
    console.log('Server is up and running on ' + port)
})

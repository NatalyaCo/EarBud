const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const applicationUser = []
const startPassport = require('./authentification.js')
const passport = require('passport')
startPassport(passport, email =>
    applicationUser.find(user => user.email === email))

app.listen(3000)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/login', (req,res) => {
    res.render('login.ejs')
})

app.get('/accountcreate', (req,res) => {
    res.render('accountcreate.ejs')
})

app.post('/login', (req, res) => {

})

app.post('/accountcreate', async (req, res) => {
    try{
        const hash = await bcrypt.hash(req.body.password, 10)
        applicationUser.push ({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hash
        })
        res.redirect('/login')
    } catch{
        res.redirect('/accountcreate')
    }
    console.log(applicationUser)
})



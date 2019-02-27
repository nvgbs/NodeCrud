let express = require ('express')
let bodyParser = require ('body-parser')
let app = express()
const fs = require('fs')
const control = require ('./control.js')




app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(bodyParser.json())




// ROUTE LOGIN


app.post('/login', (request, response) =>{

	control.checkLoginPayload(request, response)
		
})


// ROUTE CREATE

app.post('/user/create', (request, response) =>{

	control.checkCreateUser(request, response)

})
	
// ROUTE DELETE

app.post('/user/delete', (request, response)=>{

	control.deleteUser(request, response)

})

// ROUTE CHANGE

app.post('/user/edit', (request, response)=>{

	control.editUser(request, response)

})


// ROUTE DISPLAY

app.get('/user/display', (request, response)=>{

	control.displayUser(response)

})




console.log('Serveur actif')

app.listen(8080)
//Module Mongo
const mongo = require('mongodb').MongoClient

// variable avec mon adresse DB
const url = 'mongodb://localhost:27017'

////////////////////////// LOGIN USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const userCheckDb = (userNameInput, passwordInput) => {
	return new Promise((resolve, reject) => {
		
		// Fonction pour se connecter à la DB 
		mongo.connect(url, (err, client) => {
			if (err) {
				console.error(err)
				reject(err) 
			}
		   	console.log("Vous êtes bien connecté à la base de donnée") 
		   	//variable qui pointe sur ma DB
		   	const db = client.db('db')
		   	//Variable qui pointe sur collection de la DB
		   	const collection = db.collection('user')
		   	// Requete DB avec les paramêtres recup ds la fonction
		   	collection.find({userName : userNameInput, password : passwordInput}).toArray((err, items) => {
		   		//condition sur le tableau récup
		   		if (items[0] === undefined){			   		
			   		console.log('Informations Login erronées')
			   		resolve(2)
			   	} else {
			   		console.log('Informations Login correctes')
			   		resolve(1)			   		
			   	}
			 })
		   })
	})	
}



////////////////////////// CREATE USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 

const userRegister = (userNameInput, firstNameInput, lastNameInput, passwordInput) => {
  return new Promise((resolve, reject) => {	
	mongo.connect(url, (err, client) => {
 		if (err) {
    		console.error(err)
    		return
  	 	}else{
   	 		console.log("Vous êtes bien connecté à la base de donnée")  
  	 	}	 	
		//variable qui pointe sur ma DB
		const db = client.db('db')
		//Variable qui pointe sur collection de la DB
		const collection = db.collection('user')		

		collection.find({userName : userNameInput}).toArray((err, items) => {
			if (items[0] === undefined){			   	
			   	collection.insertOne({userName: userNameInput, firstName: firstNameInput,
				lastName: lastNameInput, password: passwordInput}, (err, result) => {
				})
				console.log('Utilisateur enregistré dans la base de donnée')
				resolve(1)		   		
			}else{				
				console.log('Utilisateur déja connu')
				resolve(2)
			}
		})
	})
  })
}




////////////////////////// DELETE USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const deleteUserDb = (userNameInput) => {
  return new Promise((resolve, reject) => {	
	mongo.connect(url, (err, client) => {
 		if (err) {
    		console.error(err)
    		return
  	 	}else{
   	 		console.log("Vous êtes bien connecté à la base de donnée")  
  	 	}	 	
		//variable qui pointe sur ma DB
		const db = client.db('db')
		//Variable qui pointe sur collection de la DB
		const collection = db.collection('user')		

		collection.find({userName : userNameInput}).toArray((err, items) => {
			if (items[0] === undefined){			   	
			   	
				console.log('Utilisateur inconnu')
				resolve(2)		   		
			}else{
				collection.deleteOne({userName: userNameInput}, (err, item) => {  				
				})						
				console.log('Utilisateur effacé avec succès')
				resolve(1)
			}
		})
	})
  })
}

////////////////////////// EDIT USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



const editUserDb = (userNameInput, firstNameInput, lastNameInput, passwordInput) => {
  return new Promise((resolve, reject) => {	
	mongo.connect(url, (err, client) => {
 		if (err) {
    		console.error(err)
    		return
  	 	}else{
   	 		console.log("Vous êtes bien connecté à la base de donnée")  
  	 	}	 	
		//variable qui pointe sur ma DB
		const db = client.db('db')
		//Variable qui pointe sur collection de la DB
		const collection = db.collection('user')		

		collection.find({userName : userNameInput}).toArray((err, items) => {
			if (items[0] === undefined){			   	
				console.log('Utilisateur Inconnu')
				resolve(2)		   		
			}else{
				collection.updateOne({userName: userNameInput}, {'$set': {userName: userNameInput,
				 firstName:firstNameInput, lastName:lastNameInput,password:passwordInput}}, (err, item) => {
				 console.log('Utilisateur modifié avec succès')
				 resolve(1)  				
				})				
			}
		})
	})
  })
}


////////////////////////// DISPLAY USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const getUsers = () => {
  return new Promise((resolve, reject) => {	
	mongo.connect(url, (err, client) => {
 		if (err) {
    		console.error(err)
    		resolve("Connection échoué")
  	 	}else{
   	 		console.log("Vous êtes bien connecté à la base de donnée")  
  	 	}	 	
		//variable qui pointe sur ma DB
		const db = client.db('db')
		//Variable qui pointe sur collection de la DB
		const collection = db.collection('user')

		collection.find().toArray((err, items) => {
  		console.log(items)
  		resolve(items)
		})
	})
  })
}














module.exports = {
 	userCheckDb,
 	userRegister,
 	deleteUserDb,
 	editUserDb,
 	getUsers 	
}
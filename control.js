const fs = require('fs');
const controlDb = require ('./mongoRequest.js')



////////////////////////// LOGIN USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	
const checkLoginPayload = async (request, response) => {

	if (request.body.userName === undefined || request.body.password === undefined) {
		response.status('404').send('Informations manquantes ou invalides')
	} else {
		const dbCheckLogin = await controlDb.userCheckDb(request.body.userName, request.body.password)		
		if (dbCheckLogin === 1 ){
			response.status('202').send('Vous êtes bien connecté')		
		}
		else {
		response.status('403').send('Informations erronées')
		}
	}	
}




////////////////////////// CREATE USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const checkCreateUser = async (request, response) => {

	//modele de key que je veux recevoir
	const checkInfo = ['userName', 'firstName','lastName','password']
	//checkBody est un array contenant les cles de lobjet request.body
	const checkBody = Object.keys(request.body)	
	const checkValue = Object.values(request.body)	
	const bodyLength = checkBody.length
	//boucle pour check si j'ai bien les bonnes keys et dans l'ordre
	let i = 0	
	while (i < checkBody.length && checkInfo[i] === checkBody[i] && checkValue[i] != ''){		
		i++
	}

	if (i === 4){
		
		const dbUserCreate = await controlDb.userRegister(checkValue[0],checkValue[1],checkValue[2],checkValue[3])
		if(dbUserCreate === 1){
			let user = request.body		
			response.status('202').send('Utilisateur enregistré')
		}else{
			response.status('404').send("Nom d'utilisateur déja pris")
		}
	}
	else {
		response.status('404').send('Informations manquantes ou invalides')
	}
}





////////////////////////// EDIT USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const editUser = async (request, response) => {

	//modele de key que je veux recevoir
	const checkInfo = ['userName', 'firstName','lastName','password']
	//checkBody est un array contenant les cles de lobjet request.body
	const checkBody = Object.keys(request.body)	
	const checkValue = Object.values(request.body)
	console.log(checkBody)
	console.log(checkValue)
	const bodyLength = checkBody.length
	//boucle pour check si j'ai bien les bonnes keys et dans l'ordre
	let i = 0	
	while (i < checkBody.length && checkInfo[i] === checkBody[i] && checkValue[i] != ''){		
		i++
	}

	if (i === 4){		
		const dbEditUser = await controlDb.editUserDb(checkValue[0],checkValue[1],checkValue[2],checkValue[3])
		if(dbEditUser === 2){
			response.status('404').send("Utilisateur inconnu")
		}else{			
			response.status('202').send('Utilisateur modifié avec succès')
		}
	}
	else {
		response.status('404').send('Informations manquantes ou invalides')
	}
}

////////////////////////// DELETE USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const deleteUser = async (request, response) => {
	const checkBody = Object.keys(request.body)
	console.log(checkBody)
	if (checkBody[0] === 'userName'){
		const delUser = await controlDb.deleteUserDb(request.body.userName)
		if (delUser === 1){
			response.status('202').send('Utilisateur effacé avec succès')
		}else{
			response.status('403').send('Utilisateur inconnu')
		}
	}else{
		response.status('404').send('Informations manquantes ou invalides')
	}
}



////////////////////////// DISPLAY USER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


const displayUser = async (response) => {
	const displayAll = await controlDb.getUsers()
	response.status('202').send(displayAll)
}






module.exports = {
 	checkLoginPayload,
 	checkCreateUser,
 	editUser,
 	deleteUser,
 	displayUser 	
}
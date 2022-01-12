const express = require('express');
const app = express();
const port = 5000;

const users = {
	users_list :
	[
		{
			id: 'xyz789',
			name: 'Charlie',
			job: 'Janitor',
		},
		{
			id: 'abc123',
			name: 'Mac',
			job: 'Bouncer',
		},
		{
			id: 'ppp222',
			name: 'Mac',
			job: 'Professor',
		},
		{
			id: 'yat999',
			name: 'Dee',
			job: 'Aspiring actress',
		},
		{
			id: 'zap555',
			name: 'Dennis',
			job: 'Bartender',
		},
	]
}

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/users', (req, res) => {
	const name = req.query.name;
	const job = req.query.job;
	if (name != undefined){
		if (job != undefined){
			let result = findUserByNameJob(name, job);
			result = {users_list: result};
			res.send(result);
		}
		else {
			let result = findUserByName(name);
			result = {users_list: result};
			res.send(result);
		}
	}
	else {
		res.send(users);
	}
});

app.get('/users/:id', (req, res) => {
	const id = req.params['id'];
	let result = findUserById(id);
	if (result === undefined || result.length == 0)
		res.status(404).send('Resource not found. ');
	else {
		result = {users_list: result};
		res.send(result);
	}
});

app.post('/users', (req, res) => {
	const userToAdd = req.body;
	addUser(userToAdd);
	res.status(200).end();
});

app.delete('/users/:id', (req, res) => {
	const id = req.params['id'];
	let result = findUserById(id);
	if (result === undefined || result.length == 0)
		res.status(404).send('Resource not found. ');
	else {
		deleteUser(result);
		res.status(200);
	}
});

function deleteUser(user) {
	users['users_list'].pop(user);
}

function addUser(user) {
	users['users_list'].push(user);
}

function findUserById(id) {
	return users['users_list'].find( (user) => user['id'] === id);
}

function findUserByNameJob(name, job) {
	return users['users_list'].find( ((user) => user['name'] === name) && ((user) => user['job'] === job))
}

const findUserByName = (name) => {
	return users['users_list'].filter( (user) => user['name'] === name);
}

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});



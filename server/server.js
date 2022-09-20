const express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	fs = require('file-system'),
	shortId = require('shortid'),
	dbFilePath = 'tasks.json',
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/tasks', (req, res) => res.send(getTasksFromDB()));

app.post('/api/task', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = req.body;

	task.time = task.time || 'Не указано';
	task.id = shortId.generate();
	task.description = task.description || 'No Description';
	task.status = 'In Progress';

	tasksData.push(task);
	setTasksToDB(tasksData);

	res.send(task);
});

app.get('/api/task/:id', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = tasksData.find(task => task.id === req.params.id);

	task ? res.send(task) : res.status(404).send({ error: 'Task with given ID was not found' });
});

app.put('/api/task/:id', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = tasksData.find(task => task.id === req.params.id),
		updatedTask = req.body;

	task.title = updatedTask.title;
	task.description = updatedTask.description || 'No Description';

	setTasksToDB(tasksData);

	res.sendStatus(204);
});

function getTasksFromDB() {
	return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function setTasksToDB(tasksData) {
	fs.writeFileSync(dbFilePath, JSON.stringify(tasksData));
}

app.listen(3000, () => console.log('Server has been started...'));

app.delete('/api/tasks', (req, res) => {
	setTasksToDB([]);
	res.sendStatus(204);
});

app.delete('/api/task/:id', (req, res) => {
	const tasksData = getTasksFromDB(),
		selectedTask = tasksData.find((task) => task.id === req.params.id),
		updatedTaskList = tasksData.filter((task) => task.id !== selectedTask.id);

	setTasksToDB(updatedTaskList);

	res.sendStatus(204);
})

app.put('/api/task/:id/done', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = tasksData.find((task) => task.id === req.params.id),
		updatedTask = req.body;
	updatedTask.status = 'Done';
	task.status = updatedTask.status;
	setTasksToDB(tasksData);
	res.sendStatus(204);
});

app.get('/api/tasks/sort', (req, res) => {
	const tasksData = getTasksFromDB();
	tasksData.sort(function (one, two) {
		let modelOne = one.title.toLowerCase(), modelTwo = two.title.toLowerCase();

		if (modelOne < modelTwo)
			return -1
		if (modelOne > modelTwo)
			return 1
		return 0
	});
	setTasksToDB(tasksData);

	res.send(tasksData);

});





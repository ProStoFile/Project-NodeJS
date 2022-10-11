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
app.use((res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/tasks', (res) => res.send(getTasksFromDB()));

app.post('/api/task', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = req.body;

	task.dateInsuranceStart = task.dateInsuranceStart || 'Не указано';
	task.daysInsuranceValidityLeft = task.daysInsuranceValidityLeft;
	task.id = shortId.generate();
	task.description = task.description || 'Пусто';
	task.status = 'In Progress';
	task.capacity = task.capacity || 'Объем не указан';
	task.fuelUsed = task.fuelUsed || 'Не указано';
	task.distanceTraveled = task.distanceTraveled || 'Не указано';
	task.fuelCost = task.fuelCost;
	task.totalFuelUsed = (task.fuelUsed * task.distanceTraveled).toFixed(1);
	task.totalFuelCost = (task.totalFuelUsed * task.fuelCost).toFixed(2);
	task.tireType = task.tireType;
	task.dateAdded = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

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
	task.description = updatedTask.description || 'Нет описания';
	task.dateInsuranceStart = updatedTask.dateInsuranceStart;
	task.capacity = updatedTask.capacity;
	task.fuelUsed = updatedTask.fuelUsed;
	task.fuelCost = updatedTask.fuelCost;
	task.distanceTraveled = updatedTask.distanceTraveled;
	task.totalFuelUsed = (updatedTask.fuelUsed * updatedTask.distanceTraveled).toFixed(1);
	task.totalFuelCost = (updatedTask.fuelUsed * updatedTask.distanceTraveled * updatedTask.fuelCost).toFixed(2);
	task.tireType = updatedTask.tireType;

	setTasksToDB(tasksData);
	res.sendStatus(204);
});

app.put('/api/tasks/setorder', (req) => {
	const tasksData = getTasksFromDB(),
		tasksOrder = req.body;
	tasksData.sort((one, two) => tasksOrder.indexOf(one.id) - tasksOrder.indexOf(two.id));
	setTasksToDB(tasksData);
});

function getTasksFromDB() {
	return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function setTasksToDB(tasksData) {
	fs.writeFileSync(dbFilePath, JSON.stringify(tasksData));
}

app.listen(3000, () => console.log('Сервер запущен...'));

app.delete('/api/tasks', (res) => {
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

app.get('/api/tasks/sortbymodel', (res) => {
	const tasksData = getTasksFromDB();
	tasksData.sort((one, two) => {
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

app.get('/api/tasks/sortbydistancetraveled', (res) => {
	const tasksData = getTasksFromDB();
	tasksData.sort((one, two) => {
		return two.distanceTraveled - one.distanceTraveled;
	});
	setTasksToDB(tasksData);
	res.send(tasksData);

});

app.get('/api/tasks/sortbytotalfuelcost', (res) => {
	const tasksData = getTasksFromDB();
	tasksData.sort((one, two) => {
		return two.totalFuelCost - one.totalFuelCost;
	});
	setTasksToDB(tasksData);
	res.send(tasksData);
});
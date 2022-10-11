const express = require('express'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	fs = require('file-system'),
	shortId = require('shortid'),
	dbFilePath = 'cars.json',
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

app.get('/api/cars', (req, res) => res.send(getCarsFromDB()));

app.post('/api/car', (req, res) => {
	const carsData = getCarsFromDB(),
		car = req.body;

	car.dateInsuranceStart = car.dateInsuranceStart || 'Не указано';
	car.daysInsuranceValidityLeft = car.daysInsuranceValidityLeft;
	car.id = shortId.generate();
	car.description = car.description || 'Пусто';
	car.capacity = car.capacity || 'Объем не указан';
	car.fuelUsed = car.fuelUsed || 'Не указано';
	car.distanceTraveled = car.distanceTraveled || 'Не указано';
	car.fuelCost = car.fuelCost;
	car.totalFuelUsed = (car.fuelUsed * car.distanceTraveled).toFixed(1);
	car.totalFuelCost = (car.totalFuelUsed * car.fuelCost).toFixed(2);
	car.tireType = car.tireType;

	carsData.push(car);
	setCarsToDB(carsData);

	res.send(car);
});

app.get('/api/car/:id', (req, res) => {
	const carsData = getCarsFromDB(),
		car = carsData.find(car => car.id === req.params.id);

	car ? res.send(car) : res.status(404).send({ error: 'Car with given ID was not found' });
});

app.put('/api/car/:id', (req, res) => {
	const carsData = getCarsFromDB(),
		car = carsData.find(car => car.id === req.params.id),
		updatedCar = req.body;

	car.model = updatedCar.model;
	car.description = updatedCar.description || 'Нет описания';
	car.dateInsuranceStart = updatedCar.dateInsuranceStart;
	car.capacity = updatedCar.capacity;
	car.fuelUsed = updatedCar.fuelUsed;
	car.fuelCost = updatedCar.fuelCost;
	car.distanceTraveled = updatedCar.distanceTraveled;
	car.totalFuelUsed = (updatedCar.fuelUsed * updatedCar.distanceTraveled).toFixed(1);
	car.totalFuelCost = (updatedCar.fuelUsed * updatedCar.distanceTraveled * updatedCar.fuelCost).toFixed(2);
	car.tireType = updatedCar.tireType;

	setCarsToDB(carsData);
	res.sendStatus(204);
});

app.put('/api/cars/setorder', (req, res) => {
	const carsData = getCarsFromDB(),
		carsOrder = req.body;
	carsData.sort((one, two) => carsOrder.indexOf(one.id) - carsOrder.indexOf(two.id));
	setCarsToDB(carsData);
});

function getCarsFromDB() {
	return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function setCarsToDB(carsData) {
	fs.writeFileSync(dbFilePath, JSON.stringify(carsData));
}

app.listen(3000, () => console.log('Сервер запущен...'));

app.delete('/api/cars', (req, res) => {
	setCarsToDB([]);
	res.sendStatus(204);
});

app.delete('/api/car/:id', (req, res) => {
	const carsData = getCarsFromDB(),
		selectedCar = carsData.find((car) => car.id === req.params.id),
		updatedCarList = carsData.filter((car) => car.id !== selectedCar.id);
	setCarsToDB(updatedCarList);
	res.sendStatus(204);
})

app.get('/api/cars/sortbymodel', (req, res) => {
	const carsData = getCarsFromDB();
	carsData.sort((one, two) => {
		let modelOne = one.model.toLowerCase(), modelTwo = two.model.toLowerCase();
		if (modelOne < modelTwo)
			return -1
		if (modelOne > modelTwo)
			return 1
		return 0
	});
	setCarsToDB(carsData);
	res.send(carsData);
});

app.get('/api/cars/sortbydistancetraveled', (req, res) => {
	const carsData = getCarsFromDB();
	carsData.sort((one, two) => {
		return two.distanceTraveled - one.distanceTraveled;
	});
	setCarsToDB(carsData);
	res.send(carsData);
});

app.get('/api/cars/sortbytotalfuelcost', (req, res) => {
	const carsData = getCarsFromDB();
	carsData.sort((one, two) => {
		return two.totalFuelCost - one.totalFuelCost;
	});
	setCarsToDB(carsData);
	res.send(carsData);
});
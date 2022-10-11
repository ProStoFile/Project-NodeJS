class Cars {
	static async getCarsList() {
		const response = await fetch('http://localhost:3000/api/cars');

		return await response.json();
	}

	static async addCar(newCar) {
		const response = await fetch('http://localhost:3000/api/car', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newCar)
		});

		return await response.json();
	}

	static async getCar(id) {
		const response = await fetch(`http://localhost:3000/api/car/${id}`);

		return await response.json();
	}

	static async editCar(updatedCar) {
		await fetch(`http://localhost:3000/api/car/${updatedCar.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedCar)
		});
	}

	static async setCarsOrder(carsOrder) {
		await fetch(`http://localhost:3000/api/cars/setorder`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(carsOrder)
		});
	}

	static async clearCarsList() {
		await fetch('http://localhost:3000/api/cars', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
	}

	static async sortCarsListByModel() {
		const response = await fetch('http://localhost:3000/api/cars/sortbymodel');
		return await response.json();
	}

	static async sortCarsListByDistanceTraveled() {
		const response = await fetch('http://localhost:3000/api/cars/sortbydistancetraveled');
		return await response.json();
	}

	static async sortCarsListByTotalFuelCost() {
		const response = await fetch('http://localhost:3000/api/cars/sortbytotalfuelcost');
		return await response.json();
	}



	static async removeSelectedCar(selectedCar) {
		await fetch(`http://localhost:3000/api/car/${selectedCar.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
	}

}

export default Cars;
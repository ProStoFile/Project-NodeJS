class Tasks {
	static async getTasksList() {
		const response = await fetch('http://localhost:3000/api/tasks');

		return await response.json();
	}

	static async addTask(newTask) {
		const response = await fetch('http://localhost:3000/api/task', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newTask)
		});

		return await response.json();
	}

	static async getTask(id) {
		const response = await fetch(`http://localhost:3000/api/task/${id}`);

		return await response.json();
	}

	static async editTask(updatedTask) {
		await fetch(`http://localhost:3000/api/task/${updatedTask.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedTask)
		});
	}

	static async setTasksOrder(tasksOrder) {
		await fetch(`http://localhost:3000/api/tasks/setorder`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(tasksOrder)
		});
	}

	static async clearTasksList() {
		await fetch('http://localhost:3000/api/tasks', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
	}

	static async sortTasksListByModel() {
		const response = await fetch('http://localhost:3000/api/tasks/sortbymodel');
		return await response.json();
	}

	static async sortTasksListByDistanceTraveled() {
		const response = await fetch('http://localhost:3000/api/tasks/sortbydistancetraveled');
		return await response.json();
	}

	static async sortTasksListByTotalFuelCost() {
		const response = await fetch('http://localhost:3000/api/tasks/sortbytotalfuelcost');
		return await response.json();
	}



	static async removeSelectedTask(selectedTask) {
		await fetch(`http://localhost:3000/api/task/${selectedTask.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
	}

	static async setTaskStatus(selectedTask) {
		await fetch(`http://localhost:3000/api/task/${selectedTask.id}/done`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},

		});
	}

}

export default Tasks;
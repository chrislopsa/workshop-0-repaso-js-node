//Creating the 'Task' class
class Task {
    //the values of 'id' and 'description' are assigned as attributes of the 'Task' object that are received as parameters and the 'completed' attribute by default is set to 'false'.
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
    //Method to change the value of the 'completed' attribute
    toggleComplete() {
        this.completed = !this.completed;
    }
}
//creating the 'TaskManager' class
class TaskManager {
    constructor() {
        //Objects brought from localStorage converted from JSON to a JS object are assigned to the 'tasks' attribute, if there are no objects in localStorage it is assigned an empty array
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks();
    }
    //Method for adding tasks
    addTask(description) {
        //Creation of the 'ID', if the 'tasks' attribute is not empty, the 'ID' attribute of the last position of said array is accessed and 1 is added, in case 'tasks' is empty, the id is 1.
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        //Instantiating the 'Task' object
        const task = new Task(id, description);
        // push the new task into the 'tasks' array
        this.tasks.push(task);
        //store the information in localStorage
        this.saveTasks();
        //rendering the information on the screen
        this.renderTasks();
    }
    //Method for delete tasks
    deleteTask(id) {
        //modify the 'tasks' attribute by filtering it by those that do not correspond to the 'ID' we want to delete
        this.tasks = this.tasks.filter(task => task.id !== id);
        //store the information in localStorage
        this.saveTasks();
        //rendering the information on the screen
        this.renderTasks();
    }
    //Method for update tasks
    updateTask(id,description) {
        const task = this.tasks.find(task => task.id === id);
        task.description = description;
        this.saveTasks();
        this.renderTasks();
    }
    //Method to toggle task status
    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            //create a new instance with the same data as the task obtained from localStorage
            const taskInstance = new Task(task.id, task.description, task.completed);
            //go through the 'tasks' list and where the 'ID' coincides, replace it with the new instance
            this.tasks = this.tasks.map(t => (t.id === id ? taskInstance : t));
            this.saveTasks();
            this.renderTasks();
        }else{
            alert("tarea no encontrada")
        }
    }
    //host task information in LocalStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    //
    loadTasks() {
        this.renderTasks();
    }
    //Method for Rendering the Entire Task List
    renderTasks() {
        //Get the HTML element where we're going to render
        const taskList = document.getElementById('task-list');
        //leave the HTML element empty so that every time we manipulate the task list and call the method 'renderTasks', the tasks are not overwritten
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            //create an HTML list item for each of the tasks
            const item = document.createElement('li');
            //add the description of each task to its 'li' element
            item.textContent = task.description;
            //set a CSS class for each task according to its state
            //create a delete button for each of the tasks
            const deleteButton = document.createElement('button');
            //added the word 'eliminar' to each
            deleteButton.textContent = 'Eliminar';
            //Added a 'Click' type event listener to each 'Eliminar' button
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the event from propagating to the parent element, why? Because the button click event also propagates to the li element.
                //run the 'deleteTask' method on the task that corresponds to the 'id'
                this.deleteTask(task.id);
            });

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Actualizar Nombre';

            updateButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const $inputName = document.createElement('input');
                const $buttonSend = document.createElement('button');
                $buttonSend.textContent = 'Actualizar'
                $buttonSend.addEventListener('click', () => {
                    this.updateTask(task.id, $inputName.value);
                })

                item.append($inputName, $buttonSend);
            });

            const changeStatusBtn = document.createElement("button");
            changeStatusBtn.textContent = 'Cambiar Estado';

            changeStatusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleTaskComplete(task.id);
            });

            const statusTask = document.createElement("p");

            if(!task.completed){
                statusTask.textContent = 'No completado' 
            }else{
                statusTask.textContent = 'Completado'
            }

            //add the 'deletebutton' element to each 'item'
            item.append(deleteButton, updateButton, changeStatusBtn, statusTask);
            //add each item to the tasklist
            taskList.appendChild(item);
        });
    }
}
//create a new instance of 'taskManager' after it has loaded the DOM
document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    //Get the 'add-task' id element and add a click-type event listener to it
    document.getElementById('add-task').addEventListener('click', () => {
        //Obtain the value entered by the user
        const newTask = document.getElementById('new-task').value;
        //if it is not an empty string, we run the 'addTask' method and leave the field empty again
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});
// Seleziona gli elementi DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Carica le attività salvate all'avvio
document.addEventListener('DOMContentLoaded', loadTasks);

// Aggiunge una nuova attività
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previene il ricaricamento della pagina

    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = ""; // Pulisce il campo di input
    }
});

// Funzione per aggiungere un'attività
function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Contenitore per i pulsanti
    const buttonContainer = document.createElement('div');

    // Pulsante "Completata"
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'; // Icona Font Awesome per la spunta
    completeButton.classList.add('complete');
    completeButton.addEventListener('click', () => {
        li.classList.toggle('completed'); // Alterna lo stato completato
    });

    // Pulsante "Elimina"
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-times"></i>'; // Icona Font Awesome per la X
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
        li.remove(); // Rimuove l'attività dalla lista
        removeTaskFromLocalStorage(taskText); // Rimuove dal LocalStorage
    });

    // Aggiungi i pulsanti al contenitore
    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);

    // Aggiungi il contenitore dei pulsanti all'elemento della lista
    li.appendChild(buttonContainer);
    taskList.appendChild(li);
}

// Funzione per salvare un'attività nel LocalStorage
function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Salva come JSON
}

// Funzione per rimuovere un'attività dal LocalStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText); // Rimuove l'attività
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Funzione per ottenere le attività dal LocalStorage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : []; // Ritorna un array vuoto se non esistono
}

// Funzione per caricare le attività salvate
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(taskText => addTask(taskText));
}

// Filtra le attività
document.getElementById('filter-tasks').addEventListener('change', (e) => {
    const filterValue = e.target.value;
    const tasks = document.querySelectorAll('#task-list li');

    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');

        switch (filterValue) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = isCompleted ? 'flex' : 'none';
                break;
            case 'uncompleted':
                task.style.display = !isCompleted ? 'flex' : 'none';
                break;
        }
    });
});

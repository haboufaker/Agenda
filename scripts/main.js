// Declaracion de variable para nombre
let nameInput = "";

// Declaracion variable numero de eventos
let eventNumber = 0;
let counter = 0;

// Declaracion de lista de eventos
let toDoList = [];


// Declaracion de funciones
class ToDo {
    constructor(content, category, done, createdAt) {
        this.content = content;
        this.category = category;
        this.done = done;
        this.createdAt = createdAt;
    }
}

function populateToDoList() {
    let todo1 = {
        content: prompt("Ingresa la tarea a realizar"),
        category: prompt("Trabajo o Personal?"),
        done: false,
        createdAt: new Date(),
        }
    toDoList.push(todo1);
}

// Nombre de la persona que usara la agenda
while (nameInput == "") {
    nameInput = prompt("Ingrese su nombre");

    if (nameInput == "") {
        alert("Por favor no deje este campo en blanco, introduzca un nombre valido");
    }
    else {
        console.log("Su nombre es" + " " + nameInput);
    }
}

eventNumber = prompt("Introduzca el numero de eventos a agregar")



// Algoritmo para agregar eventos y mostrarlos en la consola

while (counter < eventNumber) {
    populateToDoList();
    counter++;
}

console.log(toDoList);


// Algoritmo para marcar tareas como completadas
toDoList.forEach(function(toDo) {

    if (!toDo.done) {
        let completion = prompt("Se completo el evento" + " " + toDo.content +"?");
            if (completion == "si") {
                toDo.done = true;
            }
    }
});

console.log(toDoList);

// Algoritmo para encontrar eventos
let eventSearch = prompt("Escriba el evento que desea buscar");
const eventFinder = toDoList.find(toDo => toDo.content == eventSearch);

console.log(eventFinder);
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
        content: "Realizar la primera preentrega",
        category: "Personal",
        done: false,
        createdAt: new Date('2022-09-24'),
        }
    toDoList.push(todo1);
    let extratoDo = String(prompt("Desea agregar otro evento?"));
    while (extratoDo != "no") {
        let todo2 = new ToDo(prompt("Ingresa la tarea a realizar"), prompt("Trabajo o Personal?"), false, new Date('2022-09-24'));
        toDoList.push(todo2);
        extratoDo = String(prompt("Desea agregar otro evento?"));
    }

    return 0;
}

// Constante nombre de la persona que usara la agenda
const nameInput = prompt("Ingrese su nombre");

if (nameInput == "") {
    alert("Por favor no deje este campo en blanco, introduzca un nombre valido");
}
else {
    console.log("Su nombre es" + " " + nameInput);
}

// Algoritmo para agregar eventos y mostrarlos en la consola

if (toDoList.length == 0) {
    populateToDoList();
}

console.log(toDoList);




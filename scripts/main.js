//Variable global de tareas por hacer
toDos = JSON.parse(localStorage.getItem('toDos')) || [];

//Funcion para cargar datos del API JSONPLACEHOLDER
const placeHolder = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    data.forEach((element) => {
        const toDo = {
            content: element.title,
            category: "personal",
            done: false,
            createdAt: new Date().getTime()
        }

        toDos.push(toDo);
    })
    localStorage.setItem('toDos', JSON.stringify(toDos));
    displayToDos();
}

//Funcion para visualizar cualquier cambio en la lista
function displayToDos() {
    const toDoList = document.querySelector('#toDoList');

    toDoList.innerHTML = '';

    //Ordena las tareas por de mas reciente a mas antigua y las agrega a la lista
    toDos.sort(function(a, b){
        return new Date(b.createdAt) - new Date(a.createdAt)}).forEach(toDo => {
        const toDoItem = document.createElement('div');
        toDoItem.classList.add('toDoItem');

        const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

        input.type = 'checkbox';
		input.checked = toDo.done;
		span.classList.add('bubble');

        if (toDo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}

        content.classList.add('toDoContent');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${toDo.content}" readonly>`;
		edit.innerHTML = 'Editar';
		deleteButton.innerHTML = 'Borrar';

        label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		toDoItem.appendChild(label);
		toDoItem.appendChild(content);
		toDoItem.appendChild(actions);

		toDoList.appendChild(toDoItem);

        if (toDo.done) {
			toDoItem.classList.add('done');
		}
        //Evento para ver si la tarea fue finalizada o no
		input.addEventListener('change', (e) => {
			toDo.done = e.target.checked;
			localStorage.setItem('toDos', JSON.stringify(toDos));

			if (toDo.done) {
				toDoItem.classList.add('done');
			} else {
				toDoItem.classList.remove('done');
			}

			displayToDos();
        })

        addEventListener('online', (event) => { 
            displayToDos();
        });
        //Evento para la edicion de tareas
        edit.addEventListener('click', (e) => {
            swal({
                title: 'Est?? segur@ de modificar el evento?',
                icon: 'warning',
                buttons: ["No, no quiero", "S??, seguro"],
                dangerMode: true,
            }).then((result) => {
                if (result) {
                    const input = content.querySelector('input');
			        input.removeAttribute('readonly');
			        input.focus();
			        input.addEventListener('blur', (e) => {
				        input.setAttribute('readonly', true);
				        toDo.content = e.target.value;
				        localStorage.setItem('toDos', JSON.stringify(toDos));
				        displayToDos();
                        })
                    }
                })
        })

        //Evento para la eliminacion de tareas
        deleteButton.addEventListener('click', (e) => {

            swal({
                title: 'Est?? segur@ de eliminar el evento?',
                icon: 'warning',
                buttons: ["No, no quiero", "S??, seguro"],
                dangerMode: true,
            }).then((result) => {
        
                if (result) {
                    swal({
                        title: 'Borrado!',
                        icon: 'success',
                        text: 'El evento ha sido borrado'
                    })

                    toDos = toDos.filter(t => t != toDo);
			        localStorage.setItem('toDos', JSON.stringify(toDos));
			        displayToDos();
                }
            })
        })
    })
}

//Si la lista esta vacia carga las tareas de la API JSONPLACEHOLDER
if (toDos.length == 0) {
    placeHolder();
}


//Permite acceso global a todos los elementos
window.addEventListener('load', () => {
    //Constantes de nombre de usuario y formulario
    const nameInput = document.querySelector('#name');
    const newToDoForm = document.querySelector('#newToDoForm');
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    //Algoritmo para cambiar el  nombre al puesto por el usuario
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newToDoForm.addEventListener('submit', e => {
        e.preventDefault();

        //Objeto que represanta a las tareas
        const toDo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        if (toDo.content == '') {
            swal("Error!", "Estas tratando de agregar un evento vacio!", "error")
        }
        else {
            toDos.push(toDo);
        }

        localStorage.setItem('toDos', JSON.stringify(toDos));

        // Resetea el formulario
		e.target.reset();

        displayToDos();
    })

    displayToDos();
})


//Algoritmo para el modo oscuro
let icon = document.getElementById('icon')

icon.onclick = function() {
    document.body.classList.toggle("darkTheme");
    if (document.body.classList.contains("darkTheme")) {
        icon.src = "./assets/sun.png";
    }
    else {
        icon.src = "./assets/moon.png";
    }
}

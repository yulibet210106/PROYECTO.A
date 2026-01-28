document.addEventListener('DOMContentLoaded', () => {
    const tareaInput = document.getElementById('tarea');
    const fechaInput = document.getElementById('fecha-vencimiento');
    const categoriaInput = document.getElementById('categoria');
    const prioridadInput = document.getElementById('prioridad');
    const tareasLista = document.getElementById('tareas-lista');
    const agregarBtn = document.getElementById('agregar');
    const progressBar = document.getElementById('progress-bar');
    const toggleTheme = document.getElementById('toggle-theme');

    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    const guardarTareas = () => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
        cargarTareas();
    };

const cargarTareas = () => {
    tareasLista.innerHTML = '';
    tareas.forEach(tarea => {
        const div = document.createElement('div');
        div.className = 'task';
        

        div.innerHTML = `
            <input type="checkbox" class="tarea-checkbox" ${tarea.completed ? 'checked' : ''} data-id="${tarea.id}">
            <span class="${tarea.completed ? 'completed' : ''}">${tarea.text} - <span>${tarea.categoria}</span></span>
            <span>${tarea.prioridad}</span>
            <button class="eliminar" data-id="${tarea.id}">🗑️</button>
        `;
        
        
        div.querySelector('.tarea-checkbox').addEventListener('change', () => {
            tarea.completed = !tarea.completed;
            guardarTareas();
        });
        
        div.querySelector('.eliminar').addEventListener('click', () => eliminarTarea(tarea.id));
        tareasLista.appendChild(div);
    });
    actualizarProgreso();
};

    const agregarTarea = () => {
        if (tareaInput.value) {
            const nuevaTarea = {
                id: Date.now(),
                text: tareaInput.value,
                categoria: categoriaInput.value,
                prioridad: prioridadInput.value,
                completed: false,
            };
            tareas.push(nuevaTarea);
            tareaInput.value = '';
            guardarTareas();
        }
    };

    const eliminarTarea = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            tareas = tareas.filter(tarea => tarea.id !== id);
            guardarTareas();
        }
    };

    const actualizarProgreso = () => {
        const completadas = tareas.filter(tarea => tarea.completed).length;
        const total = tareas.length;
        const porcentaje = total ? (completadas / total) * 100 : 0;
        progressBar.style.width = `${porcentaje}%`;
    };

    agregarBtn.addEventListener('click', agregarTarea);
    cargarTareas();
});

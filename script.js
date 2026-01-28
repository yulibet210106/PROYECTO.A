
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
                <span class="${tarea.completed ? 'completed' : ''}">${tarea.text} - <span class="category-label">${tarea.categoria}</span></span>
                <span class="task-priority">${tarea.prioridad}</span>
                <span>${tarea.fechaVencimiento}</span>
                <button class="editar" data-id="${tarea.id}">✏️</button>
                <button class="eliminar" data-id="${tarea.id}">🗑️</button>
            `;
            div.querySelector('.eliminar').addEventListener('click', () => eliminarTarea(tarea.id));
            div.querySelector('.editar').addEventListener('click', () => editarTarea(tarea.id));
            tareasLista.appendChild(div);
        });
        actualizarProgreso();
    };

    const agregarTarea = () => {
        const nuevaTarea = {
            id: Date.now(),
            text: tareaInput.value,
            categoria: categoriaInput.value,
            prioridad: prioridadInput.value,
            fechaVencimiento: fechaInput.value,
            completed: false,
        };
        tareas.push(nuevaTarea);
        tareaInput.value = '';
        fechaInput.value = '';
        guardarTareas();
    };

    const eliminarTarea = (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            tareas = tareas.filter(tarea => tarea.id !== id);
            guardarTareas();
        }
    };

    const editarTarea = (id) => {
        const tarea = tareas.find(t => t.id === id);
        tareaInput.value = tarea.text;
        fechaInput.value = tarea.fechaVencimiento;
        categoriaInput.value = tarea.categoria;
        prioridadInput.value = tarea.prioridad;
        eliminarTarea(id);
    };

    const actualizarProgreso = () => {
        const completadas = tareas.filter(tarea => tarea.completed).length;
        const total = tareas.length;
        const porcentaje = total ? (completadas / total) * 100 : 0;
        progressBar.style.width = `${porcentaje}%`;
    };

    toggleTheme.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleTheme.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });

    agregarBtn.addEventListener('click', agregarTarea);
    cargarTareas();
});

const loginSection = document.getElementById('login-section');
const formSection = document.getElementById('form-section');
const tablaSection = document.getElementById('tabla-section');
const tablaPacientes = document.getElementById('tabla-pacientes');
const form = document.getElementById('patient-form');
const contadorGravedad = document.getElementById('contador-gravedad');

let pacientes = [];
function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === 'admin' && pass === '1234') {
        loginSection.classList.add('d-none');
        formSection.classList.remove('d-none');
        tablaSection.classList.remove('d-none');
    } else {
        alert('Usuario o contraseña incorrectos');
    }
} 


const prioridad = { 'crítico': 1, 'urgente': 2, 'moderado': 3, 'leve': 4 };

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const edad = parseInt(document.getElementById('edad').value);
    const genero = document.getElementById('genero').value;
    const documento = document.getElementById('documento').value.trim();
    const sintomas = document.getElementById('sintomas').value.trim();
    const gravedad = document.getElementById('gravedad').value;
    const tratamiento = document.getElementById('tratamiento').value.trim();
    const medicamentos = document.getElementById('medicamentos').value.trim();
    const examenes = document.getElementById('examenes').value;

    if (!nombre || !edad || !genero || !documento || !sintomas || !gravedad || !tratamiento || !medicamentos || !examenes) {
        alert("Todos los campos son obligatorios.");
        return;
    }
    if (edad <= 0 || isNaN(edad)) {
        alert("Edad debe ser un número mayor a 0.");
        return;
    }
    if (documento.length < 5) {
        alert("Documento debe tener al menos 5 caracteres.");
        return;
    }

    const paciente = { nombre, edad, genero, documento, sintomas, gravedad, tratamiento, medicamentos, examenes };
    pacientes.push(paciente);
    pacientes.sort((a, b) => prioridad[a.gravedad] - prioridad[b.gravedad]);

    mostrarPacientes();
    form.reset();

    if (gravedad === 'crítico') {
        alert("¡Paciente en estado CRÍTICO registrado!");
    }
});

function mostrarPacientes() {
    tablaPacientes.innerHTML = "";
    let contador = { 'crítico': 0, 'urgente': 0, 'moderado': 0, 'leve': 0 };

    pacientes.forEach((paciente, index) => {
        contador[paciente.gravedad]++;
        const row = document.createElement('tr');
        row.className = obtenerClaseGravedad(paciente.gravedad);
        row.innerHTML = `
            <td>${paciente.nombre}</td>
            <td>${paciente.edad}</td>
            <td>${paciente.genero}</td>
            <td>${paciente.documento}</td>
            <td>${paciente.sintomas}</td>
            <td class="fw-bold text-uppercase">${paciente.gravedad}</td>
            <td>${paciente.tratamiento}</td>
            <td>${paciente.medicamentos}</td>
            <td>${paciente.examenes}</td>
            <td><button class="btn btn-sm btn-danger" onclick="eliminarPaciente(${index})">Eliminar</button></td>
        `;
        tablaPacientes.appendChild(row);
    });

    contadorGravedad.textContent = `Crítico: ${contador.crítico}, Urgente: ${contador.urgente}, Moderado: ${contador.moderado}, Leve: ${contador.leve}`;
}

function eliminarPaciente(index) {
    if (confirm("¿Está seguro de eliminar este paciente?")) {
        pacientes.splice(index, 1);
        mostrarPacientes();
    }
}

function obtenerClaseGravedad(gravedad) {
    switch (gravedad) {
        case 'crítico': return 'table-crítico';
        case 'urgente': return 'table-urgente';
        case 'moderado': return 'table-moderado';
        case 'leve': return 'table-leve';
        default: return '';
    }
}

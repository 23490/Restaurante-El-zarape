window.guardarUsuario = guardarUsuario;
window.eliminarUsuario = eliminarUsuario;
window.actualizarUsuario = actualizarUsuario;
window.llenarFormulario = llenarFormulario;
window.buscarUsuario = buscarUsuario;

window.onload = inicializarModulo;
let usuarios = [
    { id: 1, nombre: "Usuario1", contraseña: generarContraseña() },
    { id: 2, nombre: "Usuario2", contraseña: generarContraseña() },
    { id: 3, nombre: "Usuario3", contraseña: generarContraseña() },
    { id: 4, nombre: "Usuario4", contraseña: generarContraseña() },
    { id: 5, nombre: "Usuario5", contraseña: generarContraseña() }
];

export function inicializarModulo() {
    mostrarUsuarios();
}

function generarContraseña() {
    let caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let contraseña = "";
    for (let i = 0; i < 12; i++) {
        contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contraseña;
}

function guardarUsuario() {
    let id = document.getElementById("userId").value;
    let nombre = document.getElementById("userName").value;

    if (!id || !nombre) {
        Swal.fire('Error', 'Debes llenar todos los campos', 'error');
        return;
    }

    let usuarioExistente = usuarios.find(usuario => usuario.id == id);
    if (usuarioExistente) {
        usuarioExistente.nombre = nombre;
        Swal.fire('Movimiento realizado', 'Usuario modificado', 'success');
    } else {
        let contraseña = generarContraseña();
        usuarios.push({ id: parseInt(id), nombre: nombre, contraseña: contraseña });
        document.getElementById("userPassword").value = contraseña;
        Swal.fire('Movimiento realizado', 'Usuario guardado', 'success');
    }
    mostrarUsuarios();
    limpiarFormulario();
}

function actualizarUsuario() {
    let id = document.getElementById("userId").value;
    let nombre = document.getElementById("userName").value;

    if (!id || !nombre) {
        Swal.fire('Error', 'Debes llenar todos los campos', 'error');
        return;
    }

    let usuario = usuarios.find(usuario => usuario.id == id);
    if (usuario) {
        usuario.nombre = nombre;
        Swal.fire('Movimiento realizado', 'Usuario modificado', 'success');
    } else {
        Swal.fire('Error', 'Usuario no encontrado', 'error');
    }
    mostrarUsuarios();
    limpiarFormulario();
}

function eliminarUsuario() {
    let id = document.getElementById("userId").value;

    if (!id) {
        Swal.fire('Error', 'Debes ingresar el ID del usuario', 'error');
        return;
    }

    usuarios = usuarios.filter(usuario => usuario.id != parseInt(id));
    mostrarUsuarios();
    Swal.fire('Movimiento realizado', 'Usuario eliminado', 'success');
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById("userId").value = '';
    document.getElementById("userName").value = '';
    document.getElementById("userPassword").value = '';
}

function mostrarUsuarios() {
    let tbody = document.getElementById("userTableBody");
    tbody.innerHTML = '';
    usuarios.forEach(usuario => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.contraseña}</td>
            <td><a href="#" class="text-info" onclick="llenarFormulario(${usuario.id})"><i class="fas fa-eye"></i></a></td>
        `;
        tbody.appendChild(tr);
    });
}

function llenarFormulario(id) {
    let usuario = usuarios.find(usuario => usuario.id === id);
    if (usuario) {
        document.getElementById("userId").value = usuario.id;
        document.getElementById("userName").value = usuario.nombre;
        document.getElementById("userPassword").value = usuario.contraseña;
    } else {
        Swal.fire('Error', 'Usuario no encontrado', 'error');
    }
}

function buscarUsuario() {
    let valorBusqueda = document.getElementById("searchInput").value.toLowerCase();
    let usuariosFiltrados = usuarios.filter(usuario => 
        usuario.id.toString().includes(valorBusqueda) || 
        usuario.nombre.toLowerCase().includes(valorBusqueda)
    );
    let tbody = document.getElementById("userTableBody");
    tbody.innerHTML = '';
    usuariosFiltrados.forEach(usuario => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.contraseña}</td>
            <td><a href="#" class="text-info" onclick="llenarFormulario(${usuario.id})"><i class="fas fa-eye"></i></a></td>
        `;
        tbody.appendChild(tr);
    });
    if (usuariosFiltrados.length === 0) {
        Swal.fire('Resultado', 'No se encontraron coincidencias', 'info');
    }
}

document.addEventListener("DOMContentLoaded", inicializarModulo);

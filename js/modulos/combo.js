// Exponer funciones al contexto global para permitir que se llamen desde el HTML
window.setDetalleComboVisible = setDetalleComboVisible;
window.mostrarFormularioNuevo = mostrarFormularioNuevo;
window.guardar = guardar;
window.eliminar = eliminar;
window.limpiar = limpiar;
window.llenarTablaCombos = llenarTablaCombos;
window.verDetalle = verDetalle;
window.buscarCombo = buscarCombo; // Añadido para buscar combo

export function inicializarModulo() {
    console.log("Módulo de Combos inicializado");
    llenarTablaCombos(); // Llama a la función que llena la tabla con datos
}

function setDetalleComboVisible(visible) {
    document.getElementById('divDetalleCombo').style.display = visible ? 'block' : 'none';
}

function mostrarFormularioNuevo() {
    setDetalleComboVisible(true);
    limpiar();
}

function guardar() {
    const id = parseInt(document.getElementById('txtIdCombo').value, 10);
    const nombre = document.getElementById('txtNombreCombo').value;
    const precio = parseFloat(document.getElementById('txtPrecioCombo').value);
    const descripcion = document.getElementById('txtDescripcionCombo').value;
    const alimento = document.getElementById('txtAlimentoCombo').value;
    const bebida = document.getElementById('txtBebidaCombo').value;

    if (id) {
        // Actualizar el combo existente
        const index = combos.findIndex(combo => combo.id === id);
        if (index !== -1) {
            combos[index] = {
                id,
                nombre,
                descripcion,
                precio,
                alimento: {
                    nombre: alimento,
                    bebida: {
                        nombre: bebida
                    }
                }
            };
            Swal.fire('Actualizado', 'El combo ha sido actualizado correctamente.', 'success');
        } else {
            Swal.fire('Error', 'Combo no encontrado para actualizar.', 'error');
        }
    } else {
        // Agregar un nuevo combo
        const newId = combos.length ? combos[combos.length - 1].id + 1 : 1; // Incrementar ID
        const newCombo = {
            id: newId,
            nombre,
            descripcion,
            precio,
            alimento: {
                nombre: alimento,
                bebida: {
                    nombre: bebida
                }
            }
        };
        combos.push(newCombo);
        Swal.fire('Guardado', 'El combo ha sido guardado correctamente.', 'success');
    }

    setDetalleComboVisible(false);
    llenarTablaCombos(); // Actualiza la tabla después de guardar
}

function eliminar() {
    const id = parseInt(document.getElementById('txtIdCombo').value, 10);
    if (id) {
        const index = combos.findIndex(combo => combo.id === id);
        if (index !== -1) {
            combos.splice(index, 1); // Eliminar el combo del arreglo
            Swal.fire('Eliminado', 'El combo ha sido eliminado correctamente.', 'success');
            setDetalleComboVisible(false);
            llenarTablaCombos(); // Actualiza la tabla después de eliminar
        } else {
            Swal.fire('Error', 'Combo no encontrado para eliminar.', 'error');
        }
    } else {
        Swal.fire('Error', 'No se ha seleccionado ningún combo para eliminar.', 'error');
    }
}

function limpiar() {
    document.getElementById('txtIdCombo').value = '';
    document.getElementById('txtNombreCombo').value = '';
    document.getElementById('txtPrecioCombo').value = '';
    document.getElementById('txtDescripcionCombo').value = '';
    document.getElementById('txtAlimentoCombo').value = '';
    document.getElementById('txtBebidaCombo').value = '';
}

const combos = [
    {
        id: 1,
        nombre: "Combo Mexicano",
        descripcion: "Incluye Tacos y Refresco",
        precio: 65.00,
        alimento: {
            nombre: "Tacos",
            bebida: {
                nombre: "Pepsi"
            }
        }
    },
    {
        id: 2,
        nombre: "Combo Lunch",
        descripcion: "Incluye 2 Taparterias y 2 jugos de manzana",
        precio: 90.00,
        alimento: {
            nombre: "Taparterias",
            bebida: {
                nombre: "Jugo de Manzana"
            }
        }
    },
    {
        id: 3,
        nombre: "Combo Familiar",
        descripcion: "Incluye 2 litros de pozole verde o rojo y agua de 1 litro sabor a elegir",
        precio: 230.00,
        alimento: {
            nombre: "Pozole",
            bebida: {
                nombre: "Agua de horchata"
            }
        }
    }

];

function llenarTablaCombos() {
    const tbody = document.getElementById('tbodyCombos');
    tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla

    combos.forEach(combo => {
        tbody.innerHTML += `
            <tr>
                <td>${combo.id}</td>
                <td>${combo.nombre}</td>
                <td>${combo.precio.toFixed(2)}</td>
                <td>${combo.descripcion}</td>
                <td>${combo.alimento.nombre}</td>
                <td>${combo.alimento.bebida.nombre}</td> 
 <td> <a href="#" class="text-danger"  onclick="verDetalle(${combo.id});">
       <i class="fas fa-eye"></i>      
                </td>
            </tr>
        `;
    });
}

function verDetalle(id) {
    const combo = combos.find(c => c.id === id);
    if (combo) {
        document.getElementById('txtIdCombo').value = combo.id;
        document.getElementById('txtNombreCombo').value = combo.nombre;
        document.getElementById('txtPrecioCombo').value = combo.precio.toFixed(2);
        document.getElementById('txtDescripcionCombo').value = combo.descripcion;
        document.getElementById('txtAlimentoCombo').value = combo.alimento.nombre;
        document.getElementById('txtBebidaCombo').value = combo.alimento.bebida.nombre;

        setDetalleComboVisible(true);
    } else {
        Swal.fire('Error', 'Combo no encontrado.', 'error');
    }
}

function buscarCombo() {
    const nombreBuscar = document.getElementById('txtBuscarCombo').value.toLowerCase().trim();
    const combosFiltrados = combos.filter(combo => combo.nombre.toLowerCase().includes(nombreBuscar));

    llenarTablaCombosFiltrados(combosFiltrados);
}

function llenarTablaCombosFiltrados(combos) {
    const tbody = document.getElementById('tbodyCombos');
    tbody.innerHTML = ''; // Limpiar la tabla antes de llenarla

    if (combos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">No se encontraron resultados.</td></tr>';
    } else {
        combos.forEach(combo => {
            tbody.innerHTML += `
                <tr>
                    <td>${combo.id}</td>
                    <td>${combo.nombre}</td>
                    <td>${combo.precio.toFixed(2)}</td>
                    <td>${combo.descripcion}</td>
                    <td>${combo.alimento.nombre}</td>
                    <td>${combo.alimento.bebida.nombre}</td>
                    <td>
                        <button class="btn btn-info" onclick="verDetalle(${combo.id});">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    }
}

// Inicializar el módulo cuando se cargue
document.addEventListener('DOMContentLoaded', inicializarModulo);

//Definimos un arreglo JSON de Categorias:
let categorias = [
    {
        id: 1,
        nombre: "Refrescos"
    },
    {
        id: 2,
        nombre: "Aguas"
    },
    {
        id: 3,
        nombre: "Jugos"
    },
    {
        id: 4,
        nombre: "Cafés"
    }
];

//Definimos un arreglo JSON de alimentos de forma global:
let bebidas = [
    {
        id: 1,
        producto: {
            id: 1,
            nombre: "Agua de horchata",
            descripcion: "Agua hecha con productos naturales.",
            foto: "",
            precio: 25,
            categoria: {
                id: 2,
                nombre: "Aguas"
            }
        }
    },
    {
        id: 2,
        producto: {
            id: 2,
            nombre: "Coca Cola",
            descripcion: "500 ml",
            foto: "",
            precio: 15.00,
            categoria: {
                id: 1,
                nombre: "Refrescos"
            }
        }
    },
    {
        id: 3,
        producto: {
            id: 3,
            nombre: "Jugo de Manzana",
            descripcion: "Jugo Jumex, del Valle y Boing.",
            foto: "",
            precio: 17.00,
            categoria: {
                id: 3,
                nombre: "Jugos"
            }
        }
    },
    {
        id: 4,
        producto: {
            id: 4,
            nombre: "Café Americano",
            descripcion: "Americano frio.",
            foto: "",
            precio: 30.00,
            categoria: {
                id: 4,
                nombre: "Café"
            }
        }
    },
    {
        id: 5,
        producto: {
            id: 5,
            nombre: "Pepsi",
            descripcion: "500 mil.",
            foto: "",
            precio: 15.00,
            categoria: {
                id: 1,
                nombre: "Refrescos"
            }
        }
    }
];

export function inicializarModulo()
{
    setDetalleBebidaVisible(false);
    llenarComboBoxCategorias();
    llenarTabla();
}

export function guardar()
{
    //Declaro una variable temporal para guardar la posicion del alimento:
    let posTemp = -1;

    //Declaro una variable temporal para la categoria:
    let catTemp = null;

    //Generamos un nuevo objeto de alimento:
    let a = new Object();

    //Lleno los atributos del objeto alimento:
    a.id = 0;
    a.producto = new Object();
    a.producto.id = 0;
    a.producto.nombre = document.getElementById("txtBebida").value;
    a.producto.descripcion = document.getElementById("txtDescripcionBebida").value;
    a.producto.precio = parseFloat(document.getElementById("txtPrecioBebida").value);
    catTemp = buscarCategoriaPorID(parseInt(document.getElementById("cmbCategoria").value));
    a.producto.categoria = catTemp;

    //Una vez que tenemos el objeto de alimento con sus datos llenos,
    //revisamos si se va a insertar o actualizar:
    posTemp = buscarPosicionBebidaPorID(parseInt(document.getElementById("txtId").value));
    if (posTemp >= 0) //Si esta condicion se cumple, la bebida ya existe
    {
        a.id = parseInt(document.getElementById("txtId").value);

        //Reemplazamos el objeto en la posicion de bebida anterior:
        bebidas[posTemp] = a;
    } else
    {
        //Como el alimento no existe, lo agregamos al final del arreglo:
        a.id = generarIDBebida();
        bebidas.push(a);
        document.getElementById("txtId").value = a.id;
    }

    llenarTabla();

    Swal.fire('Movimiento realizado.', 'Datos de producto guardados.', 'success');
}

export function eliminar()
{
    // Obtenemos el ID de la bebida que se desea eliminar:
    let idBebida = parseInt(document.getElementById("txtId").value.trim());
    // Buscamos la posición de la bebida en el arreglo:
    if (isNaN(idBebida) || idBebida <= 0) {
        Swal.fire('', 'ID de Bebida no válida.', 'warning');
        return;
    }

    let pos = buscarPosicionBebidaPorID(idBebida);

    if (pos < 0) {
        Swal.fire('', 'Bebida no encontrada.', 'warning');
        return;
    }

    // Eliminamos la bebida del arreglo:
    bebidas.splice(pos, 1);

    // Limpiamos el formulario y actualizamos la tabla:
    limpiar();
    llenarTabla();

    Swal.fire('Movimiento realizado.', 'Producto eliminado.', 'success');
}

export function limpiar()
{
    document.getElementById("txtId").value = '';
    document.getElementById("txtBebida").value = '';
    document.getElementById("txtDescripcionBebida").value = '';
    document.getElementById("txtPrecioBebida").value = '';
    document.getElementById("cmbCategoria").value = 1;
}

export function consultar() 
{
    let nombreBebida = document.getElementById("txtBuscarBebida").value.toLowerCase().trim();
    let bebidaEncontrada = null;

    for (let i = 0; i < bebidas.length; i++) {
        if (bebidas[i].producto.nombre.toLowerCase() === nombreBebida) {
            bebidaEncontrada = bebidas[i];
            break;
        }
    }

    if (bebidaEncontrada) {
        mostrarDetalleBebida(bebidaEncontrada.id);
    } else {
        Swal.fire('', 'Bebida no encontrada.', 'warning');
    }
}

export function mostrarDetalleBebida(idBebida)
{
    let bebida = null;
    let pos = buscarPosicionBebidaPorID(idBebida);

    if (pos < 0)
    {
        Swal.fire('', 'Bebida no encontrada.', 'warning');
        return;
    }

    limpiar();
    bebida = bebidas [pos];
    document.getElementById("txtId").value = bebida.id;
    document.getElementById("txtBebida").value = bebida.producto.nombre;
    document.getElementById("txtDescripcionBebida").value = bebida.producto.descripcion;
    document.getElementById("txtPrecioBebida").value = bebida.producto.precio;
    document.getElementById("cmbCategoria").value = bebida.producto.categoria.id;
    setDetalleBebidaVisible(true);
}

export function mostrarFormularioNuevo()
{
    limpiar();
    setDetalleBebidaVisible(true);
}

/**
 * Llena el cuerpo (tbody) de una tabla HTML
 * utilizando los valores del arreglo JSON
 * de sucursal.
 */
function llenarTabla()
{
    //Aqui guardaremos el contenido de la tabla:
    let contenido = '';

    //Recorremos el arreglo de alimentos:
    for (let i = 0; i < bebidas.length; i++)
    {
        //Vamos generando el contenido de forma dinamica:
        //contenido = contenido + '<tr>' + '</tr>'
        contenido += '<tr>' +
                '<td>' + bebidas[i].producto.nombre + '</td>' +
                '<td>' + bebidas[i].producto.categoria.nombre + '</td>' +
                '<td class="text-end">' + bebidas [i].producto.precio + '</td>' +
                '<td><a href="#" class="text-danger" onclick="cm.mostrarDetalleBebida(' + bebidas[i].id + ');">\n\
                             <i class="fas fa-eye"></i></a>' + '</td>' + '</tr>';
    }

    //Insertamos el contenido HTML generado dentro del cuerpo de la tabla:
    document.getElementById("tbodyBebida").innerHTML = contenido;
}

function llenarComboBoxCategorias()
{
    let contenido = '';

    //Recorremos el arreglo de categorias:
    for (let i = 0; i < categorias.length; i++)
    {
        contenido += '<option value="' + categorias[i].id + '">' +
                categorias[i].nombre +
                '</option>';
    }

    document.getElementById('cmbCategoria').innerHTML = contenido;
}

/*
 * Busca la posicion de un alimento con base en su ID.
 * 
 * Si el ID no se encuentra, la funcion devuelve -1.
 */
function buscarPosicionBebidaPorID(idBebida)
{
    //Recorremos el arreglo de alimentos:
    for (let i = 0; i < bebidas.length; i++)
    {
        if (bebidas[i].id === idBebida)
            return i;
    }

    return -1;
}

/*
 * Esta funcion muestra y oculta el detalle
 * de un alimento.
 */
export function   setDetalleBebidaVisible(valor)
{
    // Si valor es true:
    if (valor)
    {
        //Oculto el catalogo:
        document.getElementById('divCatalogoBebidas').style.display = 'none';

        //Muestro el detalle:
        document.getElementById('divDetalleBebida').style.display = '';
    } else
    {
        //Oculto el detalle:
        document.getElementById('divDetalleBebida').style.display = 'none';

        //Muestro el catalogo:
        document.getElementById('divCatalogoBebidas').style.display = '';
    }
}
function generarIDBebida()
{
    let ultimoID = 0;

    //Primero revisamos que haya alimentos en el arreglo:
    if (bebidas.length > 0)
    {
        ultimoID = bebidas[0].id;
        for (let i = 0; i < bebidas.length; i++)
        {
            if (bebidas[i].id > ultimoID)
                ultimoID = bebidas[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

function generarIDProducto()
{
    let ultimoID = 0;

    //Primero revisamos que haya alimentos en el arreglo:
    if (bebidas.length > 0)
    {
        ultimoID = bebidas[0].producto.id;
        for (let i = 0; i < bebidas.length; i++)
        {
            if (bebidas[i].producto.id > ultimoID)
                ultimoID = bebidas[i].producto.id;
        }
    }
    ultimoID++;
    return ultimoID;
}

function buscarCategoriaPorID(idCategoria)
{
    for (let i = 0; i < categorias.length; i++)
    {
        if (categorias[i].id === idCategoria)
            return categorias[i];
    }
    return null;
}

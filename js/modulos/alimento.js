//Definimos un arreglo JSON de Categorias:
let categorias =   [
                        {
                            id      : 1,
                            nombre  : "Platillo"
                        },
                        {
                            id      : 2,
                            nombre  : "Torta"
                        },
                        {
                            id      : 3,
                            nombre  : "Ensalada"
                        },
                        {
                            id      : 4,
                            nombre  : "Postre"
                        },
                        {
                            id      : 5,
                            nombre  : "Fruta"
                        }
                    ];

//Definimos un arreglo JSON de alimentos de forma global:
let alimentos = [
                    {
                        id       :  1,
                        producto :  {
                                        id          : 1,
                                        nombre      : "Tacos",
                                        descripcion : "Muy ricos.",
                                        foto        : "",
                                        precio      : 13,
                                        categoria   :   {
                                                            id : 1,
                                                            nombre : "Platillo"
                                                        }
                                    }
                    },
                    {
                        id       :  2,
                        producto :  {
                                        id          : 2,
                                        nombre      : "Taparterias",
                                        descripcion : "Torta grande",
                                        foto        : "",
                                        precio      : 30.00,
                                        categoria   :   {
                                                            id : 2,
                                                            nombre : "Torta"
                                                        }
                                    }
                    },
                    {
                        id       :  3,
                        producto :  {
                                        id          : 3,
                                        nombre      : "Ensalada Verde",
                                        descripcion : "Todo tipo de vegetal verde.",
                                        foto        : "",
                                        precio      : 120.00,
                                        categoria   :   {
                                                            id : 3,
                                                            nombre : "Ensalada"
                                                        }
                                    }
                    },
                    {
                        id       :  4,
                        producto :  {
                                        id          : 4,
                                        nombre      : "Pozole",
                                        descripcion : "Rojo/ Verde.",
                                        foto        : "",
                                        precio      : 75.00,
                                        categoria   :   {
                                                            id : 1,
                                                            nombre : "Platillo"
                                                        }
                                    }
                    },
                    {
                        id       :  5,
                        producto :  {
                                        id          : 5,
                                        nombre      : "Enchiladas Zuizas",
                                        descripcion : "Enchiladas verdes, rellenas de pollo.",
                                        foto        : "",
                                        precio      : 100.00,
                                        categoria   :   {
                                                            id : 1,
                                                            nombre : "Platillo"
                                                        }
                                    }
                    }
                ];

export function inicializarModulo()
{
    setDetalleAlimentoVisible(false);
    llenarComboBoxCategorias();
    llenarTabla();
}

export function guardar()
{
    //Declaro una variable temporal para guardar la posicion de la bebida:
    let posTemp = -1;
    
    //Declaro una variable temporal para la categoria:
    let catTemp = null;
    
    //Generamos un nuevo objeto de alimento:
    let a = new Object();    
    
    //Lleno los atributos del objeto alimento:
    a.id = 0;
    a.producto = new Object();
    a.producto.id = 0;
    a.producto.nombre = document.getElementById("txtAlimento").value;
    a.producto.descripcion = document.getElementById("txtDescripcionAlimento").value;
    a.producto.precio = parseFloat(document.getElementById("txtPrecioAlimento").value);    
    catTemp = buscarCategoriaPorID(parseInt(document.getElementById("cmbCategoria").value));    
    a.producto.categoria = catTemp;
    
    //Una vez que tenemos el objeto de alimento con sus datos llenos,
    //revisamos si se va a insertar o actualizar:
    posTemp = buscarPosicionAlimentoPorID(parseInt(document.getElementById("txtId").value));
    if (posTemp >= 0) //Si esta condicion se cumple, el alimento ya existe
    {
        a.id = parseInt(document.getElementById("txtId").value);
        
        //Reemplazamos el objeto en la posicion del alimento anterior:
        alimentos[posTemp] = a; 
    }
    else
    {
        //Como el alimento no existe, lo agregamos al final del arreglo:
        a.id = generarIDAlimento();
        alimentos.push(a);
        document.getElementById("txtId").value = a.id;
    }
    
    llenarTabla();
    
    Swal.fire('Movimiento realizado.', 'Datos de producto guardados.', 'success');
}

export function eliminar()
{
    // Obtenemos el ID de la bebida que se desea eliminar:
    let idAlimento = parseInt(document.getElementById("txtId").value.trim());
    
    if (isNaN(idAlimento) || idAlimento <= 0) {
        Swal.fire('', 'ID de Alimento no válido.', 'warning');
        return;
    }

    let pos = buscarPosicionAlimentoPorID(idAlimento);

    if (pos < 0) {
        Swal.fire('', 'Alimento no encontrado.', 'warning');
        return;
    }


    // Eliminamos el aimento del arreglo:
    alimentos.splice(pos, 1);

    // Limpiamos el formulario y actualizamos la tabla:
    limpiar();
    llenarTabla();

    Swal.fire('Movimiento realizado.', 'Producto eliminado.', 'success'); 
}

export function limpiar()
{
    document.getElementById("txtId").value = '';
    document.getElementById("txtAlimento").value = '';
    document.getElementById("txtDescripcionAlimento").value = '';
    document.getElementById("txtPrecioAlimento").value = '';
    document.getElementById("cmbCategoria").value = 1;
}

export function consultar()
{
      let nombreAlimento = document.getElementById("txtBuscarAlimento").value.toLowerCase().trim();
    let alimentoEncontrado = null;

    for (let i = 0; i < alimentos.length; i++) {
        if (alimentos[i].producto.nombre.toLowerCase() === nombreAlimento) {
            alimentoEncontrado = alimentos[i];
            break;
        }
    }

    if (alimentoEncontrado) {
        mostrarDetalleAlimento(alimentoEncontrado.id);
    } else {
        Swal.fire('', 'Alimento no encontrado.', 'warning');
    }
}
                
export function mostrarDetalleAlimento(idAlimento)
{    
    let alimento = null;
    let pos = buscarPosicionAlimentoPorID(idAlimento);
    
    if (pos < 0)
    {
        Swal.fire('', 'Alimento no encontrado.', 'warning');
        return;
    }
    
    limpiar();
    alimento = alimentos[pos];
    document.getElementById("txtId").value = alimento.id;
    document.getElementById("txtAlimento").value = alimento.producto.nombre;
    document.getElementById("txtDescripcionAlimento").value = alimento.producto.descripcion;
    document.getElementById("txtPrecioAlimento").value = alimento.producto.precio;
    document.getElementById("cmbCategoria").value = alimento.producto.categoria.id;
    setDetalleAlimentoVisible(true);
}

export function mostrarFormularioNuevo()
{
    limpiar();
     setDetalleAlimentoVisible(true);
}

/**
 * Llena el cuerpo (tbody) de una tabla HTML
 * utilizando los valores del arreglo JSON
 * de alimentos.
 */
function llenarTabla()
{
    //Aqui guardaremos el contenido de la tabla:
    let contenido = '';
    
    //Recorremos el arreglo de alimentos:
    for (let i = 0; i < alimentos.length; i++)
    {
        //Vamos generando el contenido de forma dinamica:
        //contenido = contenido + '<tr>' + '</tr>'
        contenido +=    '<tr>' +
                            '<td>' + alimentos[i].producto.nombre + '</td>' +
                            '<td>' + alimentos[i].producto.categoria.nombre + '</td>' +
                            '<td class="text-end">' + alimentos[i].producto.precio + '</td>' +
                            '<td><a href="#" class="text-danger" onclick="cm.mostrarDetalleAlimento(' + alimentos[i].id + ');">\n\
                             <i class="fas fa-eye"></i></a>'+ '</td>' + '</tr>';
    }
    
    //Insertamos el contenido HTML generado dentro del cuerpo de la tabla:
document.getElementById("tbodyAlimentos").innerHTML = contenido;
}

function llenarComboBoxCategorias()
{
    let contenido = '';
    
    //Recorremos el arreglo de categorias:
    for (let i = 0; i < categorias.length; i++)
    {
        contenido +=    '<option value="' + categorias[i].id + '">' +
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
function buscarPosicionAlimentoPorID(idAlimento)
{    
    //Recorremos el arreglo de alimentos:
    for (let i = 0; i < alimentos.length; i++)
    {
       if (alimentos[i].id === idAlimento)
            return i;
    }
    
    return -1;
}

/*
 * Esta funcion muestra y oculta el detalle
 * de un alimento.
 */
export function setDetalleAlimentoVisible(valor)
{    
    // Si valor es true:
    if (valor)
    {
        //Oculto el catalogo:
        document.getElementById('divCatalogoAlimentos').style.display = 'none';
        
        //Muestro el detalle:
        document.getElementById('divDetalleAlimento').style.display = '';
    }
    else
    {
        //Oculto el detalle:
        document.getElementById('divDetalleAlimento').style.display = 'none';
        
        //Muestro el catalogo:
        document.getElementById('divCatalogoAlimentos').style.display = '';
    }
}

function generarIDAlimento()
{
    let ultimoID = 0;
    
    //Primero revisamos que haya alimentos en el arreglo:
    if (alimentos.length > 0)
    {
        ultimoID = alimentos[0].id;
        for (let i = 0; i < alimentos.length; i++)
        {
            if (alimentos[i].id > ultimoID)
                ultimoID = alimentos[i].id;
        }
    }
    ultimoID ++;
    return ultimoID;
}

function generarIDProducto()
{
    let ultimoID = 0;
    
    //Primero revisamos que haya alimentos en el arreglo:
    if (alimentos.length > 0)
    {
        ultimoID = alimentos[0].producto.id;
        for (let i = 0; i < alimentos.length; i++)
        {
            if (alimentos[i].producto.id > ultimoID)
                ultimoID = alimentos[i].producto.id;
        }
    }
    ultimoID ++;
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

    





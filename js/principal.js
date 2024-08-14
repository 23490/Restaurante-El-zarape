let cm = null;//current Module 
// trae un archivo en otro lado y devuelve, el navegador nos lo muestra
async function cargarModuloAlimento()
{
    //Definimos la URL donde esta el código html del modulo:
    let url = 'modulos/alimento.html';

    // Hacemos la peticion del documento del modulo
    let resp = await fetch(url);

    //Convetimos las respuestas del servidor en texto HTML
    let contenido = await resp.text();

    //Insertamos el codigo HTML dentro del contenimo principal
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    //trer modulo de alimentos js
    import('./modulos/alimento.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}
async function cargarModuloBebida()
{
    //Definimos la URL donde esta el código html del modulo:
    let url = 'modulos/bebida.html';

    // Hacemos la peticion del documento del modulo
    let resp = await fetch(url);

    //Convetimos las respuestas del servidor en texto HTML
    let contenido = await resp.text();

    //Insertamos el codigo HTML dentro del contenimo principal
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    //trer modulo de alimentos js
    import('./modulos/bebida.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}
async function cargarModuloSucursales()
{
    //Definimos la URL donde esta el código html del modulo:
    let url = 'modulos/sucursales.html';

    // Hacemos la peticion del documento del modulo
    let resp = await fetch(url);

    //Convetimos las respuestas del servidor en texto HTML
    let contenido = await resp.text();

    //Insertamos el codigo HTML dentro del contenimo principal
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    //trer modulo de alimentos js
    import('./modulos/sucursal.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}
async function cargarModuloUsuario()
{
    //Definimos la URL donde esta el código html del modulo:
    let url = 'modulos/usuario.html';

    // Hacemos la peticion del documento del modulo
    let resp = await fetch(url);

    //Convetimos las respuestas del servidor en texto HTML
    let contenido = await resp.text();

    //Insertamos el codigo HTML dentro del contenimo principal
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    //trer modulo de alimentos js
    import('./modulos/usuario.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}
async function cargarModuloCombo()
{
    //Definimos la URL donde esta el código html del modulo:
    let url = 'modulos/combo.html';

    // Hacemos la peticion del documento del modulo
    let resp = await fetch(url);

    //Convetimos las respuestas del servidor en texto HTML
    let contenido = await resp.text();

    //Insertamos el codigo HTML dentro del contenimo principal
    document.getElementById("contenedorPrincipal").innerHTML = contenido;

    //trer modulo de alimentos js
    import('./modulos/combo.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}

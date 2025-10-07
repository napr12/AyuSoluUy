const SERVICIOS = ['Jardinería', 'Limpieza', 'Plomería', 'Electricidad', 'Cuidado de mascotas'];
const PROVEEDORES = ['Juan Pérez', 'María Gómez', 'Carlos Rodríguez'];
const CLIENTES = ['Ana López', 'Luis Fernández'];


const nombreUser = prompt("Hola, bienvenido a AyuSoluUy, ¿Cuál es tu nombre?");
let tipoUsuario;



const mainProveedor = () => {
    let count = 0;
    let opcion;

}

const iniciarSesionProveedor = () => {
    let email = prompt("Ingrese su email");
}

const mainCliente = () => {
    menu(`Iniciar sesión`,`Registrarme`,2)
    listarServicios()
    listarProveedores()
}
const agregarProveedor = () => null
const agregarCliente = () => {
    CLIENTES.push(nombreUser)
    console.log(CLIENTES)
    alert(`¡Bienvenido/a ${nombreUser}! Te has registrado exitosamente como cliente.`)
}
const agregarServicio = () => null
const contratarServicio = () => null
const listarServicios = () => {
    let text = "Servicios disponibles:\n"
    SERVICIOS.forEach((servicio, index) => text=text+`${index + 1}- ${servicio}\n`)
    alert(text) 
}
const listarClientes = () => null
const listarProveedores = () =>{
    let text = "Proveedores disponibles:\n"
    PROVEEDORES.forEach((proveedor, index) => text=text+`${index + 1}- ${proveedor}\n`)
    alert(text) 
}

const iniciarSesionCliente = () => null
const cerrarSesion = () => null

const menu = (txtOpcion1, txtOpcion2, number1) => {
    let count = 0;
    let opcion = 0;
    
    do {
        if (count > 0 && count < 3) {
            alert("Por favor, ingrese una opción válida");
        } else if (count == 3) {
            alert("Parece que estás teniendo problemas para ingresar una opción válida. Por favor, intenta nuevamente más tarde.");
            break;
        }
        opcion = parseInt(prompt(`Ingresar opción: \n1- ${txtOpcion1} \n2- ${txtOpcion2}`))
        count++;
    } while (opcion != 1 && opcion != 2);

    switch (number1+''+opcion) {
        case '11': mainCliente(nombreUser); break;
        case '12': mainProveedor(nombreUser); break;
        case '21': iniciarSesionCliente(); break;
        case '22': agregarCliente(nombreUser); break;
        case '31': iniciarSesionProveedor(); break;
        case '32': agregarProveedor(); break;
        case '41': iniciarSesionProveedor(); break;
        case '42': agregarProveedor(); break;
        case '51': iniciarSesionProveedor(); break;
        case '52': agregarProveedor(); break;
        case '61': iniciarSesionProveedor(); break;
        case '62': agregarProveedor(); break;
        case '71': iniciarSesionProveedor(); break;
        case '72': agregarProveedor(); break;
        default: alert("Por favor, recarga la página e ingresa una opción válida");
    }
}

menu("Soy cliente", "Soy proveedor", 1);
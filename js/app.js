const DEPARTAMENTOS = ['Montevideo', 'Maldonado', 'Rocha', 'Treinta y Tres', 'Cerro Largo', 'Rivera', 'Artigas', 'Paysandu', 'Salto', 'Tacuarembo', 'Durazano', 'Río Negro', 'Soriano', 'Colonia', 'Flores', 'Florida', 'Colonia', 'San Jose', 'Canelones']

let users
let login
const listarProveedor = (proveedor) => {
    let cards = document.getElementsByClassName('cards')[0];
    cards.innerHTML= cards.innerHTML+`
    <div class="card" style="width: 18rem;">
         <img src="./img/${proveedor.img}" class="card-img-top">
         <div class="card-body">
             <h5 class="card-title">${proveedor.nombreCompleto()}</h5>
             <p class="card-text"> <b>Servicio:</b> ${proveedor.servicio} <br> <b>Descripción:</b> ${proveedor.descripcion}</p>
             ${login?'<a href="#" class="btn btn-primary">Contactar</a>':''}
         </div>
     </div>
    `
    console.log(`Cargo a ${proveedor.userName}`)

}
const cargarProveedores = (listUsers) => {
    
    // let user = listUsers[1]
    // listarProveedor( new Proveedor(userName=user.userName,pwd=user.pwd,nombre=user.nombre,apellido=user.apellido,domicilio=user.domicilio,fechaNacimiento=user.fechaNacimiento,genero=user.genero,email=user.email,img=user.img,servicio=user.servicio,precioHora=user.precioHora,descripcion=user.descripcion))
    
    listUsers.forEach((user) => {
        
        
        if (Object.keys(new Proveedor).every(prop=>user.hasOwnProperty(prop))) {
         listarProveedor(new Proveedor(userName=user.userName,pwd=user.pwd,nombre=user.nombre,apellido=user.apellido,domicilio=user.domicilio,fechaNacimiento=user.fechaNacimiento,genero=user.genero,email=user.email,img=user.img,servicio=user.servicio,precioHora=user.precioHora,descripcion=user.descripcion))
        }
    }

    )

}

const mainProveedor = () => {
    let count = 0;
    let opcion;

}

const iniciarSesionProveedor = () => {
    let email = prompt("Ingrese su email");
}

const mainCliente = () => {
    menu(`Iniciar sesión`, `Registrarme`, 2)
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
    SERVICIOS.forEach((servicio, index) => text = text + `${index + 1}- ${servicio}\n`)
    alert(text)
}
const listarClientes = () => null
const listarProveedores = () => {
    let text = "Proveedores disponibles:\n"
    PROVEEDORES.forEach((proveedor, index) => text = text + `${index + 1}- ${proveedor}\n`)
    alert(text)
}

const iniciarSesionCliente = () => null
const cerrarSesion = () => null


if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'))
    console.log('Se cargaron user desde el local Storage');
} else {
    users = []
    users.push(new Cliente('test', '1234', 'Nahuel', 'Pedrozo', new Domicilio('Montevideo', '18 de Julio 123', 'Montevideo'), new Date(2001, 3, 16), 'H', 'test@gmail.com', 'default.png'))
    users.push(new Proveedor('Prueba', '56789', 'Aaron', 'Pedrozo', new Domicilio('Montevideo', 'Colonia 123', 'Montevideo'), new Date(2001, 3, 16), 'H', 'test1@gmail.com', 'default.png', 'Jardinería', 150.50, 'Poda de cesped, arboles, mantenimiento de plantas y limpieza de zanjas'))
    users.push(new Cliente('test2', '1234', 'Nahuel', 'Rojas', new Domicilio('Canelones', 'Sarandí 123', 'Las Piedras'), new Date(2001, 3, 16), 'H', 'test2@gmail.com', 'default.png'))
    users.push(new Proveedor('Prueba2', '1234', 'Aaron', 'Rojas', new Domicilio('Montevideo', 'Uruguay 123', 'Montevideo'), new Date(2001, 3, 16), 'H', 'test3@gmail.com', 'default.png', 'Psicología', 1400, 'Terapia de niños y adolecentes'))
    users.push(new Cliente('test3', '1234', 'Juan', 'Perez', new Domicilio('Canelones', 'Paysandu 123', 'Tala'), new Date(2001, 3, 16), 'H', 'test4@gmail.com', 'default.png'))
    users.push(new Proveedor('Prueba3', '1234', 'Maria', 'Rodriguez', new Domicilio('Canelones', 'Salto 123', 'Montevideo'), new Date(2001, 3, 16), 'M', 'test5@gmail.com', 'default.png', 'Psicología', 1500, 'Terapia en general'))
    users.push(new Proveedor('test4', '1234', 'Alberto', 'Martinez', new Domicilio('Montevideo', 'Rambla Costanera 123', 'Montevideo'), new Date(2001, 3, 16), 'H', 'test6@gmail.com', 'default.png', 'Albañilería', 200, 'Construcción y reforma de casas'))
    localStorage.setItem('users', JSON.stringify(users))
    console.log('Se cargo valores cargados a mano.');
}
cargarProveedores(users)

//menu("Soy cliente", "Soy proveedor", 1);
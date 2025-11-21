
let login
const listarProveedor = (proveedor) => {
    let cards = document.getElementsByClassName('cards')[0];
    cards.innerHTML = cards.innerHTML + `
    <div class="card" style="width: 18rem;">
         <img src="./img/${proveedor.img}" class="card-img-top">
         <div class="card-body">
             <h5 class="card-title">${proveedor.nombreCompleto()}</h5>
             <p class="card-text"> <b>Servicio:</b> ${proveedor.servicio} <br> <b>Descripción:</b> ${proveedor.descripcion}</p>
             ${login ? `<a href="#" data-servicio=${proveedor.servicio} data-username="${proveedor.userName}" class="btn btn-primary contacto-proveedor">Contactar</a>` : ''}
         </div>
     </div>
    `



}
const cargarProveedores = (listUsers) => {
    listUsers.forEach((user) => {
        if (Object.keys(new Proveedor).every(prop => user.hasOwnProperty(prop))) {
            listarProveedor(new Proveedor(userName = user.userName, pwd = user.pwd, nombre = user.nombre, apellido = user.apellido, domicilio = user.domicilio, fechaNacimiento = user.fechaNacimiento, genero = user.genero, email = user.email, img = user.img, servicio = user.servicio, precioHora = user.precioHora, descripcion = user.descripcion))
        }
    }
    )
}

const obtenerEstados = async () => fetch('./asset/estados.json').then(res => res.json()).then(data => listarEstados(data))
const listarEstados = (estados) => {
    const listDepartamento = document.querySelector('#departamento')
    listEstados = estados.forEach(pais => pais.Departamentos.forEach(estado => listDepartamento.innerHTML += `<option value="${estado}">${estado}</option>`))

}
const main = () => {
    document.getElementsByClassName('cards')[0].innerHTML = ''
    if (localStorage.getItem('users')) {
        let users = JSON.parse(localStorage.getItem('users'))
        console.log('Se cargaron user desde el local Storage');
        cargarProveedores(users)
    } else {
        fetch('./asset/users.json')
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('users', JSON.stringify(data))
                cargarProveedores(data)
            })
        localStorage.setItem('users', JSON.stringify(users))
        console.log('Se cargo valores cargados a mano.');
    }
    eventosContactarProveedor()
}

const eventosContactarProveedor = () => {
    const PROVEEDORES = document.getElementsByClassName('contacto-proveedor')

    Array.from(PROVEEDORES).forEach((prov) => {
        prov.addEventListener('click', () => {
            const DETALLEPROV = JSON.parse(localStorage.getItem('users')).filter(user => user.userName == prov.dataset.username)[0]
            console.log(DETALLEPROV);
            if (Object.keys(new Proveedor).every(prop => DETALLEPROV.hasOwnProperty(prop))) {
                const objProvedorCargado = new Proveedor(userName = DETALLEPROV.userName, pwd = DETALLEPROV.pwd, nombre = DETALLEPROV.nombre, apellido = DETALLEPROV.apellido, domicilio = DETALLEPROV.domicilio, fechaNacimiento = DETALLEPROV.fechaNacimiento, genero = DETALLEPROV.genero, email = DETALLEPROV.email, img = DETALLEPROV.img, servicio = DETALLEPROV.servicio, precioHora = DETALLEPROV.precioHora, descripcion = DETALLEPROV.descripcion)
                Swal.fire({
                    title: objProvedorCargado.nombreCompleto(),
                    html: `<p>Servicio: ${objProvedorCargado.servicio}<br>
                    Descripción: ${objProvedorCargado.descripcion}<br>
                    Precio por hora: $${objProvedorCargado.precioHora}<br>
                    Contacto: ${objProvedorCargado.email}<br>
                    </p>
                    `,
                    imageUrl: `./img/${objProvedorCargado.img}`,
                    imageWidth: 400
                });
            }
        })
    })
}


let btnRegistrar = document.getElementById('registrar');
btnRegistrar.addEventListener('click', () => {
    document.getElementById('formLogin').style.display = 'none';
    document.getElementById('formRegistrar').style.display = 'block';
    obtenerEstados()
});

let btnLogin = document.querySelector('#formLogin')
btnLogin.addEventListener('submit', (e) => {
    const user = JSON.parse(localStorage.getItem('users')).filter(user => user.userName == e.target.userName.value && user.pwd == e.target.password.value)[0]
    if (user) {
        login = true
        Toastify({

            text: "Se ingreso correctamente",
            backgroundColor: "Green",
            duration: 3000

        }).showToast();
        e.preventDefault()
    } else {
        Toastify({

            text: "Usuario y/o contraseña incorrecto",
            backgroundColor: "red",
            duration: 3000

        }).showToast();
        e.preventDefault()
    }
    main()

})
document.getElementById('ingresar').addEventListener('click', () => {
    document.getElementById('formLogin').style.display = 'block';
    document.getElementById('formRegistrar').style.display = 'none';
});

document.querySelectorAll('input[name=tipoRegistro]').forEach((elem) => {
    elem.addEventListener('change', (event) => {
        if (event.target.id === 'registrarCliente' && event.target.checked) {
            document.getElementById('datosProveedor').style.display = 'none';
            document.getElementById('descripcion').required = false;
            document.getElementById('servicio').required = false;
            document.getElementById('precioHora').required = false;
        } else if (event.target.id === 'registrarProv' && event.target.checked) {
            document.getElementById('datosProveedor').style.display = 'block';
            document.getElementById('descripcion').required = true;
            document.getElementById('servicio').required = true;
            document.getElementById('precioHora').required = true;
        }

    });
});

const registrarForm = document.getElementById('formRegistrar');
registrarForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const domicilioRegistro = new Domicilio(e.target.departamento.value, e.target.domicilio.value,  e.target.localidad.value)
    let users = JSON.parse(localStorage.getItem('users')) || []
    try {
        users.find(u => u.userName === e.target.registrarUserName.value) && (() => {
        Toastify({
            text: "El nombre de usuario ya existe, por favor elija otro",
            backgroundColor: "red",
            duration: 3000
        }).showToast();
        throw new Error('El nombre de usuario ya existe');
    })();
    if (document.getElementById('registrarCliente').checked) {
        const nuevoCliente = new Cliente(userName=e.target.registrarUserName.value, pwd=e.target.registrarPassword.value, nombre=e.target.nombre.value, apellido=e.target.apellido.value, domicilio=domicilioRegistro, fechaNacimiento=e.target.fechaNacimiento.value, genero=e.target.genero.value, email=e.target.email.value, img='default.png')
        users.push(nuevoCliente)
        localStorage.setItem('users', JSON.stringify(users))
        Toastify({
            text: "Cliente registrado correctamente",
            backgroundColor: "Green",
            duration: 3000
        }).showToast();
    } else if (document.getElementById('registrarProv').checked) {
        const nuevoProveedor = new Proveedor(userName=e.target.registrarUserName.value, pwd=e.target.registrarPassword.value, nombre=e.target.nombre.value, apellido=e.target.apellido.value, domicilio=domicilioRegistro, fechaNacimiento=e.target.fechaNacimiento.value, genero=e.target.genero.value, email=e.target.email.value, img='default.png', servicio=e.target.servicio.value, precioHora=e.target.precioHora.value, descripcion= e.target.descripcion.value)
        users.push(nuevoProveedor)
        localStorage.setItem('users', JSON.stringify(users))
        Toastify({
            text: "Proveedor registrado correctamente",
            backgroundColor: "Green",
            duration: 3000
        }).showToast();
    }
    } catch (error) {
        console.error(error.message);
    }
    

});
main()
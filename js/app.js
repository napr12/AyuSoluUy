
let login
const listarProveedor = (proveedor) => {
    let cards = document.getElementsByClassName('cards')[0];
    cards.innerHTML = cards.innerHTML + `
    <div class="card" style="width: 18rem;">
         <img src="./img/${proveedor.img}" class="card-img-top">
         <div class="card-body">
             <h5 class="card-title">${proveedor.nombreCompleto()}</h5>
             <p class="card-text"> <b>Servicio:</b> ${proveedor.servicio} <br> <b>Descripción:</b> ${proveedor.descripcion}</p>
             ${login ? '<a href="#" class="btn btn-primary">Contactar</a>' : ''}
         </div>
     </div>
    `
    console.log(`Cargo a ${proveedor.userName}`)

}
const cargarProveedores = (listUsers) => {
    listUsers.forEach((user) => {
        if (Object.keys(new Proveedor).every(prop => user.hasOwnProperty(prop))) {
            listarProveedor(new Proveedor(userName = user.userName, pwd = user.pwd, nombre = user.nombre, apellido = user.apellido, domicilio = user.domicilio, fechaNacimiento = user.fechaNacimiento, genero = user.genero, email = user.email, img = user.img, servicio = user.servicio, precioHora = user.precioHora, descripcion = user.descripcion))
        }
    }
    )
}

const obtenerEstados = async ()=> fetch('./asset/estados.json').then(res => res.json()).then(data => listarEstados(data) )
const listarEstados = (estados) => {
    const listDepartamento = document.querySelector('#departamento')
    listEstados = estados.forEach(pais => pais.Departamentos.forEach(estado => listDepartamento.innerHTML += `<option value="${estado}">${estado}</option>`))
    
}
const main =()=>{
    document.getElementsByClassName('cards')[0].innerHTML=''
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
}   

const escucharRegistrar = () => {
    let btnRegistrar = document.getElementById('registrar');
    btnRegistrar.addEventListener('click', () => {
        document.getElementById('formLogin').style.display = 'none';
        document.getElementById('formRegistrar').style.display = 'block';
        obtenerEstados()
    });
}
const escucharLogin= ()=>{
    let btnLogin = document.querySelector('#formLogin')
    console.log(btnLogin)
    btnLogin.addEventListener('submit',(e)=>{
        login = JSON.parse(localStorage.getItem('users')).filter(user=> user.userName== e.target.userName.value && user.pwd ==e.target.password.value)
        main()
        document.querySelector('.cards').focus()
        e.preventDefault()
    })
}
document.getElementById('ingresar').addEventListener('click', () => {
    document.getElementById('formLogin').style.display = 'block';
    document.getElementById('formRegistrar').style.display = 'none';
    escucharLogin();
    escucharRegistrar();
});

main()
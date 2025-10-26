class Domicilio {
    constructor(departamento, direccion, localidad) {
        this.departamento = departamento
        this.direccion = direccion
        this.localidad = localidad
    }
}


class Usuario {
    constructor(userName, pwd, nombre, apellido, domicilio, fechaNacimiento, genero, email, img) {
        this.userName = userName
        this.pwd = pwd
        this.nombre = nombre
        this.apellido = apellido
        this.domicilio = domicilio
        this.fechaNacimiento = fechaNacimiento
        this.genero = genero
        this.email = email
        this.img = img
    }
    nombreCompleto() {
        return this.nombre + ' ' + this.apellido
    }
    departamento() {
        return this.domicilio.departamento
    }
}

class Cliente extends Usuario {
    constructor(userName, pwd, nombre, apellido, domicilio, fechaNacimiento, genero, email, img) {
        super(userName, pwd, nombre, apellido, domicilio, fechaNacimiento, genero, email,img)
    }

}

class Proveedor extends Usuario {
    constructor(userName, pwd, nombre, apellido, domicilio, fechaNacimiento, genero, email, img, servicio, precioHora,descripcion) {
        super(userName, pwd, nombre, apellido, domicilio, fechaNacimiento, genero, email, img)
        this.servicio = servicio
        this.precioHora = precioHora
        this.descripcion = descripcion
    }
}

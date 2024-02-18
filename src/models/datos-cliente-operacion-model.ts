export interface DatosClienteInsertaInApi {
    nombres: string,
    correo: string
}

export interface DatosClienteInsertaOutApi {
    nombres: string,
    correo: string  
}

export interface DatosClienteActualizaInApi {
    Id: number,
    Nombres: string,
    Correo: string  
}

export interface DatosClienteActualizaOutApi {
    idCliente: number,
    nombres: string,
    correo: string
}
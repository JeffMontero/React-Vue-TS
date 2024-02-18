import { DatosClienteActualizaInApi, DatosClienteActualizaOutApi, DatosClienteInsertaInApi, DatosClienteInsertaOutApi } from '@/models';
import axios from 'axios';

const link = {service_url:'https://localhost:44395/api/Cliente/cliente/'}
const config = {
    headers: {
                'Canal':'IN',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
             }
}

export async function postDatosClienteInsertaServiceIn(_paramsDatosCliente : DatosClienteInsertaInApi) {
    try{
        const response = await axios.post<DatosClienteInsertaOutApi>(link.service_url+'insertar', _paramsDatosCliente, config);
        return response.data;
    }catch(error){
        return [];
    }
}

export async function deleteDatosClienteEliminaServiceIn(id: number) {
    try{
        console.log(id)
        console.log(link.service_url+'eliminar'+'?'+`id=${id}`)
        const response = await axios.delete(link.service_url+'eliminar'+'?'+`id=${id}`, config);
        return response.data;
    }catch(error){
        console.log('error ', error);
        return [];
    }
}

export async function putDatosClienteActualizaServiceIn(_paramsDatosCliente : DatosClienteActualizaInApi) {
    try{
        const response = await axios.put<DatosClienteActualizaOutApi>(link.service_url+'modificar', _paramsDatosCliente, config);
        return response.data;
    }catch(error){
        return [];
    }
}
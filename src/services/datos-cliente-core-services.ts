import { DatosClienteConsultaInCore} from '@/models';
import axios from 'axios';

const link = {service_url:'http://localhost:9301/Core.MediosDePago/TarjetasDemo/ConsultarDatosCliente'}
const config = {
    headers: {
                'Canal':'IN',
                //'withCredentials':'false',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'Content-Type':'application/x-www-form-urlencoded',
                'Access-Control-Credentials':true,
                'Access-Control-Allow-Origin':'*',
                //'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
                //'Access-Control-Allow-Headers':'Content-Type, Authorization, X-Requested-Width',
             }
}

export async function getDatosClienteConsultaServiceCore(_paramsDatosCliente : DatosClienteConsultaInCore) {
    try{
        //console.log('parametros', _paramsDatosCliente);
        const response = await axios.post(link.service_url, _paramsDatosCliente, config);
        //console.log('respuesta ', response.data.Data.ListarDatosClienteDto );     
        return response.data.Data.ListarDatosClienteDto;
    }catch(error){
        console.log('error ', error);
        return [];
    }
}
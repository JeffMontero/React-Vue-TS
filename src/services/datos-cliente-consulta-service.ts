import { DatosClienteConsultaOutApi} from '@/models';
import axios from 'axios';

const link = {service_url:'https://localhost:44395/api/Cliente/cliente/'}
const config = {
    headers: {
            'Canal':'IN',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Credentials':true,
                'Access-Control-Allow-Origin':'*'
             }
}

export async function getDatosClienteServiceAll() {
    try{     
        const response = await axios.get(link.service_url+'lista', config);
        console.log(response.data)
        return response.data.objetoADeserializar;
        
        
    }catch(error){
        return [];
    }
}


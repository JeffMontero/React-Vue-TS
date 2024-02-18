import { addDatosClienteConsulta } from '@/redux/states';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatosClienteTable } from './components';
import { getDatosClienteServiceAll, getDatosClienteConsultaServiceCore } from '@/services';
import { DatosClienteConsultaInCore } from '@/models';

export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    let opcion = "Api"; //Api

    //Invocar con los datos al formulario con el grid de datos cliente Core o Api
    if(opcion === "Api") {
      getDatosClienteServiceAll().then(
        data =>{
                dispatch(addDatosClienteConsulta(data));              
              }
      );
    }
    else {
      var datosIn: DatosClienteConsultaInCore = {
        Secuencial: -1,
        IdTarjeta: -1,      
        NombreTarjeta: '',
        Nacionalidad: -1,
        Usuario: -1,
        FechaProcesoDesde: '',
        FechaProcesoHasta: '',
        IdCliente: -1,
        Tramite: -1,
        TipoBin: -1,
        TarjetaEnmascarada: '',
        Siguiente: -1,
        Paginacion: -1
      }

      console.log("datos In", datosIn);

      getDatosClienteConsultaServiceCore(datosIn).then(
        data =>{
                  console.log("datos Out", data);
                  dispatch(addDatosClienteConsulta(data));              
              }
      );
    }
    
  }, []);

  return <DatosClienteTable />;
};

export default Home;

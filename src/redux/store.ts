import { DatosClienteConsultaOutApi } from '@/models';
import { configureStore } from '@reduxjs/toolkit';
import { datosClienteConsultaSlice } from './states';
import { favoritesDatosClienteConsultaSlice } from './states/favorite-datos-cliente-consulta-redux-state';

export interface AppStore {
  datosClienteConsulta: DatosClienteConsultaOutApi[];
  favoritesDatosClienteConsulta: DatosClienteConsultaOutApi[];
}

export default configureStore<AppStore>({
  reducer: {
    datosClienteConsulta: datosClienteConsultaSlice.reducer,
    favoritesDatosClienteConsulta: favoritesDatosClienteConsultaSlice.reducer
  }
});

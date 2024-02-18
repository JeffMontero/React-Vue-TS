import { LocalStorageTypes, DatosClienteConsultaOutApi } from '@/models';
import { getLocalStorage, setLocalStorage } from '@/utilities';
import { createSlice } from '@reduxjs/toolkit';

const initialState: DatosClienteConsultaOutApi[] = [];

export const datosClienteConsultaSlice = createSlice({
  name: 'datosClienteConsulta',
  initialState: getLocalStorage(LocalStorageTypes.DATOS_CLIENTE_CONSULTA) ? JSON.parse(getLocalStorage(LocalStorageTypes.DATOS_CLIENTE_CONSULTA) as string) : initialState,
  reducers: {
    addDatosClienteConsulta: (state, action) => {
      setLocalStorage(LocalStorageTypes.DATOS_CLIENTE_CONSULTA, state);
      return action.payload;
    }
  }
});

export const { addDatosClienteConsulta } = datosClienteConsultaSlice.actions;

export default datosClienteConsultaSlice.reducer;
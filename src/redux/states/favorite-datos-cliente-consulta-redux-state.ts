import { LocalStorageTypes, DatosClienteConsultaOutApi } from '@/models';
import { getLocalStorage, setLocalStorage } from '@/utilities';
import { createSlice, current } from '@reduxjs/toolkit';

const initialState: DatosClienteConsultaOutApi[] = [];

export const favoritesDatosClienteConsultaSlice = createSlice({
  name: 'favoritesDatosClienteConsulta',
  initialState: getLocalStorage(LocalStorageTypes.FAVORITES_DATOS_CLIENTE_CONSULTA)
    ? JSON.parse(getLocalStorage(LocalStorageTypes.FAVORITES_DATOS_CLIENTE_CONSULTA) as string)
    : initialState,
  reducers: {
    addFavoriteDatosClienteConsulta: (state, action) => {
      setLocalStorage(LocalStorageTypes.FAVORITES_DATOS_CLIENTE_CONSULTA, action.payload);
      return action.payload;
    },
    removeFavoriteDatosClienteConsulta: (state, action) => {
      const filteredState = current(state).filter((p: DatosClienteConsultaOutApi) => p.dc_secuencial !== action.payload.dc_secuencial);
      setLocalStorage(LocalStorageTypes.FAVORITES_DATOS_CLIENTE_CONSULTA, filteredState);
      return filteredState;
    }
  }
});

export const { addFavoriteDatosClienteConsulta, removeFavoriteDatosClienteConsulta } = favoritesDatosClienteConsultaSlice.actions;

export default favoritesDatosClienteConsultaSlice.reducer;

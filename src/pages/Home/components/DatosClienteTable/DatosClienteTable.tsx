import {DatosClienteActualizaInApi, DatosClienteConsultaOutApi} from '@/models';
import { AppStore } from '@/redux/store';
import { Delete, Edit  } from '@mui/icons-material';
import { Box, IconButton} from '@mui/material';
import { DataGrid, GridRenderCellParams, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import { deleteDatosClienteEliminaServiceIn, putDatosClienteActualizaServiceIn } from '@/services';

export interface DatosClienteTableInterface {}

const DatosClienteTable: React.FC<DatosClienteTableInterface> = () => {
  const stateDatosCliente = useSelector((store: AppStore) => store.datosClienteConsulta);
  const {confirm} = Modal;

  const showOKUpdateConfirm = ()=>{
    confirm({
      title: 'Mensaje de Acción',
      content: 'Datos de Cliente Actualizado con Éxito',
      okText: 'Aceptar',
      okType: 'text',
      okButtonProps :{style:{position: 'relative', display: 'flex', marginLeft: '40%', backgroundColor: 'dodgerblue'}},
      cancelButtonProps :{style:{display:'none'}},
      onOk(): void {
        window.location.reload();
      }                       
    })
  };

  const showOKDeleteConfirm = ()=>{
    confirm({
      title: 'Mensaje de Acción',
      content: 'El registro del Cliente ha sido Eliminado con Éxito',
      okText: 'Aceptar',
      okType: 'text',
      okButtonProps :{style:{position: 'relative', display: 'flex', marginLeft: '40%', backgroundColor: 'dodgerblue'}},
      cancelButtonProps :{style:{display:'none'}},
      onOk(): void {
        window.location.reload();
      }                       
    })
  };

  const showDeleteConfirm = (idCliente: number)=>{
    confirm({
      title: "ESTÁ SEGURO DE ELIMINAR ?",
      okText: "SI",
      okType: 'danger',
      cancelText: 'NO',
      onOk() {
        deleteDatosClienteEliminaServiceIn(idCliente).then(
            data => {
              showOKDeleteConfirm();
            }
        );
      },
      onCancel(){
      }
      
    })
  };

  const showUpdateConfirm = (dataIn: DatosClienteConsultaOutApi)=>{
    confirm({
      title: "ESTÁ SEGURO DE ACTUALIZAR ?",
      okText: "SI",
      okType: 'danger',
      cancelText: 'NO',
      onOk() {
        
        let dataCli: DatosClienteActualizaInApi = {
          Id: dataIn.idCliente,
          Nombres: dataIn.nombreCliente,
          Correo: dataIn.correo
        }
        console.log(dataCli)
        putDatosClienteActualizaServiceIn(dataCli).then(
          dataOut => {
            showOKUpdateConfirm();
          }
      );
      },
      onCancel(){
        window.location.reload();
      }
    })
   };
  
  function CustomToolBar(){
    return(
      <GridToolbarContainer >
        <GridToolbarExport  
         csvOptions ={{
         fileName: 'Reporte',
         delimiter: ',',
         utf8WithBom: true         
         }}
         style={{color: '#1b5e20'}}
        />
        {/* <GridToolbarFilterButton /> */}
        <GridToolbarDensitySelector style={{color: '#1b5e20'}} />
        <GridToolbarQuickFilter style={{color: '#1b5e20'}} />
      </ GridToolbarContainer>
      )
  }

  const colums = [
    {
      field: 'idCliente',
      type: 'idCliente',
      headerName: 'Id Cliente',
      flex: 1,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'nombreCliente',
      type: 'nombreCliente',
      headerName: 'Nombres',
      flex: 1,
      minWidth: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'correo',
      type: 'correo',
      headerName: 'Correo',
      flex: 1,
      minWidth: 200,
      editable: true,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>
    },
    {
      field: 'actions',
      type: 'actions',
      sortable: false,
      headerName: '',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <>
         {
            <IconButton color="info" aria-label="favorites" component="label" 
              onClick={()=>showUpdateConfirm(params.row)}>
              <Edit />
            </IconButton>
          }
          {
            <IconButton color="warning" aria-label="favorites" component="label" 
              onClick={()=>showDeleteConfirm(params.row.idCliente)
              } >
              <Delete />
            </IconButton>
          }
        </>
      )
    }
  ];

  return (  
    <Box sx={{ height: 340, width: 1220 }}>
    <DataGrid
      columnVisibilityModel={{
        idCliente: false,
        nombreCliente: true,
        correo: true,
        actions: true
      }}
      rows={stateDatosCliente}
      columns={colums}
      initialState={{
        pagination:{
          paginationModel:{page:0 , pageSize:6}          
        }        
      }}
      pageSizeOptions={[6, 20, 50, 100]}
      disableColumnSelector
      disableRowSelectionOnClick
      autoHeight
      getRowId={(row: any) => row.idCliente}
      slots={{toolbar: CustomToolBar}}
      sx={{bgcolor: 'white',
      boxShadow: 2,
      border: 2,
      borderColor: 'primary.light',
      '& .MuiDataGrid-cell:hover': {
        color: 'primary.main',
      }}}
      
      localeText={{
        toolbarExport : 'Exportar',
        toolbarDensity : 'Modo Visualización',
        toolbarQuickFilterPlaceholder : 'Busqueda de datos'
      }}
    />
    </Box>
  );
};

export default DatosClienteTable;
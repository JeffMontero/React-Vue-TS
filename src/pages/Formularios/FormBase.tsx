import * as Yup from 'yup';
import { useFormik } from "formik";
import { Layout } from "@/components/Layout/Layout";
import { Modal } from 'antd';
import { useState } from 'react';
import { Button } from "@mui/material";
import { Cancel, Person2Outlined, Save } from '@mui/icons-material';
import { postDatosClienteInsertaServiceIn } from '@/services';
import { DatosClienteInsertaInApi } from '@/models';

export const FormBase = () => {
   
    const {confirm} = Modal;
    const showOKConfirm = ()=>{
        confirm({
          title: 'Mensaje de Acción',
          content: 'Datos de Cliente Insertados con Éxito',
          okText: 'Aceptar',
          okType: 'text',
          okButtonProps :{style:{position: 'relative', display: 'flex', marginLeft: '40%', backgroundColor: 'dodgerblue'}},
          cancelButtonProps :{style:{display:'none'}},
          onOk(): void {
            setOpen(false);
            window.location.reload();
          }                       
        })
    };
    const showErrorConfirm = ()=>{
        confirm({
          title: 'Mensaje de Acción',
          content: 'Estos Datos de Cliente ya han sido Insertados',
          okText: 'Aceptar',
          okType: 'text',
          okButtonProps :{style:{position: 'relative', display: 'flex', marginLeft: '40%', backgroundColor: 'red'}},
          cancelButtonProps :{style:{display:'none'}},
          onOk(): void {
            setOpen(false);
          }                       
        })
    };
    const showCatchConfirm = ()=>{
        confirm({
          title: 'Mensaje de Acción',
          content: 'Error en la petición del servicio',
          okText: 'Aceptar',
          okType: 'text',
          okButtonProps :{style:{position: 'relative', display: 'flex', marginLeft: '40%', backgroundColor: 'crimson'}},
          cancelButtonProps :{style:{display:'none'}},
          onOk(): void {
            setOpen(false);
          }                       
        })
    };    

    const { handleSubmit, errors, touched, getFieldProps } = useFormik({
        initialValues: {
            Nombres: '',
            Correo: ''
        },
        validationSchema: Yup.object({
            Nombres: Yup.string().min(3, 'Min. 3 characters').required('*'),
            Correo: Yup.string().min(5, 'Min. 5 characters').required('*'),
        }),
        onSubmit: values => {
            
             var datosClienteInserta : DatosClienteInsertaInApi = {
                nombres: values.Nombres,                
                correo: values.Correo,
            };
            
            console.log('datos inserta',datosClienteInserta);
            postDatosClienteInsertaServiceIn(datosClienteInserta).then(
                data =>{
                     const result = Object.values(data);
                     //console.log(result.length);
                     if(result.length === 0){
                         showErrorConfirm();
                     }
                     else{                        
                         showOKConfirm();
                     }                        
                 }
             ).catch(
                 data =>{
                     showCatchConfirm();
                 }
             );
        }
    });
    
    
    const [open, setOpen] = useState (false);
    
    const showModal = () =>{
        setOpen(true);
    };

    
    const handleCancel = () =>{
        setOpen(false);        
    }

    return (
    <>
    <div style={{display:'flex', width:'100%', padding:'0'}}>
    <Button  color="success" aria-label="Añadir" variant="contained" component="button" onClick={showModal} >
      NUEVO <Person2Outlined />  
    </Button>
    </div>
    <Modal
      title = ""
      open = {open}
      onCancel = {handleCancel}
      footer={[
        
      ]}
     
    >
      <Layout title="">
      <form noValidate onSubmit={handleSubmit} id="myForm">
        <div className='formCampo'>
          <h4>Nombres:</h4><input
            type="text"
            placeholder="Nombres"
            {...getFieldProps('Nombres')}
             className={`${(touched.Nombres && errors.Nombres) && 'error_input'}`}
          />
          {(touched.Nombres && errors.Nombres) && <span className="error">{errors.Nombres}</span>}
        </div>
        <div className='formCampo'>
          <h4>Correo:</h4><input
            type="text"
            placeholder="Correo"
            {...getFieldProps('Correo')}
            className={`${(touched.Correo && errors.Correo) && 'error_input'}`}
          />
          {(touched.Correo && errors.Correo) && <span className="error">{errors.Correo}</span>}
        </div>
        <div>        
          <Button  color="warning" key="back"  size='small' type='reset' onClick={handleCancel} startIcon={<Cancel/>}>
            CANCELAR
          </Button>
          <Button color='success' form='myForm' variant='contained' size='small' key="submit" type='submit' endIcon={<Save/>} >
            GUARDAR
          </Button>
        </div>
      </form>
    </Layout>
    </Modal>
    </>
    )
}

export default FormBase;
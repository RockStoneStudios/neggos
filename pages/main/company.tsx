import React from 'react'
import { Box, Button, Grid, TextField, Typography, TextareaAutosize } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { useForm } from 'react-hook-form';


type FormData = {
    send_move :string;
    sales : string;
}

const MainPage = () => {
    const {register,handleSubmit,formState :{errors}} = useForm<FormData>();

  return (
    
    <ShopLayout title={'Principal'} pageDescription={'Muro de Usuario'}>

        <Box sx={{display:'flex', justifyContent:'center',alignItems:'center' }} >

       
            <form>
                <Box sx={{ width: 350, padding:'50px 20px' }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Bienvenido</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                            label="Enviar movimiento" 
                            variant="filled" 
                            fullWidth 
                            {...register('send_move',{
                                required: 'Este campo es requerido',
                                minLength : {value : 3, message : 'Tu Nombre debe tener minimo 3 caracteres'}
                            })}
                            error = {!!errors.send_move}
                            helperText= {errors.send_move?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' sx={{backgroundColor : '#1265ab',color: 'white'}} size='large' fullWidth>
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                        <Grid item xs={12}>
                            <TextField 
                            minRows={4}
                            label="Ventas del dia" 
                            variant="filled" 
                            fullWidth 
                            {...register('sales',{
                                required: 'Este campo es requerido',
                                minLength : {value : 3, message : 'Tu Nombre debe tener minimo 3 caracteres'}
                            })}
                            error = {!!errors.sales}
                            helperText= {errors.sales?.message}
                            />
                        </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' sx={{backgroundColor : '#1265ab',color: 'white'}} size='large' fullWidth>
                                Ingresar
                            </Button>
                        </Grid>
                        </Grid>
                </Box>   
            </form>  
        </Box>         
</ShopLayout>
    
  )
}

export default MainPage;
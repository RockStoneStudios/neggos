import React from 'react'
import { Box, Button, Grid, TextField, Typography, TextareaAutosize } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { useForm } from 'react-hook-form';


type FormData = {
    purchases_day :string;
    summary_today : string;
}

const MainPage = () => {
    const {register,handleSubmit,formState :{errors}} = useForm<FormData>();

  return (
    
    <ShopLayout title={'Principal'} pageDescription={'Muro de Usuario'}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component="h1">Bienvenido a Neggo</Typography>
                    </Grid>
       <Box sx={{display:'flex', justifyContent:'center'}}>
        <form>
        <Box sx={{ width: 350, padding:'50px 20px', display:'flex', justifyContent:'center',alignItems:'center' }}>
                <Grid container spacing={2} >

                    <Grid item xs={12}>
                        <TextField 
                        label="Compras del dia" 
                        variant="filled" 
                        fullWidth 
                        {...register('purchases_day',{
                            required: 'Este campo es requerido',
                            minLength : {value : 3, message : 'Tu Nombre debe tener minimo 3 caracteres'}
                        })}
                        error = {!!errors.purchases_day}
                        helperText= {errors.purchases_day?.message}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Button type='submit' sx={{backgroundColor : '#1265ab',color: 'white'}} size='large' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField 
                        multiline
                        minRows={6}
                        label="Resumen del dia" 
                        variant='standard' 
                        fullWidth 
                        {...register('summary_today',{
                            required: 'Este campo es requerido',
                            minLength : {value : 5, message : 'Resumen del dia'}
                        })}
                        error = {!!errors.summary_today}
                        helperText= {errors.summary_today}
                        />
                       
                        
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
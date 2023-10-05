"use client"

import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../../components/layouts/AuthLayout'
import { useForm } from 'react-hook-form';
import neggoApi from '../../../api/neggoApi';
import { useRouter } from 'next/router';
import { useState } from 'react';



type FormData = {
    phone      :string;
    password   :string;
   
}

const RegisterCompanyPage = () => {
    const {register,handleSubmit,formState :{errors}} = useForm<FormData>();
    const [error,setError] = useState(false);
    const router = useRouter();
   const onLoginCompanyForm = async ({phone,password} : FormData) => {
    
        console.log(phone,password);
        const {data,statusText} = await neggoApi.post('/auth/company/login',{phone,password},{headers: { 'content-type': 'application/x-www-form-urlencoded' }});
        console.log(statusText,data)
        if(statusText === 'OK'){
            router.push('/main/company');
        }else {
            setError(true);
        }
   
   }

  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onLoginCompanyForm)}>
            <Box sx={{ width: 348, padding:'50px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component="h1">Inicia Session</Typography>
                    </Grid>

                   
                    <Grid item xs={12}>
                        <TextField
                        label="Celular"
                        type='number' 
                        variant="filled" 
                        fullWidth 
                        {...register('phone',{
                            required: 'Este campo es requerido',
                            minLength : {value : 10, message : 'Tu Celular tener minimo 10 numeros'}
                        })}
                        error = {!!errors.phone}
                        helperText= {errors.phone?.message}
                        />
                    </Grid>
                   
                    <Grid item xs={12}>
                        <TextField 
                        label="Password"  
                        variant="filled" 
                        fullWidth
                        {...register('password',{
                            required: 'Este campo es requerido',
                            minLength : {value : 4, message : 'El password debe tener minimo 4 caracteres'}
                        })}
                        error = {!!errors.password}
                        helperText= {errors.password?.message}
                        />
                    </Grid>
                   

                    <Grid item xs={12}>
                        <Button 
                         type='submit'
                        sx={{backgroundColor : '#1265ab',color: 'white'}} size='large' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                     {
                        error && (
                            <Typography variant='h6' color={'#a81102'}>Error </Typography>
                        )
                     }
                    <Grid item xs={12} display='flex' flexDirection='column' gap={2} justifyContent='center' alignItems='center'  >
                        <NextLink href="/auth/company/register" passHref >
                            <Link color={'#1165aa'} fontSize={14} fontWeight={600} underline='always'>
                               No tienes cuenta? Registra tu empresa
                            </Link>
                        </NextLink>
                        <NextLink href="/auth/person/login" passHref >
                            <Link color={'#1165aa'} fontSize={14} fontWeight={600} underline='always'>
                               Logueate como persona natural
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterCompanyPage;
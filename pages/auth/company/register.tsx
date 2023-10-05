"use client"

import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../../components/layouts/AuthLayout'
import { useForm } from 'react-hook-form';
import neggoApi from '../../../api/neggoApi';
import { useRouter } from 'next/router';
import { useState } from 'react';



type FormData = {
    name       :string;
    phone      :string;
    email      :string;
    password   :string;
    name_company  :string;
}

const RegisterCompanyPage = () => {
    const {register,handleSubmit,formState :{errors}} = useForm<FormData>();
    const [error,setError] = useState(false);
    const router = useRouter();
   const onRegisterCompanyForm = async ({name,phone,email,password,name_company} : FormData) => {
    
        console.log(name,phone,email,password,name_company);
        const {data,statusText} = await neggoApi.post('/auth/company/register',{name,phone,email,password,name_company},{headers: { 'content-type': 'application/x-www-form-urlencoded' }});
        if(statusText=== 'OK'){
            router.push('/auth/company/login');
        }else {
            setError(true);
        }
   
   }

  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onRegisterCompanyForm)}>
            <Box sx={{ width: 348, padding:'50px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component="h1">Registra tu Empresa</Typography>
                    </Grid>
                    {
                        error && (
                            <Typography variant='h6' color={'#a81102'}>Error </Typography>
                        )
                     }
                    <Grid item xs={12}>
                        <TextField
                        label="Nombre" 
                        variant="filled"
                        fullWidth
                        {...register('name',{
                            required: 'Este campo es requerido',
                            minLength : {value : 3, message : 'Tu Nombre debe tener minimo 3 caracteres'}
                        })}
                        error = {!!errors.name}
                        helperText= {errors.name?.message}
                        />
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
                        label="Email" 
                        type='email'
                        variant="filled"
                        fullWidth 
                        {...register('email',{
                            required: 'Este campo es requerido',
                        
                        })}
                        error = {!!errors.email}
                        helperText= {errors.email?.message}
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
                        error = {!!errors.name_company}
                        helperText= {errors.name_company?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        label="Nombre de la Empresa"  
                        variant="filled" 
                        fullWidth
                        {...register('name_company',{
                            required: 'Este campo es requerido',
                            minLength : {value : 2, message : 'El nombre de la empresa debe tener minimo 1 caracter'}
                        })}
                        error = {!!errors.name_company}
                        helperText= {errors.name_company?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                         type='submit'
                        sx={{backgroundColor : '#1265ab',color: 'white'}} size='large' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12} flexDirection='column' display='flex' justifyContent='center' alignItems='center' gap={2}>
                    <NextLink href="/auth/company/login" passHref >
                           <Link color={'#1165aa'} fontSize={14} fontWeight={600} underline='always'>
                                Inicia Sesion
                            </Link>
                        </NextLink>
                        <NextLink href="/auth/person/register" passHref >
                           <Link color={'#1165aa'} fontSize={14} fontWeight={600} underline='always'>
                                Registrate como Persona Natural
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
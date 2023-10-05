"use client";

import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../../components/layouts/AuthLayout';
import {useForm} from 'react-hook-form';

import { Boy } from '@mui/icons-material';
import neggoApi from '../../../api/neggoApi';
import { useRouter } from 'next/router';
import { useState } from 'react';


 type FormData = {
    phone      :string;
    password   :string;
    
}

const LoginPersonPage = () => {
    const {register,handleSubmit,formState :{errors}} = useForm<FormData>();
    const [error,setError] = useState(false);
    const router = useRouter();
 
    const onRegisterForm = async({phone,password}:FormData) => {
        //  if(data === 'OK'){
            //     console.log('Ok agregado');
            //  }
            console.log(phone,password);
            // const body = {name,phone,email,password,ocupation}
            // const {data,statusText} = await neggoApi.post('/auth/person/register',body, {headers: { 'content-type': 'application/x-www-form-urlencoded' }},);
            // if(statusText=== 'OK'){
            //     router.push('/main/person');
            // }else {
            //     setError(true);
            // }
            
    }

  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onRegisterForm)}>
            <Box sx={{ width: 340, padding:'50px 20px' }}>
                <Grid container spacing={2} >
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
                            minLength : {value : 10, message : 'Tu cel debe tener 10 numeros'}
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
                            minLength : {value : 4, message : 'Tu password debe tener minimo 4 caracteres'}
                        })}
                        error = {!!errors.password}
                        helperText= {errors.password?.message}
                    />
                    </Grid>
                    
                  

                    <Grid item xs={12}>
                        <Button type='submit' sx={{backgroundColor : '#1265ab',color: 'white'}} size='large' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>

                    <Grid item xs={12} gap={2} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        
                        <NextLink href="/auth/person/register" passHref >
                            <Link color={'#1165aa'} fontSize={13} fontWeight={600} underline='always'>
                                ¿No tienes cuenta Registrate?
                            </Link>
                        </NextLink>
                        <NextLink href="/auth/company/login" passHref >
                            <Link color={'#1165aa'} fontSize={13} fontWeight={600} underline='always'>
                                Inicia Session como empresa
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPersonPage;
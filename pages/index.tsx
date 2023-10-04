import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ShopLayout } from '../components/layouts'
import { Typography } from '@mui/material'


const Home: NextPage = () => {
  return (
    <ShopLayout title={'Neggos'} pageDescription={'Conocenos'}>
    <Typography variant='h1' component='h1'>Bienvenidos</Typography>
    <Typography color={'#0265aa'} variant='h2' sx={{ mb: 1 }}>a Neggos</Typography>

 

</ShopLayout>
   
   
  )
}

export default Home

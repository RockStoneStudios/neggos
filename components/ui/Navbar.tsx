import NextLink from 'next/link';

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined, PermIdentity } from '@mui/icons-material';

export const Navbar = () => {
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex' alignItems='center'>
                    <Typography variant='h5' color={"#1165ad"} fontWeight={600}>Neggo</Typography>
                    
                </Link>  
            </NextLink>

            <Box flex={ 1 } />

            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <NextLink href='/auth/person/register' passHref>
                    <Link>
                        <Button sx={{color: '#1165ad',fontSize:17,fontWeight:600}}>Personas</Button>
                    </Link>
                </NextLink>
                <NextLink href='/auth/company/register' passHref>
                    <Link>
                        <Button sx={{color: '#1165ad',fontSize:17,fontWeight : 600}}>Empresas</Button>
                    </Link>
                </NextLink>
                
            </Box>


            <Box flex={ 1 } />

            <IconButton>
                <SearchOutlined />
            </IconButton>

            <NextLink href="/auth/person/register" passHref>
                <Link>
                    <IconButton>
                      
                        <PermIdentity/>
                       
                    </IconButton>
                </Link>
            </NextLink>


            <Button>
                Menú
            </Button>

        </Toolbar>
    </AppBar>
  )
}

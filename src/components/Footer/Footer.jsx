import { Icon } from '@iconify/react';
import { Container, IconButton, Link, Sheet, Stack, Typography } from '@mui/joy';
import { useMediaQuery } from '@mui/material';
import React from 'react';
import theme from '../../Theme.jsx';


const Footer = () => {
    return (
        <Sheet invertedColors color='appTheme' variant='solid' sx={{ flexShrink: 0 }}>
            <Sheet sx={{ p: 4 }}>
                <Container>
                    <Stack gap={3} direction={useMediaQuery(theme.breakpoints.up("md")) ? 'row' : 'column'}>
                        <Stack sx={{ flexGrow: 1 }}>
                            <Typography level='h4'>Pineapply</Typography>
                            <Typography level='body-sm'>Find job listings from multiple sites and automatically apply, all in one place.</Typography>
                        </Stack>

                        <Stack direction={useMediaQuery(theme.breakpoints.up("md")) ? 'row' : 'column'} gap={4}>
                            <Stack>
                                <Typography level='title-lg' color='primary'>Explore</Typography>
                                <Link><Typography level='body-sm'>Features</Typography></Link>
                                <Link><Typography level='body-sm'>Pricing</Typography></Link>
                            </Stack>
                            <Stack>
                                <Typography level='title-lg' color='primary'>Legal</Typography>
                                <Link><Typography level='body-sm'>Privacy Policy</Typography></Link>
                                <Link><Typography level='body-sm'>Terms of Service</Typography></Link>
                                <Link><Typography level='body-sm'>Contact us</Typography></Link>
                            </Stack>
                            <Stack gap={1}>
                                <Typography level='title-lg' color='primary'>Contact us</Typography>
                                <Stack direction='row' gap={2}>
                                    <Link href="https://www.instagram.com/pineapply.ai" target="_blank">
                                        <IconButton variant='soft' sx={{ borderRadius: '50px' }}>
                                            <Icon fontSize='24px' icon='mdi:instagram' />
                                        </IconButton>
                                    </Link>
                                    <IconButton variant='soft' sx={{ borderRadius: '50px' }}><Icon fontSize='24px' icon='gg:facebook' /></IconButton>
                                </Stack>
                                <Link><Typography level='body-md' startDecorator={<Icon icon='ic:outline-email' />}>kareemy9000@gmail.com</Typography></Link>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </Sheet>
            <Sheet sx={{ p: 1 }}>
                <Stack justifyContent='center' alignItems='center'>
                    <Typography level='body-xs'>Copyright 2024 Pineapply</Typography>
                </Stack>
            </Sheet>
        </Sheet>
    )
}


export default Footer;



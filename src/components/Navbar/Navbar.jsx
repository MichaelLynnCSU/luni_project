import { Icon } from '@iconify/react';
import { Button, Container, DialogTitle, Drawer, IconButton, Link, ModalClose, Sheet, Stack, Typography } from '@mui/joy';
import React, { useState } from 'react';
import LogoutButton from "../Logout/Logout.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../firebaseauth.js"
import { Box } from '@mui/material';

const Navbar = () => {

    const [open, setOpen] = useState(false) //default state is close
    const [user] = useAuthState(auth);

    return (
        <>
            <Sheet color='appTheme'>
                <Container>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' p={2}>
                        <Stack sx={{display: {xs: 'none', md: 'flex'}}} direction='row' gap={2}>
                            <Link href="/">
                                <Typography level='body-sm'>
                                    Home
                                </Typography>
                            </Link>
                            <Link href="uae-labour-laws">
                                <Typography level='body-sm'>
                                    UAE Labor laws bot
                                </Typography>
                            </Link>
                                <Link href="/headshot">
                                    <Typography level='body-sm'>
                                        A.I headshots
                                    </Typography>
                                </Link>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Box sx={{
                                    p: 0.5,
                                    borderRadius: 'circle',
                                    bgcolor: 'purple.main'
                                }}>
                                </Box>

                            </Stack>
                            <Box
                                component="button"
                                sx={{
                                    backgroundColor: 'purple',
                                    color: '#ffffff',
                                    borderRadius: '100px',
                                    padding: '8px 24px',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: '#9370db', // Slightly darker purple on hover
                                    },
                                }}
                            >
                                Beta
                            </Box>
                        </Stack>
                        <Typography level='title-lg' color='appTheme'>Pineapply AI</Typography>
                        <Stack sx={{display: {xs: 'none', md: 'flex'}}} direction='row' gap={2}>
                            {user ? (
                                // Show LogoutButton when user is logged in
                                <LogoutButton />
                            ) : (
                                // Show Login button when no user is logged in
                                <Link href="login"><Button color='appTheme' variant='outlined'>Log in</Button></Link>
                            )}
                            <Button color='appTheme' variant='solid'>Create an account</Button>
                        </Stack>

                        <IconButton onClick={() => setOpen(true)} sx={{ display: { xs: 'initial', md: 'none' } }} color='appTheme' variant='solid'><Icon fontSize={'28px'} icon='jam:menu' /></IconButton>
                    </Stack>
                </Container>
            </Sheet>

            {/* Mobile nav drawer */}
            <Drawer
                size='md'
                color='neutral'
                open={open}
                anchor='top'
                onClose={() => setOpen(false)}
                slotProps={{
                    content: {
                        sx: {
                            bgcolor: 'transparent',
                            p: { md: 3, sm: 0 },
                            boxShadow: 'none',
                        },
                    },
                }}>
                <Sheet sx={{
                    boxSizing: 'border-box',
                    borderRadius: 'md',
                    m: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    height: '100%',
                    overflow: 'auto',
                }}>
                    <Stack sx={{ p: 3 }} gap={1}>
                        <ModalClose />
                        <DialogTitle sx={{ justifyContent: 'center', mb: 3 }}><Typography color='appTheme' level='title-lg'>Pineapply AI</Typography></DialogTitle>
                        <Link href="/"><Button sx={{ width: '100%' }} color='neutral' variant='plain'>Home</Button></Link>
                        <Link href="uae-labour-laws"><Button sx={{ width: '100%' }} color='neutral' variant='plain'>UAE Labor Bot</Button></Link>
                        <Link href="headshot"><Button sx={{ width: '100%' }} color='neutral' variant='plain'> A.I headshots </Button></Link>
                        <Link href="login"><Button sx={{ width: '100%' }} color='appTheme' variant='solid'>Log in</Button></Link>
                        <Link href="logout"><Button sx={{ width: '100%' }} color='appTheme' variant='solid'>Log out</Button></Link>

                    </Stack>
                </Sheet>
            </Drawer>
        </>
    )
}

export default Navbar;
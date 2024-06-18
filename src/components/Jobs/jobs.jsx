import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import { Button, Card, Container, Input, Stack, Typography } from '@mui/joy';
import { Icon } from '@iconify/react';
import Footer from '../Footer/Footer.jsx';
import { useMediaQuery } from '@mui/material';
import theme from '../../Theme.jsx';
import headerImg from '../../assets/images/header.svg';
import PdfUploadForm from "../PdfUploadForm/PdfUploadForm.jsx";
import styles from "../Features/Features.module.scss";

const LandingPage = () => {
  return (
      <>
        <Navbar />

        <section>
          <Container>
            <Stack gap={4} direction={useMediaQuery(theme.breakpoints.up("md")) ? 'row' : 'column'} sx={{ minHeight: '65vh', flexGrow: 1 }}  alignItems={'center'}>
              <Stack gap={1} sx={{ height: '100%', textAlign: useMediaQuery(theme.breakpoints.up("md")) ? 'left' : 'center' }}>
                <Typography level='h1'>Pineapply ai automatically fills out job applications for you.</Typography>
                <Typography level='body-lg'>Our tool will aggregate all relevant listings and automatically fill applications for you</Typography>
                <Input
                    placeholder='What Jobs are you interested in?'
                    variant='soft'
                    size='lg'
                    endDecorator={
                      <>
                        <Button color='appTheme' size='lg'>Search</Button>
                      </>
                    } />
              </Stack>

              <img className='header-image' src={headerImg} alt="" />
            </Stack>
          </Container>
        </section>

        <section style={{ textAlign: 'center', padding: '60px 0' }}>
          <Container>

            <Typography level='fhjh2'>Upload your CV below</Typography>
            <PdfUploadForm/>
            <Typography level='h2'>Pineapply Features</Typography>
            <Stack direction={useMediaQuery(theme.breakpoints.up("md")) ? 'row' : 'column'} gap={2} mt={3}
                   justifyContent='center' alignItems={'center'}>
                <Card variant='outlined' sx={{width: '300px', textAlign: 'left'}}>
                    <Stack gap={0.5}>
                        <Icon color='#4CAF50' fontSize={"53px"} icon='ic:round-verified-user'/>
                        <Typography level='title-lg'>View all available jobs in the UAE. </Typography>
                        <Typography level='body-sm'>View all available jobs from all the local job boards and jobs you
                            normally would've missed in one place!</Typography>
                    </Stack>
                </Card>
                <Card variant='outlined' sx={{width: '300px', textAlign: 'left'}}>
                    <Stack gap={0.5}>
                        <Icon color='#8F74FD' fontSize={"53px"} icon='bi:globe'/>
                  <Typography level='title-lg'>Job postings from multiple sites</Typography>
                  <Typography level='body-sm'>Find postings from your favorite job boards all in one
                    place</Typography>
                </Stack>
              </Card>
            </Stack>
          </Container>
        </section>
        <Footer/>
      </>
  )
}

export default LandingPage;

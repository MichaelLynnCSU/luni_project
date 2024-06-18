import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { Button, Container, Input, Stack, Typography } from '@mui/joy';
import Footer from '../../components/Footer/Footer.jsx';
import { useMediaQuery } from '@mui/material';
import theme from '../../Theme.jsx';

import headerImg from '../../../functions/assets/images/header.svg';
import PdfUploadForm from "../../components/PdfUploadForm/PdfUploadForm.jsx";
import Features from "../../components/Features/Features.jsx";
//import Pricing from "../../components/pricing/pricing.jsx";

import axios from 'axios';
import JobsList from '../../components/JobsList/JobsList.jsx';
// For userid From LOGGED IN USER
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../../firebaseauth.js";

const LandingPage = () => {

  // State variables
  const [query, setQuery] = useState("") // State holding the value in the input box - updated as it changes
  const [loading, setLoading] = useState(false) // State to check if the results are loading
  const [jobs, setJobs] = useState(null) // State holding the jobs from Google
  const [jobsFromWorkable, setJobsFromWorkable] = useState(null) // State holding the jobs scraped from Workable
  const [workableLoading, setWorkableLoading] = useState(false) // State to check if Workable forms are being filled
  const [file, setFile] = useState(null) // State containing the user's resume
  const [userData, setUserData] = useState(null) // State containing user data from the resume
  const [originalFile, setOriginalFile] = useState(null) // State containing the resume as a File


  useEffect(() => {
    // Log resume data
    console.log("Here's the resume data: ", originalFile);
  }, [originalFile]);

  // Function to run the query on Google
  const runQueryOnGoogle = async () => {
    setLoading(true)
    try {
      const response = await axios.post("http://localhost:3001/api/api/search", { query: query })
      console.log(response);
      setJobs(response.data)
    } catch (e) {
      console.log(e)
    }
    setLoading(false)
  }


  const applyToWorkable = async () => {
    setWorkableLoading(true)
    // First get the listings
    const response = await axios.post("http://localhost:3001/api/api/getListingsFromWorkable")
    //pri
    console.log(response.data.listings);

    // Set up the data to send to the server
    const formdata = new FormData()
    formdata.append("file", originalFile)
    formdata.append("link", "/view/g9QAxQW7Sc7bnou1MNUiuf/real-estate-sales-agents---dubai-in-dubai-at-apt-resources")
    formdata.append("resumeData", file)
    formdata.append("userData", JSON.stringify(userData))

    console.log("if i was to print resume data from landing page : ",JSON.stringify(userData));

    // const status = await axios.post("http://localhost:3001/api/api/fillWorkable", formdata, { headers: { "Content-Type": "multipart/form-data" } })
    // console.log(status.data)

    // Now fill the forms, one by one

    for (const listing of response.data.listings) {
      try {
        const responseFromServer = await axios.post("http://localhost:3001/api/api/fillWorkable", {
          link: listing.link,
          resumeData: file,
          userData: userData
        })
        console.log(responseFromServer.data);
      } catch (e) {
        console.log(e)
      }
    }
    setWorkableLoading(false)
  }

  // const getWorkableListings = async () => {
  //   const response = await axios.post("http://localhost:3001/api/api/getListingsFromWorkable")
  //   response.data.listings.map(listing => console.log(listing.link))
  // }

  return (
      <>
        <Navbar />
        <section>
          <Container>

            <Stack gap={4} direction={useMediaQuery(theme.breakpoints.up("md")) ? 'row' : 'column'}
                   sx={{minHeight: '65vh', flexGrow: 1}} alignItems={'center'}>
              <Stack gap={1} sx={{
                height: '100%',
                textAlign: useMediaQuery(theme.breakpoints.up("md")) ? 'left' : 'center'
              }}>
                <Features/>
                <div style={{textAlign: 'center'}}>
                  <p style={{fontSize: '36px', color: 'purple'}}><b>STEP 1</b></p>
                </div>
                <Typography level='body-lg'>
                  Upload your CV, please make sure its up to date and contains all the relevant information to improve your results.
                  If you would like to improve your CV. While it's not necessary, please consider using the Jobxdubai cv review service
                  <a href="https://cv-review.com/"> here .</a>
                </Typography>
                <PdfUploadForm setPDF={setFile} setResumeData={setUserData} setOriginalFile={setOriginalFile}/>
                <div style={{textAlign: 'center'}}>
                  <p style={{fontSize: '36px', color: 'purple'}}><b>STEP 2</b></p>
                </div>
                <Typography level='h1'>Pineapply AI automatically fills out job applications in Dubai/UAE for
                  you.</Typography>
                <Typography level='body-lg'>Our tool will aggregate all relevant listings and automatically
                  fill applications for you</Typography>
                <Input
                    placeholder='Search for job listings...'
                    variant='soft'
                    size='lg'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    endDecorator={
                      <>
                        <Button loading={loading} onClick={async () => await runQueryOnGoogle()} color='appTheme'
                                size='lg'>Search</Button>
                      </>
                    }/>
                <br/> <br/>
                <div style={{textAlign: 'center'}}>
                  <p style={{fontSize: '36px', color: 'purple'}}><b>STEP 3</b></p>
                </div>
                <Button loading={workableLoading} onClick={async () => await applyToWorkable()} color='appTheme'
                        sx={{my: 2}}>Auto-apply to all</Button>
                {/* <Button onClick={getWorkableListings}>Get Workable listings</Button> */}
              </Stack>

              <img className='header-image' src={headerImg} alt=""/>

            </Stack>
            <br/> <br/>
            <div style={{textAlign: 'center'}}>
              <p style={{fontSize: '36px', color: 'purple'}}><b>STEP 4</b></p>
            </div>
            <br/>
            <Typography level='body-lg'>  Get a head start on your job search with our application packages!
              Each package includes credits to automate job applications for you. More credits means more applications
              sent on your behalf.
              With 1000 credits you can automate 1000 job applications - saving you tons of time and effort!
              More features to the auto-applier coming soon.
            </Typography>

            <Pricing/>

          </Container>
        </section>

        {/* Section for search results - from Google */}
        {(!loading && jobs) && <>
          <section>
            <Container sx={{textAlign: 'center', py: 5}}>
              <Typography level='title-lg'>Search results for '{query}'</Typography>

              <Button loading={workableLoading} onClick={async () => await applyToWorkable()} color='appTheme'
                      sx={{my: 2}}>Auto-apply to all</Button>
              <JobsList jobs={jobs} />

            </Container>
          </section>
        </>}

        <Footer />
      </>
  )
}
export default LandingPage;
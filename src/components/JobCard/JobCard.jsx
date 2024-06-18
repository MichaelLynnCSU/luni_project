// Import React
import { Button, Sheet, Stack, Typography } from '@mui/joy';
import React from 'react';

// Component to display a job card
function JobCard({title, company}) {
    return (
        <Sheet variant='soft' color='neutral' sx={{ p: 2, borderRadius: '5px', mb: 2, maxWidth: '500px', mx: 'auto' }}>
            <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
                <Stack alignItems={'start'}>
                    <Typography level='title-lg'>{title}</Typography>
                    <Typography level='body-lg'>{company}</Typography>
                </Stack>

                <Button variant='outlined' color='appTheme'>View job</Button>
            </Stack>
        </Sheet>
    );
}
export default JobCard;

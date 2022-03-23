import { Box, Button, Grid, Paper, Avatar } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Profile } from "../Profile/profile";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';

export interface JobStarHeaderProps {
    handleJobStarClick: () => void
    handleAddAchievementClick: () => void
    handleProfileClick: (profile: Profile) => void
    connectedProfiles: Profile[]
}

export function JobStarHeader(props: JobStarHeaderProps) {
    const header =   <Box sx={{
        mt:"-70px"
     }}>
        <Grid container spacing={0}>
            <Grid item xs={8}>
                <Button variant="text" sx={{ color: "white", mt:"10px" }} 
                    onClick={props.handleJobStarClick}>
                   <HomeIcon />
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={() => props.handleAddAchievementClick()}>
                    <AddCircleIcon sx={{ fontSize: 50 }} color="success"></AddCircleIcon>
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={() => props.handleProfileClick(props.connectedProfiles[0])}>
                    <Avatar alt="avatar" src={props.connectedProfiles[0].imageUri} sx={{ height: 50, width: 50 }}></Avatar>
                </Button>
            </Grid>
        </Grid>
    </Box>
    return <CenteredPage element={header}></CenteredPage>
}

function CenteredPage(props: { element: JSX.Element }) {
    return <Grid container spacing={0}>
        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
            {props.element}
        </Grid>
        <Grid item xs={12}>
        </Grid>
    </Grid>
}
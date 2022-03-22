import { Box, Button, Grid, Paper, Avatar } from "@mui/material";
import { Profile } from "../Profile/profile";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "@fontsource/podkova/400.css";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { spacing } from '@mui/system';
// constants
import { APP_TITLE } from "../constants";


export interface JobStarHeaderProps {
    handleJobStarClick: () => void
    handleAddAchievementClick: () => void
    handleProfileClick: (profile: Profile) => void
    connectedProfiles: Profile[]
}

export function JobStarHeader(props: JobStarHeaderProps) {
    const theme = {
        spacing: 8,
      }
      
      const header = 
           <Box>
                <Button onClick={() => props.handleAddAchievementClick()}
                 sx={{
                    ml:"75%",
                    mt:"-120px"
                 }}>
                    <AddCircleIcon sx={{ fontSize: 50 }} color="success"></AddCircleIcon>
                </Button>
                <Button onClick={() => props.handleProfileClick(props.connectedProfiles[0])}  
                sx={{
                    ml:"85%",
                    mt:"-160px"
                 }}>
                     
                    <Avatar alt="avatar" src={props.connectedProfiles[0].imageUri} sx={{ height: 50, width: 50 }}></Avatar>
                </Button>
           </Box>
    return header
}

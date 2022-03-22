// src/pages/Home.tsx

import React, {ReactElement, FC} from "react";
import {Box, Typography} from "@mui/material";

import { Achievement, AchievementView, getLatestAchievementsAll } from "../Achievements/achievements";
import { JobStarHeader } from "../Header/header";
import { mockProfiles } from "../Profile/mockProfiles";
import { Profile, ProfilePage } from "../Profile/profile";
import { AddAchievementPage } from "../Achievements/addAchievement";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "../_components/Routes";
import { Home } from "../Home/home";


const Homepage: FC<any> = (): ReactElement => {

    interface AppState {
        achievements: Achievement[]
        displayedProfile: Profile | null,
    }

    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {
                /**
                 * <Typography variant="h5">Home</Typography>
                 * **/
            }
            
        </Box>
    );
};

export default Homepage;
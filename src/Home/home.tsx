import { Grid, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ProfileSearchField } from "../ProfileSearchField/profileSearchField";
import { Achievement, LatestAchievementsView } from "../Achievements/achievements";
import { JobStarHeader } from "../Header/header";

function Welcome() {
    return <Box>
        <h2>Welcome</h2>
    </Box>
}

export interface HomeProps {
    achievements: Achievement[],
    handleProfileSearchFieldChange: (value: any) => void
}

export function Home(props: HomeProps) {
    return <Box>
        <JobStarHeader></JobStarHeader>
        <Grid container>
            <Grid item xs={6}>
                <Welcome></Welcome>
            </Grid>
            <Grid item xs={6}>
                <LatestAchievementsView achievements={props.achievements}></LatestAchievementsView>
            </Grid>
            <Grid item xs={6}>
                <ProfileSearchField handleChange={value => props.handleProfileSearchFieldChange(value)}></ProfileSearchField>
            </Grid>
        </Grid>
    </Box>
}
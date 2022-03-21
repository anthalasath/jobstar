import { Button, Grid, Paper } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box } from "@mui/system";

export interface JobStarHeaderProps {

}

export function JobStarHeader(props: JobStarHeaderProps) {
    const header = <Grid container spacing={0}>
        <Grid item xs={10}>
            <h1>JobStars</h1>
        </Grid>
        <Grid item xs={1}>
            <SettingsIcon sx={{ fontSize: 30 }}></SettingsIcon>
        </Grid>
        <Grid item xs={1}>
            <Button variant="outlined">Connect</Button>
        </Grid>
        <Grid item xs={8}>
            <p>Share love with jobs</p>
        </Grid>
        <Grid item xs={4}>
            <Button variant="outlined">Add an Achievement</Button>
        </Grid>
    </Grid>
    return <CenteredPage element={header}></CenteredPage>
}

function CenteredPage(props: { element: JSX.Element }) {
    return <Grid container spacing={0}>
        <Grid item xs={4}>
        </Grid>
        <Grid item xs={4}>
            {props.element}
        </Grid>
        <Grid item xs={4}>
        </Grid>
    </Grid>
}
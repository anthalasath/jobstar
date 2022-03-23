import { FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Stack } from "@mui/material";
import { Profile } from "../Profile/profile";
import CircleIcon from '@mui/icons-material/Circle';

export interface Login {
    address: string
    profiles: Profile[]
}

export interface LoginPageProps {
    login: Login
}

export function LoginPage(props: LoginPageProps) {
    return <Grid container spacing={2}>
        <Grid xs={4}></Grid>
        <Grid xs={4}>
            <Paper>
                <h3>Logged in with</h3>
                <p>{props.login.address}</p>
            </Paper>
            <Paper>
                <h3>Please choose your lens profile</h3>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={props.login.profiles[0].handle}
                        name="radio-buttons-group"
                    >
                        {props.login.profiles.map(p => {
                            return <FormControlLabel value={p.handle} control={<Radio />} label={p.handle} />
                        })}
                    </RadioGroup>
                </FormControl>

            </Paper>
        </Grid>
        <Grid xs={4}></Grid>
    </Grid>
}
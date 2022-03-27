import * as React from "react";
import { Box, Button, Grid, Paper, Avatar } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Profile } from "../Profile/profile";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import * as ethers from "ethers";
import { connectProvider } from "../utils";

export interface JobStarHeaderProps {
    handleJobStarClick: () => void
    handleAddAchievementClick: () => void
    handleProfileClick: (profile: Profile) => void
    connectedProfiles: Profile[]
    signer?: ethers.ethers.providers.JsonRpcSigner
    handleProviderConnected(value: ethers.ethers.providers.JsonRpcSigner): void
}

export class JobStarHeader extends React.Component<JobStarHeaderProps, {}> {

    renderAvatar() {
        if (this.props.signer) {
            if (this.props.connectedProfiles.length > 0) {
                return <Button onClick={() => this.props.handleProfileClick(this.props.connectedProfiles[0])}>
                    <Avatar alt="avatar" src={this.props.connectedProfiles[0].imageURI} sx={{ height: 50, width: 50 }}></Avatar>
                </Button>
            } else {
                return <Button onClick={() => {}}>
                    <Avatar alt="avatar" src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png" sx={{ height: 50, width: 50 }}></Avatar>
                </Button>
            }
        } else {
            return <ConnectProviderButton handleConnected={this.props.handleProviderConnected}></ConnectProviderButton>
        }
    }

    render() {
        const header = <Box sx={{
            mt: "-70px"
        }}>
            <Grid container spacing={0}>
                <Grid item xs={8}>
                    <Button variant="text" sx={{ color: "white", mt: "10px" }}
                        onClick={this.props.handleJobStarClick}>
                        <HomeIcon />
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => this.props.handleAddAchievementClick()}>
                        <AddCircleIcon sx={{ fontSize: 50 }} color="success"></AddCircleIcon>
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    {this.renderAvatar()}
                </Grid>
            </Grid>
        </Box>
        return <CenteredPage element={header}></CenteredPage>
    }
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

interface ConnectProviderButtonProps {
    handleConnected: (value: ethers.ethers.providers.JsonRpcSigner) => void;
}

function ConnectProviderButton(props: ConnectProviderButtonProps) {
    return <Button onClick={() => {
        connectProvider()
            .then(props.handleConnected);
    }}>
        <Avatar alt="connect button" sx={{ height: 50, width: 50 }}></Avatar>
    </Button>;
}

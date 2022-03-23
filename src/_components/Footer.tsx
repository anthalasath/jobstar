// src/componetns/Footer.tsx

import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FOOTER_TEXT, APP_TITLE } from "../constants";
export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
            { FOOTER_TEXT }
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
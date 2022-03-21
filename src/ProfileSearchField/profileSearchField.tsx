import { TextField } from "@mui/material";

export function ProfileSearchField(props: { handleChange: (value: any) => void }) {
    return (
      <TextField
        id="outlined-basic"
        label="Search by handle"
        variant="outlined"
        onChange={(value) => props.handleChange(value)}
      />
    );
  }
  
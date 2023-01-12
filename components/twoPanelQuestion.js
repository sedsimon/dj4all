import { Unstable_Grid2 as Grid, Box } from "@mui/material";

export default function TwoPanelQuestion() {
  return (
    <Grid container spacing={2} columns={13}>
      <Grid xs={6}>
        <Box sx={{textAlign: "center"}}>
          Question Text
        </Box>
      </Grid>
      <Grid>i</Grid>
      <Grid xs={6}>
        <Box sx={{textAlign: "center"}}>
          Question Inputs
        </Box>
      </Grid>
    </Grid>
  )
}
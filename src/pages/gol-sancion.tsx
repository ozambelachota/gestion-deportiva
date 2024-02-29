import { Grid } from "@mui/material";
import TablaGolesComponent from "../components/tabla-goles";
import TablaSancion from "../components/tabla-sancion";

function GolSancionPage() {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TablaGolesComponent />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TablaSancion />
        </Grid>
      </Grid>
    </>
  );
}

export default GolSancionPage;

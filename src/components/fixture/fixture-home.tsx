import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { TableFixtureAdmin } from "./table-fixture-admin";

function FixtureHome() {
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Fixture
      </Typography>
      <Button
        variant="contained"
        sx={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          width: "200px",
          height: "40px",
        }}
        component={Link}
        startIcon={<Add />}
        color="success"
        to="/admin/fixture/create"
      >
        Crear Fixture
      </Button>
      <Box>
        <TableFixtureAdmin />
      </Box>
    </div>
  );
}

export default FixtureHome;

import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { TableFixtureAdmin } from "./table-fixture-admin";
import { Add } from "@mui/icons-material";

function FixtureHome() {
  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Fixture
      </Typography>
      <Button
        variant="contained"
        sx={{ margin: "20px 0" }}
        component={Link}
        startIcon={<Add />}
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

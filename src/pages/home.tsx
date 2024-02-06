import { Suspense, lazy } from "react";

import { Box, LinearProgress } from "@mui/material";

const LazyTablaFixture = lazy(() => import("../components/tabla-fixture"));

export default function Home() {
  return (
    <div>
      <Suspense
        fallback={
          <Box sx={{ display: "flex" }}>
            <LinearProgress />
          </Box>
        }
      >
        <LazyTablaFixture />
      </Suspense>
    </div>
  );
}

import { Suspense, lazy } from "react";

import { CircularProgress } from "@mui/material";

const LazyTablaFixture = lazy(() => import("../components/tabla-fixture"));

export default function Home() {
  return (
    <div>
      <Suspense fallback={<CircularProgress />}>
        <LazyTablaFixture />
      </Suspense>
    </div>
  );
}

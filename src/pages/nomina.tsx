import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PromocionStore } from "../store/promocionales.store";

function NominaPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const promocionales = PromocionStore((state) => state.promocionales);
  const getPromocionalesId = PromocionStore(
    (state) => state.getPromocionalesId
  );

  useEffect(() => {
    getPromocionalesId(Number(id));
  }, [id]);
  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center" }}>Nomina de jugadores</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Jugador</TableCell>
              <TableCell align="center">N° de goles</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promocionales.map((promocion) => (
              <TableRow key={promocion.id}>
                <TableCell align="center">
                  {promocion.nombre_promocional}
                </TableCell>
                <TableCell align="center">{promocion.n_goles}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      navigate(`/admin/nomina/edit/${promocion.id}`);
                    }}
                  >
                    editar jugador
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default NominaPage;

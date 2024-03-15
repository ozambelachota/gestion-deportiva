import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { fixtureStore } from "../store/fixture.store";
import { useSancionGolStore } from "../store/sancion-gol.store";

function TablaSancion() {
  const sancion = useSancionGolStore((state) => state.sancion);
  const getSanciones = useSancionGolStore((state) => state.getSancion);
  const promociones = fixtureStore((state) => state.promocionParticipante);
  const getPromociones = fixtureStore((state) => state.obtenerPromociones);
  const tipo = useSancionGolStore((state) => state.tipoSancion);
  const getTipoSancion = useSancionGolStore((state) => state.getTipoSancion);
  const redCardStyle = "bg-red-500 text-white rounded-full px-2";
  const yellowCardStyle = "bg-yellow-500 text-black rounded-full px-2";

  useEffect(() => {
    getSanciones();
    getPromociones();
    getTipoSancion();
  }, []);

  return (
    <>
      <Typography variant="h4" margin={4} align="center">
        Tabla de Sanciones
      </Typography>
      <TableContainer component={Paper} sx={{bgcolor:'blue'}}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Jugador</TableCell>
              <TableCell align="center">PROMOCION</TableCell>
              <TableCell align="center">Sanción</TableCell>
              <TableCell align="center">
                cantidad de tarjetas amarillas
              </TableCell>
              <TableCell align="center">cantidad de tarjetas rojas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sancion.map((sancion) => {
              const promocion = promociones.find(
                (promocion) => promocion.id === sancion.promocion_id
              );
              const tipoId = tipo.find(
                (tipo) => sancion.tipo_sancion === tipo.id
              );
              return (
                <TableRow key={sancion.id}>
                  <TableCell align="center">
                    {sancion.nombre_promocion}
                    {sancion.cant_tarjeta_roja > 0 && (
                      <div className={redCardStyle}>Tarjeta Roja</div>
                    )}
                    {sancion.cant_tarjeta_amarilla > 0 && (
                      <div className={yellowCardStyle}>Tarjeta Amarilla</div>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {promocion?.nombre_promocion}
                  </TableCell>
                  <TableCell align="center">{tipoId?.nombre_tipo}</TableCell>
                  <TableCell align="center">
                    {sancion.cant_tarjeta_amarilla}
                  </TableCell>
                  <TableCell align="center">
                    {sancion.cant_tarjeta_roja}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TablaSancion;

import {
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
  useEffect(() => {
    getSanciones();
    getPromociones();
    getTipoSancion();
  }, []);

  return (
    <>
      <Typography variant="h6">Tabla de Sanciones</Typography>
      <TableContainer>
        <Table>
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

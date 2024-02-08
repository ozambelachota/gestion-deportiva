import {
  Button,
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
import { Link } from "react-router-dom";
import { fixtureStore } from "../store/fixture.store";

const ListPromociones = () => {
  const {
    promocionParticipante,

    obtenerPromociones,
    grupo,
    obtenerGrupo,
  } = fixtureStore();

  promocionParticipante.sort((a, b) => a.id - b.id);

  useEffect(() => {
    obtenerPromociones();
    obtenerGrupo();
  }, [obtenerPromociones, obtenerGrupo]);

  return (
    <>
      <Typography variant="h2">Promocionales afiliados</Typography>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Fecha de Admisión</TableCell>
              <TableCell align="right">Deporte</TableCell>
              <TableCell align="right">Nombre de la Promoción</TableCell>
              <TableCell align="right">GRUPO</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promocionParticipante.map((promocion, index) => {
              const grupoFiltter = grupo.filter(
                (grupo) => grupo.id == promocion.grupo_id
              );
              return (
                <TableRow key={promocion.id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">
                    {promocion.estado ? "Activo" : "Inactivo"}
                  </TableCell>
                  <TableCell align="right">
                    {promocion.create_at
                      ? new Date(promocion.create_at).toLocaleString()
                      : ""}
                  </TableCell>
                  <TableCell align="right">
                  
                  </TableCell>
                  <TableCell align="right">
                    {promocion.nombre_promocion}
                  </TableCell>
                  <TableCell align="right">
                    {grupoFiltter.map((grupo) => grupo.nombre_grupo)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      sx={{ background: "#ff00dd" }}
                      component={Link}
                      to={`create/${promocion.id}`}
                    >
                      Registrar promociones
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ListPromociones;

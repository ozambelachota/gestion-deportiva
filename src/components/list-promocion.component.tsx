import { Add } from "@mui/icons-material";
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
import DeporteStore from "../store/deporte.store";
import { fixtureStore } from "../store/fixture.store";

const ListPromociones = () => {
  const { promocionParticipante, obtenerPromociones, grupo, obtenerGrupo } =
    fixtureStore();
  const deportes = DeporteStore((state) => state.deportes);
  const getDeportes = DeporteStore((state) => state.getDeporte);
  promocionParticipante.sort((a, b) => a.id - b.id);
  useEffect(() => {
    obtenerPromociones();
    getDeportes();
    obtenerGrupo();
  }, []);

  return (
    <>
      <Typography variant="h2">Promocionales afiliados</Typography>
      <Button
        color="success"
        sx={{ margin: "20px 0" }} 
        component={Link}
        to="/admin/promocion/create"
        variant="contained"
        startIcon={<Add />}
      >INSCRIBIR NUEVO PARTICIPANTE</Button>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Nombre de la Promoción</TableCell>
              <TableCell align="right">Grupo</TableCell>
              <TableCell align="right">Deporte</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promocionParticipante.map((promocion, index) => {
              const grupoFiltter = grupo.filter(
                (grupo) => grupo.id == promocion.grupo_id
              );

              const deporte = deportes.filter(
                (deporte) => deporte.id == promocion.tipo_id
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
                    {promocion.nombre_promocion}
                  </TableCell>
                  <TableCell align="right">
                    {grupoFiltter.map((grupo) => grupo.nombre_grupo)}
                  </TableCell>
                  <TableCell align="right">
                    {deporte.map((deporte) => deporte.nombre_tipo)}
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

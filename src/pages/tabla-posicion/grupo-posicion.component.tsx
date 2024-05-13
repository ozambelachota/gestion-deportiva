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
import { useNavigate, useParams } from "react-router-dom";
import { PosicionStore } from "../../store/PosicionStore";

function GrupoPosicionComponents() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getPosicionGrupo = PosicionStore((state) => state.getPosicionGrupo);
  const promocionPosicion = PosicionStore((state) => state.tablaPosicionGrupo);
  useEffect(() => {
    getPosicionGrupo(Number(id));
  }, [id]);
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Tabla de posisiones
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Promocion</TableCell>
              <TableCell align="center">Puntos</TableCell>
              <TableCell align="center">Goles a favor</TableCell>
              <TableCell align="center">Goles en contra</TableCell>
              <TableCell align="center">Diferencia de goles</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promocionPosicion.map((promocion) => {
              return (
                <TableRow key={promocion.id}>
                  <TableCell align="center">
                    {promocion.promocion_participante.nombre_promocion}
                  </TableCell>
                  <TableCell align="center">{promocion.puntos}</TableCell>
                  <TableCell align="center">{promocion.goles_f}</TableCell>
                  <TableCell align="center">{promocion.goles_e}</TableCell>
                  <TableCell align="center">
                    {promocion.diferencia_goles}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="success"
                      sx={{ margin: "20px 0" }}
                      variant="contained"
                      onClick={() => {
                        navigate(`/admin/posicion/edit/grupo/${promocion.id}`);
                      }}
                    >
                      EDITAR
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
}

export default GrupoPosicionComponents;

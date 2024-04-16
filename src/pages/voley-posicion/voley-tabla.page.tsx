import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormEditVoleyPosicion from "./components/form-edited.component";
import { useVoleyStore } from "./store/Voley.store";

export const TablaVoleyPage = () => {
  const { deporte } = useParams();
  const { voleys, getVoley } = useVoleyStore();
  const { setVoley } = useVoleyStore();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getVoley(Number(deporte));
    console.log(voleys);
  }, [deporte]);

  return (
    <div>
      <Typography variant="h3">
        Tabla de posicion de {deporte == "2" ? "Voley femenino" : "Voley mixto"}
      </Typography>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Promocion</TableCell>
                <TableCell align="center">Puntos</TableCell>
                <TableCell align="center">Partidos jugados</TableCell>
                <TableCell align="center">Partidos ganados</TableCell>
                <TableCell align="center">Partidos perdidos</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {voleys.map((promocion) => {
                return (
                  <TableRow key={promocion.id}>
                    <TableCell align="center">
                      {promocion.promocion_participante?.nombre_promocion}
                    </TableCell>
                    <TableCell align="center">{promocion.puntos}</TableCell>
                    <TableCell align="center">{promocion.partidos_j}</TableCell>
                    <TableCell align="center">{promocion.partidos_g}</TableCell>
                    <TableCell align="center">{promocion.partidos_p}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          setVoley(promocion);
                          setOpenModal(true);
                        }}
                      >
                        editar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <>
          <FormEditVoleyPosicion />
        </>
      </Modal>
    </div>
  );
};

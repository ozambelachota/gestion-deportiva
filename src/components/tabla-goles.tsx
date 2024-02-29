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

function TablaGolesComponent() {
  const goles = useSancionGolStore((state) => state.goleadoor);
  const getGoles = useSancionGolStore((state) => state.getGoles);
  const promocionParticipante = fixtureStore(
    (state) => state.promocionParticipante
  );
  const getPromociones = fixtureStore((state) => state.obtenerPromociones);
  useEffect(() => {
    getGoles();
    getPromociones();
  }, []);

  const groupByPromocion = (array: any[], key: string) => {
    if (!array) {
      return {};
    }

    return array.reduce((result, currentValue) => {
      const groupKey = currentValue[key];
      (result[groupKey] = result[groupKey] || []).push(currentValue);
      return result;
    }, {});
  };

  const groupsGoles = groupByPromocion(goles, "id_promocion_participante");

  return (
    <>
      {Object.keys(groupsGoles).map((promocionId) => (
        <div key={promocionId}>
          <Typography variant="h4">
            Tabla de goleadores - Promoción{" "}
            {promocionParticipante.map((promocion) =>
              promocion.id === Number(promocionId)
                ? promocion.nombre_promocion
                : ""
            )}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Número de Goles</TableCell>
                  <TableCell>Promocional</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupsGoles[promocionId]
                  .filter((goleador: any) => goleador.n_goles > 0)
                  .map((goleador: any) => {
                    const promocion = promocionParticipante.find(
                      (promocion) =>
                        promocion.id === goleador.id_promocion_participante
                    );
                    return (
                      <TableRow key={goleador.id}>
                        <TableCell>{goleador.nombre_promocional}</TableCell>
                        <TableCell>{goleador.n_goles}</TableCell>
                        <TableCell>{promocion?.nombre_promocion}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </>
  );
}

export default TablaGolesComponent;

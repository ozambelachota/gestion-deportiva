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
import { PromocionParticipante, Promocional } from "../types/fixture.api.type";

const colorPalette = [
  "#317f43",
  "#495e76",
  "#FF1493",
  "#FFA500",
  "#746e5d",
  "#D400FF",
  "#FF0000",
];

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

  const groupsGoles = groupByPromocion(promocionParticipante, "grupo_id");

  return (
    <>
      {Object.keys(groupsGoles).map((promocionId) => (
        <div key={promocionId} className=" my-7">
          <Typography
            variant="h3"
            sx={{
              color: colorPalette[parseInt(promocionId) - 1],
              textShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
            }}
            className="text-center font-semibold"
          >
            Grupo {promocionId}
          </Typography>
          <TableContainer component={Paper}>
            <Table
              sx={{
                bgcolor: colorPalette[parseInt(promocionId) - 1],
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Número de Goles</TableCell>
                  <TableCell>Promocional</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupsGoles[promocionId].map(
                  (participante: PromocionParticipante) => {
                    const promocion: Promocional[] = [];
                    goles.forEach((gol) => {
                      if (
                        gol.n_goles > 0 &&
                        participante.id === gol.id_promocion_participante
                      ) {
                        promocion.push(gol);
                      }
                    });
                    promocion.sort((a, b) => b.n_goles - a.n_goles);

                    return promocion?.map((promocion) => (
                      <TableRow key={promocion.id}>
                        <TableCell>{promocion.nombre_promocional}</TableCell>
                        <TableCell>{promocion.n_goles}</TableCell>
                        <TableCell>{participante.nombre_promocion}</TableCell>
                      </TableRow>
                    ));
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </>
  );
}

export default TablaGolesComponent;

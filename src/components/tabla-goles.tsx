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
import { useSancionGolStore } from "../store/sancion-gol.store";
import { PromocionalWithParticipante } from "../types/fixture.api.type";

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
  const getPromocionWithParticipante = useSancionGolStore(
    (state) => state.getPromocionWithParticipante
  );

  const promocionWithParticipante = useSancionGolStore(
    (state) => state.promocionWithParticipante
  );

  useEffect(() => {
    getPromocionWithParticipante();
  }, []);

  const groupByPromocion = (
    array: PromocionalWithParticipante[],
    _key: string
  ) => {
    if (!array) {
      return {};
    }

    return array.reduce((result, currentValue) => {
      const groupKey = currentValue.promocion_participante.grupo_id.toString(); // Convertir a cadena para usar como clave
      (result[groupKey] = result[groupKey] || []).push(currentValue);
      return result;
    }, {} as { [key: string]: PromocionalWithParticipante[] });
  };

  const groupedData = groupByPromocion(
    promocionWithParticipante,
    "promocion_participante.grupo_id"
  );

  return (
    <>
      {Object.entries(groupedData).map(([grupoId, data]) => (
        <>
          <Typography
            key={grupoId}
            variant="h4"
            sx={{
              textAlign: "center",
              margin: "20px 0",
              color: colorPalette[Number(grupoId) - 1], 
              textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
              boxShadow: "0 0 10px 0 rgba(255, 255, 255, 0.5)", 
            }}
          >
            Grupo {grupoId}
          </Typography>
          <TableContainer
            sx={{ bgcolor: colorPalette[Number(grupoId) - 1] }}
            key={grupoId}
            component={Paper}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre Promocional</TableCell>
                  <TableCell>Número de Goles</TableCell>
                  <TableCell>Nombre de Promoción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id_promocion_participante}>
                    <TableCell>{item.nombre_promocional}</TableCell>
                    <TableCell>{item.n_goles}</TableCell>
                    <TableCell>
                      {item.promocion_participante.nombre_promocion}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ))}
    </>
  );
}

export default TablaGolesComponent;

import { Download } from "@mui/icons-material";
import {
  Box,
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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
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

  const [currentGroup, setCurrentGroup] = useState<number>(() => {
    const storedGroup = localStorage.getItem("currentGroupGoles");
    return storedGroup ? Number(storedGroup) : 1;
  });

  useEffect(() => {
    getPromocionWithParticipante();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentGroupGoles", currentGroup.toString());
  }, [currentGroup]);

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

  const handleGroupChange = (group: number) => {
    setCurrentGroup(group);
  };

  const handleDownloadPDF = (groupId: number) => {
    const doc = new jsPDF();
    const tableData = groupedData[groupId].map((item) => [
      item.nombre_promocional,
      item.n_goles,
      item.promocion_participante.nombre_promocion,
    ]);

    doc.text(`EXAFAM 2024-2025 - Grupo ${groupId}`, 10, 10);
    autoTable(doc, {
      head: [["Nombre Promocional", "Número de Goles", "Nombre de Promoción"]],
      body: tableData,
      startY: 20,
    });

    doc.save(`Grupo_${groupId}_Goles.pdf`);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        {[1, 2, 3, 4, 5, 6, 7].map((group) => (
          <Button
            key={group}
            variant={currentGroup === group ? "contained" : "outlined"}
            onClick={() => handleGroupChange(group)}
            sx={{ mx: 1 }}
          >
            Grupo {group}
          </Button>
        ))}
      </Box>
      <Button
        color="success"
        variant="contained"
        onClick={() => handleDownloadPDF(currentGroup)}
      >
        <Download /> Descargar PDF
      </Button>
      <div className="w-full h-full">
        {Object.entries(groupedData)
          .filter(([grupoId]) => Number(grupoId) === currentGroup)
          .map(([grupoId, data]) => (
            <div key={`group-${grupoId}`}>
              {" "}
              {/* Clave única aquí */}
              <Typography
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
                      <TableRow
                        key={`${grupoId}-${item.id_promocion_participante}-${item.nombre_promocional}`}
                      >
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
            </div>
          ))}
        {Object.keys(groupedData).length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            <Typography variant="h4" color={"blueviolet"} margin={"4rem"}>
              No hay datos de tabla de posiciones disponibles
            </Typography>
          </Box>
        )}
      </div>
    </>
  );
}

export default TablaGolesComponent;

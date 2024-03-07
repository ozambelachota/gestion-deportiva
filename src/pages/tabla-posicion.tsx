import { Download } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useEffect } from "react";
import { PosicionStore } from "../store/PosicionStore";
import { fixtureStore } from "../store/fixture.store";
import { type TablaPosicion } from "../types/fixture.api.type";
import PDFGenerator from "./report/components/tabla-reporte.component";
const colorPalette = [
  "#4285f4",
  "#34a853",
  "#fbbc05",
  "#ea4335",
  "#673ab7",
  "#e91e63",
  "#795548",
];

const TablaPosicionPage: React.FC = () => {
  const tablaPosicion = PosicionStore((state) => state.tablaPosicion);
  const uploadTablaPosicion = PosicionStore(
    (state) => state.uploadTablaPosicion
  );
  const promociones = fixtureStore((state) => state.promocionParticipante);
  const getPromociones = fixtureStore((state) => state.obtenerPromociones);
  useEffect(() => {
    getPromociones();
    uploadTablaPosicion();
  }, []);

  const promocionesFilter = promociones.filter(
    (promocion) => promocion.tipo_id === 1
  );
  const groupBy = (array: TablaPosicion[] | null, key: string) => {
    if (!array) {
      return {};
    }

    const sortedArray = array.sort((a, b) => {
      if (b.puntos !== a.puntos) {
        return b.puntos - a.puntos; // Ordenar por puntos de mayor a menor
      } else {
        return b.diferencia_goles - a.diferencia_goles; // Si los puntos son iguales, ordenar por diferencia de goles
      }
    });

    return sortedArray.reduce((result, currentValue: any) => {
      const groupKey = currentValue[key];
      // rome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      (result[groupKey] = result[groupKey] || []).push(currentValue);
      return result;
    }, {} as { [key: string]: TablaPosicion[] });
  };

  const groupsTabla = groupBy(tablaPosicion, "grupo_id");

  return (
    <div className="w-full h-full">
      <PDFDownloadLink
        document={
          <PDFGenerator
            groupsTabla={groupsTabla}
            promocionesFilter={promocionesFilter}
          />
        }
        fileName="tbl_posicion"
      >
        {({ loading, error }) => {
          if(error){
            return <div>{error.message}</div>
          }
          
          return loading ? (
            "Cargando..."
          ) : (
            <Button>
              <Download /> Descargar
            </Button>
          );
        }}
      </PDFDownloadLink>
      {Object.keys(groupsTabla).map((grupoId, index) => (
        <Grid container spacing={2} key={grupoId}>
          <Grid item xs={12}>
            <Typography marginTop={"8px"} textAlign={"center"} variant="h5">
              Tabla de Posiciones - Grupo {grupoId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              component={Paper}
              className="rounded"
              sx={{
                background: colorPalette[index],
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Equipo</TableCell>
                    <TableCell>Puntos</TableCell>
                    <TableCell>Goles a favor</TableCell>
                    <TableCell>Goles en contra</TableCell>
                    <TableCell>Diferencia de goles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupsTabla[grupoId].map((equipo) => {
                    const filter = promocionesFilter.filter(
                      (promocion) => promocion.id === equipo.promocion
                    );
                    return (
                      <TableRow key={equipo.id}>
                        <TableCell>
                          {filter.map(
                            (promocion) => promocion.nombre_promocion
                          )}
                        </TableCell>
                        <TableCell>{equipo.puntos}</TableCell>
                        <TableCell>{equipo.goles_f}</TableCell>
                        <TableCell>{equipo.goles_e}</TableCell>
                        <TableCell>{equipo.diferencia_goles}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ))}
      {Object.keys(groupsTabla).length === 0 && (
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
  );
};

export default TablaPosicionPage;

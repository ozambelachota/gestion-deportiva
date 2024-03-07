import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import type {
  PromocionParticipante,
  TablaPosicion,
} from "../../../types/fixture.api.type";

interface Props {
  groupsTabla: any;
  promocionesFilter: PromocionParticipante[];
}
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    backgroundColor: "#e0e0e0",
  },
  tableRow: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  tableCell: {
    padding: 5,
    textAlign: "center",
    flexGrow: 1,
  },
});
const PDFGenerator = ({ groupsTabla, promocionesFilter }: Props) => {
  return (
    <Document>
      {Object.keys(groupsTabla).map((grupoId: any) => (
        <Page key={grupoId} size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Tabla de Posiciones - Grupo {grupoId}
            </Text>
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell]}>Equipo</Text>
                <Text style={[styles.tableCell]}>Puntos</Text>
                <Text style={[styles.tableCell]}>Goles a favor</Text>
                <Text style={[styles.tableCell]}>Goles en contra</Text>
                <Text style={[styles.tableCell]}>Diferencia de goles</Text>
              </View>
              {groupsTabla[grupoId].map((equipo: TablaPosicion) => (
                <View key={equipo.id} style={styles.tableRow}>
                  <Text style={[styles.tableCell]}>
                    {promocionesFilter
                      .filter((promocion) => promocion.id === equipo.promocion)
                      .map((promocion) => promocion.nombre_promocion)}
                  </Text>
                  <Text style={[styles.tableCell]}>{equipo.puntos}</Text>
                  <Text style={[styles.tableCell]}>{equipo.goles_f}</Text>
                  <Text style={[styles.tableCell]}>{equipo.goles_e}</Text>
                  <Text style={[styles.tableCell]}>
                    {equipo.diferencia_goles}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default PDFGenerator;

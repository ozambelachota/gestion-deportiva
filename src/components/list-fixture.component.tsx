import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Fixture } from "../types/fixture.api.type";

export const ListFixture = ({vsPromocion}:{ vsPromocion: Fixture[]}) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipo 1</TableCell>
              <TableCell>VS</TableCell>
              <TableCell>Equipo 2</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>CAMPO</TableCell>
              <TableCell>Ronda</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vsPromocion.map((promocion, index) => (
              <TableRow key={index}>
                <TableCell>{promocion.promocion}</TableCell>
                <TableCell>VS</TableCell>
                <TableCell>{promocion.vs_promocion}</TableCell>
                <TableCell>
                  {promocion.fecha_partido.toLocaleString()}
                </TableCell>
                <TableCell>{promocion.campo_id}</TableCell>
                <TableCell>{"ronda n° " + promocion.n_fecha_jugada}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

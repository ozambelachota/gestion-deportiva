import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { Fixture, PromocionParticipante } from "../types/fixture.api.type";
import { toast } from "sonner";

type ListFixtureProps = {
  vsPromocion: Fixture[];
  promociones: PromocionParticipante[];
  onEdit: (index: number, equipo1: string, equipo2: string) => void;
};

export const ListFixture = ({
  vsPromocion,
  promociones,
  onEdit,
}: ListFixtureProps) => {
  const [editMode, setEditMode] = useState<number | null>(null);

  const handleEditClick = (index: number) => {
    setEditMode((prevMode) => (prevMode === index ? null : index));
  };

  const handleSaveClick = (index: number) => {
    setEditMode(null);
    const editedTeam1 = vsPromocion[index].promocion;
    const editedTeam2 = vsPromocion[index].vs_promocion;
    if(editedTeam1==editedTeam2){
      toast.error("Los equipos no pueden ser iguales");
      return;
    }
    onEdit(index, editedTeam1, editedTeam2);
  };

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
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vsPromocion.map((promocion, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Select
                    value={promocion.promocion}
                    onChange={(e) =>
                      onEdit(
                        index,
                        e.target.value as string,
                        promocion.vs_promocion
                      )
                    }
                    disabled={editMode !== index}
                  >
                    {promociones.map(({ id, nombre_promocion }) => (
                      <MenuItem key={id} value={nombre_promocion}>
                        {nombre_promocion}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>VS</TableCell>
                <TableCell>
                  <Select
                    value={promocion.vs_promocion}
                    onChange={(e) => {
                      const newTeam = e.target.value as string;
                      onEdit(index, promocion.promocion, newTeam);
                    }}
                    disabled={editMode !== index}
                  >
                    {promociones.map(({ id, nombre_promocion }) => (
                      <MenuItem key={id} value={nombre_promocion}>
                        {nombre_promocion}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  {promocion.fecha_partido.toLocaleString()}
                </TableCell>
                <TableCell>{promocion.campo_id}</TableCell>
                <TableCell>{`ronda n° ${promocion.n_fecha_jugada}`}</TableCell>
                <TableCell>
                  {editMode === index ? (
                    <Button onClick={() => handleSaveClick(index)}>
                      Guardar
                    </Button>
                  ) : (
                    <Button onClick={() => handleEditClick(index)}>
                      Editar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

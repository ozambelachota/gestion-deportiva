import {
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers-pro";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { CampoStore } from "../store/campo.store";
import { Fixture, PromocionParticipante } from "../types/fixture.api.type";
type ListFixtureProps = {
  vsPromocion: Fixture[];
  promociones: PromocionParticipante[];
  onEdit: (index: number, equipo1: string, equipo2: string, fecha: Date, campo: number) => void;
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
  const campos = CampoStore((state) => state.campos);

  const handleSaveClick = (index: number) => {
    setEditMode(null);
    const editedTeam1 = vsPromocion[index].promocion;
    const editedTeam2 = vsPromocion[index].vs_promocion;
    const editedDate = vsPromocion[index].fecha_partido;
    const editedCampo = vsPromocion[index].campo_id;

    if (editedTeam1 === editedTeam2) {
      toast.error("Los equipos no pueden ser iguales");
      return;
    }

    onEdit(index, editedTeam1, editedTeam2, editedDate, editedCampo);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Equipo 1</TableCell>
              <TableCell>VS</TableCell>
              <TableCell>Equipo 2</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>CAMPO</TableCell>
              <TableCell>Ronda</TableCell>
              <TableCell>GRUPO</TableCell>
              <TableCell>Deporte</TableCell>
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
                        promocion.vs_promocion,
                        promocion.fecha_partido,
                        promocion.campo_id
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
                      onEdit(index, promocion.promocion, newTeam, promocion.fecha_partido, promocion.campo_id);
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
                <DateTimePicker
    value={promocion.fecha_partido}
    onChange={(newDate) => {
      if (!newDate) return;
      onEdit(index, promocion.promocion, promocion.vs_promocion, newDate, promocion.campo_id);
    }}
    disabled={editMode !== index}

  />
                </TableCell>
                <TableCell>
                  <Select
                    value={promocion.campo_id}
                    onChange={(e) => {
                      const newCampo = parseInt(e.target.value as string);
                      onEdit(index, promocion.promocion, promocion.vs_promocion, promocion.fecha_partido, newCampo);
                    }}
                    disabled={editMode !== index}
                  >
                    {campos.map(({id_campo, nombre_campo }) => (
                      <MenuItem key={id_campo} value={id_campo}>
                        {nombre_campo}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>{`ronda n° ${promocion.n_fecha_jugada}`}</TableCell>
                <TableCell>{promocion.grupo_id}</TableCell>
                <TableCell>{promocion.deporte_id}</TableCell>
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
      <Toaster position="top-center" duration={3000} />
    </>
  );
};
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSancionGolStore } from "../store/sancion-gol.store";
import { ListaSancion } from "../types/fixture.api.type";

interface Props {
  id: number;
}

function FormEditSaancionComponent({ id }: Props) {
  const jugadorSancionadoById = useSancionGolStore(
    (state) => state.jugadorSancionadoById
  );
  const tipoSancion = useSancionGolStore((state) => state.tipoSancion);
  const getTipoSancion = useSancionGolStore((state) => state.getTipoSancion);
  const sancionadoId = useSancionGolStore((state) => state.sancionadoId);
  useEffect(() => {
    jugadorSancionadoById(id);
    getTipoSancion();
  }, [sancionadoId]);

  const [sancionado, setSancionado] = useState<ListaSancion>(sancionadoId);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSancionado({ ...sancionado, [name]: value });
  };

  return (
    <Box className="bg-slate-900 flex  flex-col m-2 my-4 justify-center items-center w-full h-full">
      <Typography variant="h4">Editando al jugador sancionado</Typography>
      <form>
        <FormControl fullWidth className="my-2">
          <TextField
            name="nombre_promocion"
            variant="filled"
            disabled
            className="my-3"
            value={sancionadoId.nombre_promocion}
          />
        </FormControl>
        <FormControl fullWidth className="my-2">
          <Select name="sancionado_id">
            <MenuItem value={0}>Ninguno</MenuItem>
            {tipoSancion.map((tipo) => (
              <MenuItem key={tipo.id} value={sancionadoId.id}>
                {tipo.nombre_tipo + "-" + tipo.cantidad_fecha}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className="my-2">
          <TextField
            name="cant_tarjeta_amarilla"
            variant="standard"
            type="number"
            value={sancionadoId.cant_tarjeta_amarilla}
          />
        </FormControl>
        <FormControl fullWidth className="my-2">
          <TextField
            id="cant_tarjeta_roja"
            name="cant_tarjeta_roja"
            variant="standard"
            type="number"
            value={sancionadoId.cant_tarjeta_roja}
          />
        </FormControl>
      </form>
    </Box>
  );
}

export default FormEditSaancionComponent;

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers-pro";
import { useFixturePage } from "../hooks/useFixture.hook";

function FormFixture() {
  const {
    emparejamiento,
    deporteSelect,
    deportes,
    numeroFechaJugados,
    selectGrupo,
    campoSelect,
    fecha,
    setFecha,
    grupos,
    campos,
    handleChangeEmparejamiento,
    selectDeporte,
    handleChangeSelectGrupo,
    handleChangeSelectCampo,
    setNumeroFechaJugados,
    handleGeneratePartido,
    handleSavePartido,
    handleChangeEquipo1,
    handleChangeEquipo2,
    equipo1,
    equipo2,
    promocionesFiltradas,
    
  } = useFixturePage();

  return (
    <>
      <Typography variant="h4" textAlign={"center"}>
        Generar partidos
      </Typography>
      <Box
      
        sx={{
          border: "1px solid #fff",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#002200",
                    display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "600px", // Ajusta el valor según tus necesidades
          margin: "auto", // Centra la caja horizontalmente
        }}
      >
        {/* Primera fila */}
        <div className="" style={{ display: "flex", alignItems: "center" }}>
          <RadioGroup
            row
            aria-label="tipo-emparejamiento"
            name="tipo-emparejamiento"
            value={emparejamiento}
            onChange={handleChangeEmparejamiento}
          >
            <FormControlLabel
              value="automatico"
              control={<Radio />}
              label="Automático"
            />
            <FormControlLabel
              value="manual"
              control={<Radio />}
              label="Manual"
            />
          </RadioGroup>
          <FormControl>
            <InputLabel id="select-deporte-label">Deporte</InputLabel>
            <Select
              value={deporteSelect}
              label="Deporte"
              size="small"
              labelId="select-deporte-label"
              id="select-deporte-label"
              onChange={(e) => selectDeporte(Number(e.target.value))}
            >
              <MenuItem value={0}>seleccione deporte</MenuItem>
              {deportes.map(({ id, nombre_tipo }) => (
                <MenuItem key={id} value={id}>
                  {nombre_tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel id="select-grupo-label">Grupo</InputLabel>
            <Select
              labelId="select-grupo-label"
              id="select-grupo-select"
              value={selectGrupo}
              onChange={handleChangeSelectGrupo}
              label="Grupo"
              size="small"
            >
              <MenuItem value={0}>Seleccionar Grupo</MenuItem>
              {grupos.map(({ id, nombre_grupo }) => (
                <MenuItem key={id} value={id}>
                  {nombre_grupo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <InputLabel id="select-campo-label">Campo</InputLabel>
            <Select
              labelId="select-campo-label"
              id="select-campo-select"
              value={campoSelect}
              onChange={handleChangeSelectCampo}
              label="Campo"
              size="small"
            >
              <MenuItem value={0}>Seleccionar Campo</MenuItem>
              {campos.map(({ id_campo, nombre_campo }) => (
                <MenuItem key={id_campo} value={id_campo}>
                  {nombre_campo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Segunda fila */}
        <div style={{ display: "flex", gap: "10px" }}>
          <DatePicker
            label="Fecha del primer partido"
            sx={{ flexGrow: 1, margin: "10px" }}
            value={fecha}
            onChange={(date) => setFecha(date as Date)}
          />
          <TimePicker
            label="Hora del primer partido"
            sx={{ flexGrow: 1, margin: "10px" }}
            value={fecha}
            onChange={(date) => setFecha(date as Date)}
          />
          <TextField
            label="Número de Fechas Jugadas"
            type="number"
            size="small"
            value={numeroFechaJugados}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setNumeroFechaJugados(value);
              }
            }}
            sx={{ margin: "20px" }}
          />
        </div>
        {/* Nuevo: Selects para emparejamiento manual */}
        {emparejamiento === "manual" && (
          <div style={{ display: "flex", gap: "20px" }}>
            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel id="select-equipo1-label">Equipo 1</InputLabel>
              <Select
                labelId="select-equipo1-label"
                id="select-equipo1-select"
                value={equipo1}
                onChange={handleChangeEquipo1}
                label="Equipo 1"
                size="small"
              >
                <MenuItem value={""}>Seleccionar Equipo</MenuItem>
                {promocionesFiltradas.map(({ id, nombre_promocion }) => (
                  <MenuItem key={id} value={nombre_promocion}>
                    {nombre_promocion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <InputLabel id="select-equipo2-label">Equipo 2</InputLabel>
              <Select
                labelId="select-equipo2-label"
                id="select-equipo2-select"
                value={equipo2}
                onChange={handleChangeEquipo2}
                label="Equipo 2"
                size="small"
              >
                <MenuItem value={""}>Seleccionar Equipo</MenuItem>
                {promocionesFiltradas.map(({ id, nombre_promocion }) => (
                  <MenuItem key={id} value={nombre_promocion}>
                    {nombre_promocion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ margin: "2px" }}
            variant="contained"
            onClick={() => {
              handleGeneratePartido();
            }}
            disabled={!selectGrupo}
          >
            Generar partido
          </Button>
          <Button
            onClick={handleSavePartido}
            sx={{ padding: "4px" }}
            variant="contained"
            disabled={!selectGrupo}
          >
            Guardar fixture
          </Button>
        </div>
      </Box>
    </>
  );
}

export default FormFixture;

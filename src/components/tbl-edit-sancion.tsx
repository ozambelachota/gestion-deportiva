import { Box, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSancionGolStore } from "../store/sancion-gol.store";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "nombre_promocion", headerName: "Promocion", flex: 2 },
  { field: "cant_tarjeta_amarilla", headerName: "Tarjetas Amarillas", flex: 1 },
  { field: "cant_tarjeta_roja", headerName: "Tarjetas Rojas", flex: 1 },
  { field: "promocion_id", headerName: "Promocion ID", flex: 1 },
  { field: "tipo_sancion", headerName: "Tipo Sancion", flex: 1 },
];
function TablaEditSancion() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(0);
  const navigate = useNavigate();

  const listSancion = useSancionGolStore((state) => state.sancion);
  const getSanciones = useSancionGolStore((state) => state.getSancion);
  useEffect(() => {
    getSanciones();
  }, [listSancion]);

  useEffect(() => {}, []);

  const filteredRows = listSancion.filter((row) =>
    row.nombre_promocion.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClickEdit = () => {
    console.log(selectedRow);
    if (selectedRow) {
      navigate(`/admin/sancion/edit/${selectedRow}`);
    }
  };
  return (
    <>
      <Box margin={3}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button disabled={!selectedRow} onClick={handleClickEdit}>
          Editar
        </Button>
        <DataGrid 
          className="bg-slate-800"
          rows={filteredRows}
          columns={columns}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRow(newSelection[0] as number);
          }}
          disableRowSelectionOnClick
          rowSelectionModel={selectedRow ? [selectedRow] : []}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          pageSizeOptions={[5]}
          loading={listSancion.length === 0}
          checkboxSelection
        />
      </Box>
    </>
  );
}

export default TablaEditSancion;

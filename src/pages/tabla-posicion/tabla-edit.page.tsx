import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrupoStore } from "../../store/grupoSotre.store";
import DeporteStore from "../../store/deporte.store";

function TablaEditPosicionPage() {
  const grupos = GrupoStore((state) => state.grupos);

  const obtenerGrupos = GrupoStore((state) => state.obtenerGrupo);
  const deportes = DeporteStore((state) => state.deportes);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerGrupos();
  }, []);

  return (
    <div>
      <Typography variant="h3">Ver por grupos</Typography>
      <div className="flex flex-wrap gap-2">
        {grupos.map((grupo) => (
          <div key={grupo.id} className="flex  items-center">
            <Button
              variant="contained"
              sx={{ margin: "20px 0" }}
              onClick={() => navigate(`/admin/ver-posicion/promocion/grupo/${grupo.id}`)}
            >
              {grupo.nombre_grupo }
              Ver posiciones
            </Button>
          </div>
        ))}
        {deportes.map((deporte,index) => (
          <div key={deporte.id} className="flex  items-center">
            <Button
              variant="contained"
              disabled={index === 0}  
              sx={{ margin: "20px 0" }}
              onClick={() => navigate(`/admin/voley/${deporte.id}`)}
            >
              {deporte.nombre_tipo}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TablaEditPosicionPage;

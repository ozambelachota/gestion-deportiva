import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrupoStore } from "../../store/grupoSotre.store";

function TablaEditPosicionPage() {
  const grupos = GrupoStore((state) => state.grupos);

  const obtenerGrupos = GrupoStore((state) => state.obtenerGrupo);

  const navigate = useNavigate();

  useEffect(() => {
    obtenerGrupos();
  }, []);

  return (
    <div>
      <Typography variant="h3">Ver por grupos</Typography>
      <div>
        {grupos.map((grupo) => (
          <div key={grupo.id} className="flex flex-col justify-center items-center">
            <Typography variant="h4" textAlign={"center"}>{grupo.nombre_grupo}</Typography>
            <Button
              variant="contained"
              sx={{ margin: "20px 0" }}
              onClick={() => navigate(`/admin/ver-posicion/promocion/grupo/${grupo.id}`)}
            >
              Ver posiciones
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TablaEditPosicionPage;

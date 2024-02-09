import { Button } from "@supabase/ui";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clientApi } from "../api/client.api";
import { userAdmin } from "../services/api.service";
import { useUserStore } from "../store/login.store";

const LoginWithGoogle = () => {
  const setUser = useUserStore((state) => state.setUserData);
  const navigate = useNavigate();
  const setRol = useUserStore((state) => state.setRol);
  const username = useUserStore((state) => state.username);
  const rol = useUserStore((state) => state.rol);

  const handleLogin = async () => {
    try {
      const { error } = await clientApi.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) {
        throw new Error("Ocurrió un error durante el inicio de sesión");
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const authListener = clientApi.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(
            session.user.user_metadata?.full_name,
            session.user.user_metadata?.picture,
            event,
            session.user.id
          );
          const rol = await userAdmin(session.user.id);
          setRol(rol);
          navigate("/admin/home", { replace: true });
        } else {
          navigate("/login", { replace: true });
        }
      }
    );

    return () => {
      authListener.data?.subscription;
    };
  }, [username,rol]);

  return (
    <>
      <Button
        onClick={handleLogin}
        style={{
          backgroundColor: "green",
          color: "white",
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "14px",
          margin: "5px",
        }}
        icon={
          <img
            src="/google.svg"
            alt="Google"
            style={{
              width: "20px",
              height: "20px",
              marginRight: "8px",
            }}
          />
        }
      >
        Iniciar sesión con Google
      </Button>
    </>
  );
};

export default LoginWithGoogle;

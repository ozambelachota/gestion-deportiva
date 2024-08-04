import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clientApi } from "../api/client.api";
import LoginWithGoogle from "./login-g";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await clientApi.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        console.error("Error de autenticación:", error.message);
      } else {
        navigate("/admin/home", { replace: true });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "8px",
      }}
    >
      <Typography variant="h5">Iniciar sesión</Typography>
      <form
        style={{ width: "100%", maxWidth: "300px", marginTop: "8px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Correo electrónico"
          {...register("email", { required: "Este campo es requerido" })}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Contraseña"
          type="password"
          {...register("password", { required: "Este campo es requerido" })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Iniciar sesión
        </Button>
      </form>
      <LoginWithGoogle />
    </Container>
  );
};

export default LoginForm;

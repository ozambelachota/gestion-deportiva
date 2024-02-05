import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { clientApi } from "../api/client.api";
import LoginWithGoogle from "./login-g";

interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const { data: user, error } = await clientApi.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      handleLoginResult(user, error);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleLoginResult = (user: any, error: any) => {
    if (error) {
      console.error("Error during login:", error.message);
    }
    if (user) {
      console.log(user);
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
        <LoginWithGoogle></LoginWithGoogle>
      </form>
    </Container>
  );
};

export default LoginForm;

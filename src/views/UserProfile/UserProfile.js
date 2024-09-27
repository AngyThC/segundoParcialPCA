import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: "20px",
    backgroundColor: "#f1f8e9",
  },
  button: {
    marginTop: "10px",
  },
  title: {
    color: "#388e3c",
  },
  table: {
    minWidth: 650,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "20px",
    borderRadius: "8px",
  },
}));

const PersonasCRUD = () => {
  const classes = useStyles();
  const [personas, setPersonas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [profesion, setProfesion] = useState("");
  const [universidad, setUniversidad] = useState("");
  const [carrera, setCarrera] = useState("");
  const [trabajo, setTrabajo] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [estado, setEstado] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch("http://localhost:5001/personas/get");
        const data = await response.json();
        setPersonas(data);
      } catch (error) {
        console.error("Error al cargar personas:", error);
      }
    };

    fetchPersonas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevaPersona = {
      nombre,
      apellido,
      edad,
      profesion,
      universidad,
      carrera,
      trabajo,
      vehiculo,
      estado,
    };

    if (editingId) {
      try {
        const response = await fetch(
          `http://localhost:5001/personas/update/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaPersona),
          }
        );

        if (response.ok) {
          const updatedPersona = await response.json();
          setPersonas((prevPersonas) =>
            prevPersonas.map((persona) =>
              persona.idPersona === editingId ? updatedPersona : persona
            )
          );
          setOpenModal(true); // Abrir el modal después de la actualización
          limpiarFormulario();
        }
      } catch (error) {
        console.error("Error al actualizar persona:", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:5001/personas/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaPersona),
        });

        if (response.ok) {
          const data = await response.json();
          setPersonas((prevPersonas) => [...prevPersonas, data]);
          limpiarFormulario();
        }
      } catch (error) {
        console.error("Error al agregar persona:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5001/personas/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPersonas((prevPersonas) =>
          prevPersonas.filter((persona) => persona.idPersona !== id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar persona:", error);
    }
  };

  const handleEdit = (persona) => {
    setNombre(persona.nombre);
    setApellido(persona.apellido);
    setEdad(persona.edad);
    setProfesion(persona.profesion);
    setUniversidad(persona.universidad);
    setCarrera(persona.carrera);
    setTrabajo(persona.trabajo);
    setVehiculo(persona.vehiculo);
    setEstado(persona.estado);
    setEditingId(persona.idPersona);
  };

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setEdad("");
    setProfesion("");
    setUniversidad("");
    setCarrera("");
    setTrabajo("");
    setVehiculo("");
    setEstado("");
    setEditingId(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        CRUD de Personas
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Edad"
              variant="outlined"
              fullWidth
              type="number"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Profesión"
              variant="outlined"
              fullWidth
              value={profesion}
              onChange={(e) => setProfesion(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Universidad"
              variant="outlined"
              fullWidth
              value={universidad}
              onChange={(e) => setUniversidad(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Carrera"
              variant="outlined"
              fullWidth
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Trabajo"
              variant="outlined"
              fullWidth
              value={trabajo}
              onChange={(e) => setTrabajo(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Vehículo"
              variant="outlined"
              fullWidth
              value={vehiculo}
              onChange={(e) => setVehiculo(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Estado"
              variant="outlined"
              fullWidth
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              {editingId ? "Actualizar" : "Agregar"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="tabla de personas">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Profesión</TableCell>
              <TableCell>Universidad</TableCell>
              <TableCell>Carrera</TableCell>
              <TableCell>Trabajo</TableCell>
              <TableCell>Vehículo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personas.map((persona) => (
              <TableRow key={persona.idPersona}>
                <TableCell>{persona.idPersona}</TableCell>
                <TableCell>{persona.nombre}</TableCell>
                <TableCell>{persona.apellido}</TableCell>
                <TableCell>{persona.edad}</TableCell>
                <TableCell>{persona.profesion}</TableCell>
                <TableCell>{persona.universidad}</TableCell>
                <TableCell>{persona.carrera}</TableCell>
                <TableCell>{persona.trabajo}</TableCell>
                <TableCell>{persona.vehiculo}</TableCell>
                <TableCell>{persona.estado}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(persona)}>Editar</Button>
                  <Button onClick={() => handleDelete(persona.idPersona)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para refrescar página */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        className={classes.modal}
      >
        <Box className={classes.paper}>
          <Typography variant="h6">¡Actualización Exitosa!</Typography>
          <Typography variant="body1">
            Por favor, refresca la página para ver los cambios.
          </Typography>
          <Button
            onClick={handleCloseModal}
            color="primary"
            variant="contained"
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PersonasCRUD;

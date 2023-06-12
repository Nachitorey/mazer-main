CREATE TABLE Clientes (
  id SERIAL PRIMARY KEY,
  Nombre VARCHAR(100),
  Apellido VARCHAR(100),
  CorreoElectronico VARCHAR(100),
  Usuario(100)
  Contraseña VARCHAR(100)
);

-- Creación de la tabla "Plantas"
CREATE TABLE Plantas (
  id_planta SERIAL PRIMARY KEY,
  TipoPlanta VARCHAR(100)
);

-- Creación de la tabla "Informacion_Plantas"
CREATE TABLE Informacion_Plantas (
  id_planta INTEGER REFERENCES Plantas(id_planta),
  Temperatura FLOAT,
  Luz FLOAT,
  Humedad FLOAT,
  NivelAgua BOOLEAN,
  PRIMARY KEY (id_planta)
);
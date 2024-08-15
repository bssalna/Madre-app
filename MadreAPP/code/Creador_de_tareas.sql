

DROP TABLE IF EXISTS `perfil`;

CREATE TABLE `perfil` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `edad` int(11) DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `correo` varchar(255) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `estatura` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




LOCK TABLES `perfil` WRITE;

UNLOCK TABLES;



DROP TABLE IF EXISTS `realiza`;

CREATE TABLE `realiza` (
  `id_realizacion` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_tarea` int(11) DEFAULT NULL,
  `estado` varchar(50) NOT NULL CHECK (`estado` in ('pendiente','completada','en progreso','otros')),
  `fecha_asignacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id_realizacion`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_tarea` (`id_tarea`),
  CONSTRAINT `realiza_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `perfil` (`id_usuario`),
  CONSTRAINT `realiza_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id_tarea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



LOCK TABLES `realiza` WRITE;

UNLOCK TABLES;


DROP TABLE IF EXISTS `tareas`;

CREATE TABLE `tareas` (
  `id_tarea` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `valor_tarea` decimal(5,2) DEFAULT NULL,
  `intencidad_tarea` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_tarea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



LOCK TABLES `tareas` WRITE;

UNLOCK TABLES;


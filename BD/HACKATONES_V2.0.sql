CREATE DATABASE  IF NOT EXISTS `HACKATONES` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `HACKATONES`;
-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: HACKATONES
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hackaton`
--

DROP TABLE IF EXISTS `hackaton`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hackaton` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `presencial` tinyint(1) NOT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `contenido` varchar(2000) NOT NULL,
  `id_user` mediumint DEFAULT NULL,
  `id_tech` mediumint DEFAULT NULL,
  `inicio` timestamp NOT NULL,
  `fin` timestamp NOT NULL,
  `avatar` blob,
  `max_register` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  KEY `id_tech` (`id_tech`),
  CONSTRAINT `hackaton_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id`),
  CONSTRAINT `hackaton_ibfk_3` FOREIGN KEY (`id_tech`) REFERENCES `tecnologia` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hackaton_tiene_tecnologia`
--

DROP TABLE IF EXISTS `hackaton_tiene_tecnologia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hackaton_tiene_tecnologia` (
  `id_hack` mediumint NOT NULL,
  `id_tech` mediumint NOT NULL,
  PRIMARY KEY (`id_hack`,`id_tech`),
  KEY `id_tech` (`id_tech`),
  CONSTRAINT `hackaton_tiene_tecnologia_ibfk_1` FOREIGN KEY (`id_hack`) REFERENCES `hackaton` (`id`),
  CONSTRAINT `hackaton_tiene_tecnologia_ibfk_2` FOREIGN KEY (`id_tech`) REFERENCES `tecnologia` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `noticias`
--

DROP TABLE IF EXISTS `noticias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `noticias` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `titular` varchar(500) NOT NULL,
  `contenido` varchar(5000) NOT NULL,
  `f_publicacion` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tecnologia`
--

DROP TABLE IF EXISTS `tecnologia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tecnologia` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido1` varchar(255) DEFAULT NULL,
  `apellido2` varchar(255) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `nick` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `avatar` blob,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nick` (`nick`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario_apuntado_a_hackaton`
--

DROP TABLE IF EXISTS `usuario_apuntado_a_hackaton`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_apuntado_a_hackaton` (
  `id_user` mediumint NOT NULL,
  `id_hack` mediumint NOT NULL,
  `c_reserva` varchar(255) DEFAULT NULL,
  `posicion` mediumint DEFAULT NULL,
  `score_hack` int DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_hack`),
  KEY `id_hack` (`id_hack`),
  CONSTRAINT `usuario_apuntado_a_hackaton_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id`),
  CONSTRAINT `usuario_apuntado_a_hackaton_ibfk_2` FOREIGN KEY (`id_hack`) REFERENCES `hackaton` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'HACKATONES'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-27 21:19:30

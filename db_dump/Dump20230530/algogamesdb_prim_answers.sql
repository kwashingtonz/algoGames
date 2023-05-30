-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: algogamesdb
-- ------------------------------------------------------
-- Server version	5.7.40-log

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
-- Table structure for table `prim_answers`
--

DROP TABLE IF EXISTS `prim_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prim_answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `answer` varchar(1000) DEFAULT NULL,
  `distances` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prim_answers`
--

LOCK TABLES `prim_answers` WRITE;
/*!40000 ALTER TABLE `prim_answers` DISABLE KEYS */;
INSERT INTO `prim_answers` VALUES (1,'anonymous','214','{\"City A\":{\"City B\":66,\"City C\":44,\"City D\":62,\"City E\":55,\"City F\":64,\"City G\":27,\"City H\":32,\"City I\":20,\"City J\":54},\"City B\":{\"City A\":66,\"City C\":29,\"City D\":30,\"City E\":30,\"City F\":95,\"City G\":35,\"City H\":53,\"City I\":21,\"City J\":32},\"City C\":{\"City A\":44,\"City B\":29,\"City D\":90,\"City E\":68,\"City F\":89,\"City G\":62,\"City H\":13,\"City I\":81,\"City J\":68},\"City D\":{\"City A\":62,\"City B\":30,\"City C\":90,\"City E\":46,\"City F\":79,\"City G\":24,\"City H\":86,\"City I\":64,\"City J\":78},\"City E\":{\"City A\":55,\"City B\":30,\"City C\":68,\"City D\":46,\"City F\":40,\"City G\":90,\"City H\":93,\"City I\":83,\"City J\":24},\"City F\":{\"City A\":64,\"City B\":95,\"City C\":89,\"City D\":79,\"City E\":40,\"City G\":82,\"City H\":77,\"City I\":69,\"City J\":70},\"City G\":{\"City A\":27,\"City B\":35,\"City C\":62,\"City D\":24,\"City E\":90,\"City F\":82,\"City H\":62,\"City I\":95,\"City J\":28},\"City H\":{\"City A\":32,\"City B\":53,\"City C\":13,\"City D\":86,\"City E\":93,\"City F\":77,\"City G\":62,\"City I\":17,\"City J\":73},\"City I\":{\"City A\":20,\"City B\":21,\"City C\":81,\"City D\":64,\"City E\":83,\"City F\":69,\"City G\":95,\"City H\":17,\"City J\":38},\"City J\":{\"City A\":54,\"City B\":32,\"City C\":68,\"City D\":78,\"City E\":24,\"City F\":70,\"City G\":28,\"City H\":73,\"City I\":38}}');
/*!40000 ALTER TABLE `prim_answers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-30 19:39:26

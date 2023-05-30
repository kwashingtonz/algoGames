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
-- Table structure for table `dijkstra_answers`
--

DROP TABLE IF EXISTS `dijkstra_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dijkstra_answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `answer` varchar(1000) DEFAULT NULL,
  `distances` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dijkstra_answers`
--

LOCK TABLES `dijkstra_answers` WRITE;
/*!40000 ALTER TABLE `dijkstra_answers` DISABLE KEYS */;
INSERT INTO `dijkstra_answers` VALUES (1,'anonymous','{\"City A\":8,\"City B\":10,\"City C\":11,\"City D\":17,\"City E\":18,\"City F\":21,\"City G\":0,\"City H\":15,\"City I\":9,\"City J\":20}','{\"City A\":{\"City B\":32,\"City C\":7,\"City D\":25,\"City E\":26,\"City F\":19,\"City G\":8,\"City H\":47,\"City I\":42,\"City J\":27},\"City B\":{\"City A\":32,\"City C\":49,\"City D\":25,\"City E\":48,\"City F\":20,\"City G\":10,\"City H\":9,\"City I\":7,\"City J\":36},\"City C\":{\"City A\":7,\"City B\":49,\"City D\":35,\"City E\":50,\"City F\":34,\"City G\":11,\"City H\":41,\"City I\":14,\"City J\":11},\"City D\":{\"City A\":25,\"City B\":25,\"City C\":35,\"City E\":10,\"City F\":41,\"City G\":17,\"City H\":34,\"City I\":21,\"City J\":18},\"City E\":{\"City A\":26,\"City B\":48,\"City C\":50,\"City D\":10,\"City F\":25,\"City G\":18,\"City H\":44,\"City I\":9,\"City J\":50},\"City F\":{\"City A\":19,\"City B\":20,\"City C\":34,\"City D\":41,\"City E\":25,\"City G\":37,\"City H\":38,\"City I\":12,\"City J\":17},\"City G\":{\"City A\":8,\"City B\":10,\"City C\":11,\"City D\":17,\"City E\":18,\"City F\":37,\"City H\":45,\"City I\":9,\"City J\":42},\"City H\":{\"City A\":47,\"City B\":9,\"City C\":41,\"City D\":34,\"City E\":44,\"City F\":38,\"City G\":45,\"City I\":6,\"City J\":36},\"City I\":{\"City A\":42,\"City B\":7,\"City C\":14,\"City D\":21,\"City E\":9,\"City F\":12,\"City G\":9,\"City H\":6,\"City J\":11},\"City J\":{\"City A\":27,\"City B\":36,\"City C\":11,\"City D\":18,\"City E\":50,\"City F\":17,\"City G\":42,\"City H\":36,\"City I\":11}}');
/*!40000 ALTER TABLE `dijkstra_answers` ENABLE KEYS */;
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

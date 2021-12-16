-- MySQL dump 10.13  Distrib 5.7.9, for linux-glibc2.5 (x86_64)
--
-- Host: localhost    Database: Domaci2.2
-- ------------------------------------------------------
-- Server version	5.6.33-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `prodavnica_proizvod`
--

DROP TABLE IF EXISTS `prodavnica_proizvod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prodavnica_proizvod` (
  `proizvodID` int(11) DEFAULT NULL,
  `prodavnicaID` int(11) DEFAULT NULL,
  `cena` decimal(12,2) DEFAULT NULL,
  `prodavnica_proizvodID` int(11) NOT NULL,
  PRIMARY KEY (`prodavnica_proizvodID`),
  KEY `fk_prodavnica_proizvod_1_idx` (`proizvodID`),
  KEY `fk_prodavnica_proizvod_2_idx` (`prodavnicaID`),
  CONSTRAINT `fk_prodavnica_proizvod_1` FOREIGN KEY (`proizvodID`) REFERENCES `proizvod` (`proizvodID`),
  CONSTRAINT `fk_prodavnica_proizvod_2` FOREIGN KEY (`prodavnicaID`) REFERENCES `prodavnica` (`prodavnicaID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodavnica_proizvod`
--

LOCK TABLES `prodavnica_proizvod` WRITE;
/*!40000 ALTER TABLE `prodavnica_proizvod` DISABLE KEYS */;
INSERT INTO `prodavnica_proizvod` VALUES (1,1,99.00,1),(1,2,89.00,2),(3,3,79.00,3),(4,1,156.00,4);
/*!40000 ALTER TABLE `prodavnica_proizvod` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-16 14:14:33

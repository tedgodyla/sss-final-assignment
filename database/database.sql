CREATE DATABASE  IF NOT EXISTS `dreamteam` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dreamteam`;
-- MySQL dump 10.13  Distrib 5.6.19, for osx10.7 (i386)
--
-- Host: 127.0.0.1    Database: dreamteam
-- ------------------------------------------------------
-- Server version	5.6.21

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
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
INSERT INTO `club` VALUES (1,'Ajax','Amsterdam'),(2,'Feyenoord','Rotterdam'),(3,'PSV','Eindhoven');
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` mediumtext NOT NULL,
  PRIMARY KEY (`id`,`team_id`),
  KEY `fk_comment_team1_idx` (`team_id`),
  CONSTRAINT `fk_comment_team1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,9,1,'2015-01-23 14:30:50','Sed luctus tortor non posuere lacinia. Aenean maximus enim pellentesque blandit faucibus. In vitae viverra dui. Praesent ultrices fringilla eros, non vehicula erat auctor quis.'),(2,9,1,'2015-01-23 14:31:09','Aenean nisl mi, sollicitudin et rhoncus non, commodo sit amet felis. Quisque pulvinar hendrerit ipsum, in tristique ligula placerat blandit. Quisque sed justo luctus, elementum lectus sed, viverra est. In dignissim nulla pretium est dignissim, dapibus venenatis dui tempus. Nullam vestibulum, nunc ut gravida pharetra, velit est fermentum lacus, eu pharetra orci libero ut eros.'),(3,8,0,'2015-01-23 14:35:22','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et enim nec nibh condimentum bibendum.'),(4,9,0,'2015-01-23 14:35:59','Haha wauw, sorry hoor, maar waarom zet je Memphis Depay rechts back...'),(5,9,0,'2015-01-23 14:36:40','Phasellus nec blandit nibh. Nullam rutrum neque a lectus tincidunt volutpat. Integer suscipit lorem rhoncus diam facilisis tempor. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed cursus hendrerit finibus. Curabitur lacinia enim in commodo tincidunt. Ut scelerisque lacus leo, non finibus nulla consectetur a. Suspendisse id sem nec turpis lacinia viverra vitae et ante.'),(6,9,0,'2015-01-23 14:41:12','goed team man'),(7,8,1,'2015-01-23 17:27:36','fadsfds'),(8,9,11,'2015-01-23 17:28:02','fasdfds'),(9,11,11,'2015-01-23 17:28:26','Haha, laat me niet lachen'),(10,11,11,'2015-01-23 17:29:49','Nee, grapje, hij is wel oke'),(11,11,2,'2015-01-23 17:38:10','Kan beter. Wissel Vloet met Pasveer.'),(12,7,2,'2015-01-23 17:39:47','Donec commodo sem non volutpat tristique. Phasellus sit amet tellus ut lacus maximus pulvinar ut sit amet orci. Etiam fringilla eros lacus, vitae mattis erat ullamcorper consequat. Quisque accumsan placerat mauris et fringilla. Curabitur vel congue ligula. Cras non commodo turpis, et commodo elit. Morbi aliquam laoreet turpis id tristique. Cras purus massa, luctus quis lobortis sed, hendrerit a est. Sed vulputate nulla eget dolor dignissim aliquet. Curabitur in dolor sit amet turpis elementum congue.'),(13,15,13,'2015-01-23 18:27:38','Een beste team al zeg ik het zelf.'),(14,9,13,'2015-01-23 18:28:51','Aliquam tincidunt orci nibh, quis egestas eros iaculis vitae. Nam condimentum aliquet purus, eget sollicitudin ipsum varius eget. Vestibulum velit risus, euismod in aliquet in, dignissim quis nibh. Nullam ligula nisi, laoreet a metus eget, viverra molestie lectus. Proin et viverra arcu. Suspendisse sodales eleifend elit vel commodo. Sed ut iaculis urna, sed facilisis nisl.'),(15,14,0,'2015-01-23 20:18:44','goede opstelling'),(16,16,1,'2015-01-23 20:20:55','goede team'),(17,11,1,'2015-01-26 10:47:04','dvvxczxc'),(18,9,1,'2015-01-26 10:47:20','dfasadfss'),(20,23,1,'2015-01-26 13:57:48','Netjes'),(21,13,11,'2015-01-26 13:58:45','Slecht team Bart');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formation`
--

DROP TABLE IF EXISTS `formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formation`
--

LOCK TABLES `formation` WRITE;
/*!40000 ALTER TABLE `formation` DISABLE KEYS */;
INSERT INTO `formation` VALUES (1,'4-3-3'),(2,'5-3-2'),(3,'4-4-2');
/*!40000 ALTER TABLE `formation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `preffered_role_id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  PRIMARY KEY (`id`,`preffered_role_id`,`club_id`),
  KEY `fk_player_preffered_role_idx` (`preffered_role_id`),
  KEY `fk_player_club1_idx` (`club_id`),
  CONSTRAINT `fk_player_club1` FOREIGN KEY (`club_id`) REFERENCES `club` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_player_preffered_role` FOREIGN KEY (`preffered_role_id`) REFERENCES `preffered_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (1,'Jeroen Zoet',NULL,NULL,1,3,0),(2,'Nicolas Isimat-Mirin',NULL,NULL,2,3,1),(3,'Karim Rekik',NULL,NULL,2,3,2),(4,'Santiago Arias',NULL,NULL,2,3,3),(5,'Jeffrey Bruma',NULL,NULL,2,3,4),(6,'Adam Maher',NULL,NULL,3,3,5),(7,'Memphis Depay',NULL,NULL,4,3,6),(8,'Stijn Schaars',NULL,NULL,3,3,7),(9,'Luuk de Jong',NULL,NULL,4,3,8),(10,'Georginio Wijnaldum	',NULL,NULL,3,3,9),(11,'Luciano Narsingh',NULL,NULL,4,3,10),(12,'Florian Jozefzoon',NULL,NULL,4,3,11),(13,'Jetro Willems',NULL,NULL,2,3,14),(14,'Jurgen Locadia',NULL,NULL,4,3,15),(15,'Andres Guardado',NULL,NULL,3,3,17),(16,'Joshua Brenet',NULL,NULL,2,3,18),(17,'Remko Pasveer',NULL,NULL,1,3,20),(18,'Rai Vloet',NULL,NULL,3,3,22),(19,'Marcel Ritzmaier',NULL,NULL,3,3,23),(20,'Jasper Cillessen',NULL,NULL,1,1,1),(21,'Ricardo van Rhijn',NULL,NULL,2,1,2),(22,'Joel Veltman',NULL,NULL,2,1,3),(23,'Niklas Moisander',NULL,NULL,2,1,4),(24,'Nicolai Boilessen',NULL,NULL,2,1,5),(25,'Mike van der Hoorn',NULL,NULL,2,1,6),(26,'Viktor Fischer',NULL,NULL,4,1,7),(27,'Lerin Duarte',NULL,NULL,3,1,8),(28,'Kolbein Sigtorsson',NULL,NULL,4,1,9),(29,'Davy Klaasen',NULL,NULL,3,1,10),(30,'Ricardo Kishna',NULL,NULL,4,1,11),(31,'Jairo Riedewald',NULL,NULL,2,1,12),(32,'Lucas Anderssen',NULL,NULL,3,1,16),(33,'Robert Muric',NULL,NULL,4,1,18),(34,'Arek Milik',NULL,NULL,4,1,19),(35,'Lasse Schone',NULL,NULL,4,1,20),(36,'Anwar El Ghazi',NULL,NULL,4,1,21),(37,'Thulani Serero',NULL,NULL,3,1,25),(38,'Richairo Zivkovic',NULL,NULL,4,1,30),(39,'Kenneth Vermeer',NULL,NULL,1,2,16),(40,'Luke Wilkshire',NULL,NULL,2,2,2),(41,'Terence Kongolo',NULL,NULL,2,2,5),(42,'Sven van Beek',NULL,NULL,2,2,22),(43,'Miquel Nelom',NULL,NULL,2,2,18),(44,'Jordy Clasie',NULL,NULL,3,2,6),(45,'Lex Immers',NULL,NULL,3,2,10),(46,'Jens Toornstra',NULL,NULL,4,2,28),(47,'Kraim El Ahmadi',NULL,NULL,3,2,8),(48,'Jean-Paul Boetius',NULL,NULL,4,2,7),(49,'Colin Kazim-Richards',NULL,NULL,4,2,15),(50,'Elvis Manu',NULL,NULL,4,2,17);
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preffered_role`
--

DROP TABLE IF EXISTS `preffered_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preffered_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preffered_role`
--

LOCK TABLES `preffered_role` WRITE;
/*!40000 ALTER TABLE `preffered_role` DISABLE KEYS */;
INSERT INTO `preffered_role` VALUES (1,'keeper'),(2,'verdediger'),(3,'middelvelder'),(4,'aanvaller');
/*!40000 ALTER TABLE `preffered_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  `formations_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `image_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`formations_id`),
  KEY `fk_dream_formation_user1_idx` (`user_id`),
  KEY `fk_dream_formation_formations1_idx` (`formations_id`),
  CONSTRAINT `fk_dream_formation_formations1` FOREIGN KEY (`formations_id`) REFERENCES `formation` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_dream_formation_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (7,'Zo goed dit team',1,1,'2015-01-18 01:04:58','default.png'),(8,'superteam',1,2,'2015-01-18 01:06:48','default.png'),(9,'Quen\'s team yo',11,2,'2015-01-20 16:34:34','default.png'),(11,'beste team ooit dude',1,3,'2015-01-23 14:48:33','default.png'),(13,'Dreamteam Bart',2,1,'2015-01-23 15:19:47','default.png'),(14,'Dreamteam Bart 2',2,2,'2015-01-23 15:20:37','default.png'),(15,'Test team',13,3,'2015-01-23 18:26:59','default.png'),(16,'Teds beste team ooit',1,3,'2015-01-23 20:20:43','default.png'),(23,'dsfafds',1,1,'2015-01-26 13:53:17','b6b1f40decd02fee96653837956f7b9f.jpg'),(24,'Jan zijn team',25,2,'2015-01-26 14:00:33','8d8ed1f826bf6e09fb5683512efc8e9e.jpg'),(25,'Bart Master Team',2,2,'2015-01-26 14:11:45','default.png');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team_has_player`
--

DROP TABLE IF EXISTS `team_has_player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_has_player` (
  `team_id` int(11) NOT NULL,
  `player_id` int(11) NOT NULL,
  `position` int(11) NOT NULL,
  PRIMARY KEY (`team_id`,`player_id`,`position`),
  KEY `fk_dream_formation_has_player_player1_idx` (`player_id`),
  KEY `fk_dream_formation_has_player_dream_formation1_idx` (`team_id`),
  CONSTRAINT `fk_dream_formation_has_player_dream_formation1` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_dream_formation_has_player_player1` FOREIGN KEY (`player_id`) REFERENCES `player` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team_has_player`
--

LOCK TABLES `team_has_player` WRITE;
/*!40000 ALTER TABLE `team_has_player` DISABLE KEYS */;
INSERT INTO `team_has_player` VALUES (7,1,0),(8,1,0),(9,1,0),(11,1,0),(13,1,0),(14,1,0),(15,1,0),(16,1,0),(23,1,0),(7,2,1),(8,2,1),(11,2,5),(13,2,1),(14,2,1),(15,2,5),(16,2,8),(23,2,1),(7,3,2),(9,3,1),(11,3,7),(13,3,2),(14,3,2),(15,3,6),(16,3,4),(23,3,2),(25,3,4),(7,4,3),(8,4,2),(9,4,2),(11,4,8),(13,4,3),(14,4,3),(15,4,7),(16,4,9),(23,4,3),(24,4,1),(25,4,6),(7,5,4),(8,5,3),(9,5,3),(13,5,4),(14,5,4),(15,5,4),(16,5,6),(23,5,4),(24,5,0),(25,5,7),(7,6,5),(9,6,4),(11,6,3),(13,6,5),(14,6,5),(16,6,10),(23,6,5),(24,6,9),(7,7,6),(8,7,4),(9,7,5),(11,7,9),(13,7,6),(14,7,6),(15,7,9),(16,7,7),(23,7,6),(24,7,7),(25,7,9),(7,8,7),(8,8,5),(11,8,4),(13,8,7),(14,8,7),(15,8,8),(23,8,7),(7,9,8),(8,9,6),(9,9,6),(11,9,10),(13,9,8),(14,9,8),(15,9,10),(23,9,8),(24,9,2),(25,9,1),(7,10,9),(9,10,8),(11,10,1),(13,10,9),(14,10,9),(23,10,9),(24,10,3),(7,11,10),(13,11,10),(14,11,10),(15,11,1),(23,11,10),(8,12,7),(9,12,7),(16,12,5),(9,13,10),(16,13,1),(8,14,8),(9,14,9),(8,17,9),(11,17,2),(15,17,2),(16,17,3),(25,17,2),(8,18,10),(11,18,6),(15,18,3),(16,18,2),(24,20,4),(25,20,0),(25,24,8),(24,26,10),(25,28,3),(25,29,10),(24,38,6),(25,38,5),(24,43,5),(24,45,8);
/*!40000 ALTER TABLE `team_has_player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ted','$2a$10$ZOYS8YGc1U6XOMHB/Wj.9uEk3ydNaGXld037KFxD7gLU.Efy/Q0ei','ted@test.nl'),(2,'bart','$2a$10$ZOYS8YGc1U6XOMHB/Wj.9uEk3ydNaGXld037KFxD7gLU.Efy/Q0ei','bart@test.nl'),(11,'quen','$2a$10$ZOYS8YGc1U6XOMHB/Wj.9uEk3ydNaGXld037KFxD7gLU.Efy/Q0ei','quen@test.nl'),(13,'test','$2a$10$ZOYS8YGc1U6XOMHB/Wj.9uEk3ydNaGXld037KFxD7gLU.Efy/Q0ei','test@test.nl'),(25,'Jan','$2a$10$nr.dGDBAKotilVw1YQ4DG.ntrC3RkPltsvDhggJPoJzL9VIG7U8FW','jan@test.nl');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-01-26 15:40:00

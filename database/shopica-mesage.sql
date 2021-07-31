-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: mysql-37282-0.cloudclusters.net    Database: shopica_message
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `Attachments`
--

DROP TABLE IF EXISTS `Attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attachments` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Message_id` int NOT NULL,
  `Thumb_url` text,
  `File_url` text,
  `Created_at` datetime NOT NULL,
  `Update_at` datetime NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Attachments_Message_id` (`Message_id`),
  CONSTRAINT `FK_Attachments_Messages_Message_id` FOREIGN KEY (`Message_id`) REFERENCES `Messages` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attachments`
--

LOCK TABLES `Attachments` WRITE;
/*!40000 ALTER TABLE `Attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Conversations`
--

DROP TABLE IF EXISTS `Conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Conversations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` text,
  `Image_url` text,
  `Creator_id` int NOT NULL,
  `Created_at` datetime NOT NULL,
  `Update_at` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Conversations`
--

LOCK TABLES `Conversations` WRITE;
/*!40000 ALTER TABLE `Conversations` DISABLE KEYS */;
INSERT INTO `Conversations` VALUES (1,'New conversation',NULL,51,'2021-07-06 13:56:33','2021-07-06 13:56:33'),(2,'New conversation',NULL,51,'2021-07-06 15:14:36','2021-07-06 15:14:36'),(3,'New conversation',NULL,51,'2021-07-07 02:45:08','2021-07-07 02:45:08'),(4,'New conversation',NULL,54,'2021-07-07 16:46:12','2021-07-07 16:46:12');
/*!40000 ALTER TABLE `Conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Messages`
--

DROP TABLE IF EXISTS `Messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Messages` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Content` text,
  `Conversation_id` int NOT NULL,
  `Sender_id` int NOT NULL,
  `IsRead` tinyint(1) NOT NULL,
  `Created_at` datetime NOT NULL,
  `Update_at` datetime NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Messages_Conversation_id` (`Conversation_id`),
  CONSTRAINT `FK_Messages_Conversations_Conversation_id` FOREIGN KEY (`Conversation_id`) REFERENCES `Conversations` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Messages`
--

LOCK TABLES `Messages` WRITE;
/*!40000 ALTER TABLE `Messages` DISABLE KEYS */;
INSERT INTO `Messages` VALUES (2,'hello',1,51,1,'2021-07-06 13:57:11','2021-07-06 13:58:10'),(4,'test2',1,49,1,'2021-07-06 13:57:59','2021-07-06 13:58:10'),(5,'test2',1,49,1,'2021-07-06 14:07:02','2021-07-06 14:07:07'),(6,'ádasd',1,51,1,'2021-07-06 15:10:37','2021-07-06 15:10:48'),(7,'hi',1,51,1,'2021-07-06 15:10:44','2021-07-06 15:10:48'),(8,'hi',2,51,1,'2021-07-06 15:14:59','2021-07-06 15:17:27'),(9,'hello',2,51,1,'2021-07-06 15:15:34','2021-07-06 15:17:27'),(10,'test2',1,49,1,'2021-07-06 15:17:13','2021-07-06 15:17:25'),(11,'test2',1,49,1,'2021-07-06 15:17:21','2021-07-06 15:17:25'),(12,'test2',1,51,1,'2021-07-06 15:26:58','2021-07-06 15:27:46'),(13,'hi',1,49,1,'2021-07-06 15:27:39','2021-07-06 15:27:46'),(14,'test2',1,51,1,'2021-07-06 15:27:58','2021-07-06 15:28:50'),(15,'hello',1,49,1,'2021-07-06 15:28:07','2021-07-06 15:28:50'),(16,'hi',1,49,1,'2021-07-06 15:29:06','2021-07-06 15:30:41'),(17,'hi',1,49,1,'2021-07-06 15:29:15','2021-07-06 15:30:41'),(18,'hi',1,51,1,'2021-07-06 15:32:02','2021-07-06 15:32:28'),(39,'hi',1,51,1,'2021-07-06 15:38:31','2021-07-06 15:38:40'),(41,'12312',1,51,1,'2021-07-06 15:39:28','2021-07-06 15:43:32'),(48,'23',1,49,1,'2021-07-06 15:48:10','2021-07-06 15:48:56'),(49,'now',1,49,1,'2021-07-06 15:48:37','2021-07-06 15:48:56'),(50,'',1,49,1,'2021-07-06 15:48:38','2021-07-06 15:48:56'),(51,'hi',1,51,1,'2021-07-06 15:50:04','2021-07-06 15:51:00'),(52,'lỡ nhiều thằng customer rồi biết thằng naof',1,51,1,'2021-07-06 15:50:39','2021-07-06 15:51:00'),(53,'sao nó bị double nhỉ',1,51,1,'2021-07-06 15:50:55','2021-07-06 15:51:00'),(54,'nhận được tn t ko',1,51,1,'2021-07-06 15:51:41','2021-07-06 16:01:02'),(55,'okk đã nhận ',1,49,1,'2021-07-07 02:48:40','2021-07-07 02:48:46'),(56,'Tkank you',1,51,1,'2021-07-07 02:49:11','2021-07-07 02:49:17'),(57,'Hi, this product is available',3,51,1,'2021-07-07 02:52:41','2021-07-07 02:52:56'),(58,'Thank you for concerning about my product',3,59,1,'2021-07-07 02:53:23','2021-07-07 02:54:02'),(59,'this is available',3,59,1,'2021-07-07 02:53:34','2021-07-07 02:54:02'),(60,'I want to buy 2 T-shirt',3,51,1,'2021-07-07 02:53:56','2021-07-07 02:54:02'),(61,'hi',1,49,1,'2021-07-07 16:18:00','2021-07-07 16:18:38'),(63,'hello',1,49,1,'2021-07-07 16:19:33','2021-07-07 16:25:46'),(71,'hi',4,54,1,'2021-07-07 16:46:48','2021-07-07 16:47:16'),(72,'are you it',4,54,1,'2021-07-07 16:47:04','2021-07-07 16:47:16'),(73,'hello',4,64,1,'2021-07-07 16:47:44','2021-07-07 16:47:47'),(74,'32',4,64,1,'2021-07-07 16:48:01','2021-07-07 16:49:04'),(76,'hi',3,51,0,'2021-07-07 17:25:14','2021-07-07 17:25:14'),(77,'heleo',3,51,0,'2021-07-07 17:25:22','2021-07-07 17:25:22');
/*!40000 ALTER TABLE `Messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Participants`
--

DROP TABLE IF EXISTS `Participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Participants` (
  `Conversation_id` int NOT NULL,
  `User_id` int NOT NULL,
  `Created_at` datetime NOT NULL,
  `Update_at` datetime NOT NULL,
  PRIMARY KEY (`Conversation_id`,`User_id`),
  KEY `IX_Participants_User_id` (`User_id`),
  CONSTRAINT `FK_Participants_Conversations_Conversation_id` FOREIGN KEY (`Conversation_id`) REFERENCES `Conversations` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Participants_Users_User_id` FOREIGN KEY (`User_id`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Participants`
--

LOCK TABLES `Participants` WRITE;
/*!40000 ALTER TABLE `Participants` DISABLE KEYS */;
INSERT INTO `Participants` VALUES (1,49,'2021-07-06 13:56:33','2021-07-06 13:56:33'),(1,51,'2021-07-06 13:56:33','2021-07-06 13:56:33'),(2,51,'2021-07-06 15:14:36','2021-07-06 15:14:36'),(2,61,'2021-07-06 15:14:36','2021-07-06 15:14:36'),(3,51,'2021-07-07 02:45:08','2021-07-07 02:45:08'),(3,59,'2021-07-07 02:45:08','2021-07-07 02:45:08'),(4,54,'2021-07-07 16:46:12','2021-07-07 16:46:12'),(4,64,'2021-07-07 16:46:12','2021-07-07 16:46:12');
/*!40000 ALTER TABLE `Participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Phone` text,
  `Email` text,
  `Password` text,
  `FullName` text,
  `Image` text,
  `Created_at` datetime NOT NULL,
  `Update_at` datetime NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (49,'0968540305','seller@gmail.com',NULL,'shoppica','https://drive.google.com/uc?export=view&id=12rdLkW5ukR2eOgS0FgjlyCE0YjPLHBtW','2021-07-06 13:56:33','2021-07-06 13:56:33'),(51,'0968540305','votrunghieu044@gmail.com',NULL,'Hieu Vo','https://lh4.googleusercontent.com/-6cxWHFUvoVk/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmCmte4CNnYUmDqOMnTdjisJJbfUg/s96-c/photo.jpg','2021-07-06 13:56:33','2021-07-06 13:56:33'),(54,NULL,'manhnguyen130399@gmail.com',NULL,'Mạnh Nguyễn','https://lh3.googleusercontent.com/a/AATXAJwe78qaB5x88LGo4dCyDqemPxWVvVVC9Df-invm=s96-c','2021-07-07 16:46:12','2021-07-07 16:46:12'),(59,'0968540305','manfashion@gmail.com',NULL,'manfashion','https://drive.google.com/uc?export=view&id=1LqleDbK71DLrw9mKM-XR3zR1nIRe_Msp','2021-07-07 02:45:08','2021-07-07 02:45:08'),(61,'0968540305','jewelry@gmail.com',NULL,'jewelry','https://drive.google.com/uc?export=view&id=1sj-qJDRoxzZXUyHOyU3rqv_Oj7Dsgikj','2021-07-06 15:14:36','2021-07-06 15:14:36'),(64,'09321423432','manh.flix94@gmail.com',NULL,'Fashion','https://drive.google.com/uc?export=view&id=1x3Joer9Tpxr_YNogK0P0Q-KUKvu3TpmA','2021-07-07 16:46:12','2021-07-07 16:46:12');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `__EFMigrationsHistory`
--

DROP TABLE IF EXISTS `__EFMigrationsHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__EFMigrationsHistory`
--

LOCK TABLES `__EFMigrationsHistory` WRITE;
/*!40000 ALTER TABLE `__EFMigrationsHistory` DISABLE KEYS */;
INSERT INTO `__EFMigrationsHistory` VALUES ('20210706065055_init','5.0.7');
/*!40000 ALTER TABLE `__EFMigrationsHistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-08 22:33:13

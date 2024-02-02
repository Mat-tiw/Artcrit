-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: artcrit_alpha
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
-- Table structure for table `ac_image`
--

DROP TABLE IF EXISTS `ac_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ac_image` (
  `id_image` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_image`),
  KEY `post_id_idx` (`post_id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `ac_user` (`id_user`),
  CONSTRAINT `post_id` FOREIGN KEY (`post_id`) REFERENCES `ac_post` (`id_post`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ac_image`
--

LOCK TABLES `ac_image` WRITE;
/*!40000 ALTER TABLE `ac_image` DISABLE KEYS */;
INSERT INTO `ac_image` VALUES (54,37,'http://localhost:3030/static/56fb62309aimage-1.jpg','2024-01-16 03:50:26','2024-01-16 03:50:26',3),(55,37,'http://localhost:3030/static/902d0fc3fcimage-2.jpg','2024-01-16 03:50:26','2024-01-16 03:50:26',3),(56,37,'http://localhost:3030/static/4a11530bbaimage-4.jpg','2024-01-16 03:50:26','2024-01-16 03:50:26',3),(57,37,'http://localhost:3030/static/fb12d64e25image-3.jpg','2024-01-16 03:50:26','2024-01-16 03:50:26',3),(58,38,'http://localhost:3030/static/6bd54ca3abimage-6.jpg','2024-01-16 03:51:23','2024-01-16 03:51:23',3),(59,38,'http://localhost:3030/static/2b8355a6a8image-7.jpg','2024-01-16 03:51:23','2024-01-16 03:51:23',3),(60,39,'http://localhost:3030/static/61af0d7cf8image-9.jpg','2024-01-16 03:53:05','2024-01-16 03:53:05',3),(62,42,'http://localhost:3030/static/3d99072c88image-5.jpg','2024-01-16 04:17:48','2024-01-16 04:17:48',3),(63,43,'http://localhost:3030/static/9ad703a30aimage-2.jpg','2024-01-16 07:26:38','2024-01-16 07:26:38',4),(64,43,'http://localhost:3030/static/7a9832898fimage-3.jpg','2024-01-16 07:26:38','2024-01-16 07:26:38',4),(65,43,'http://localhost:3030/static/dea31fa3a3image-4.jpg','2024-01-16 07:26:38','2024-01-16 07:26:38',4),(66,43,'http://localhost:3030/static/5edd0c8191image-1.jpg','2024-01-16 07:26:38','2024-01-16 07:26:38',4),(67,44,'http://localhost:3030/static/d4ed47e7f6image-9.jpg','2024-01-21 10:25:04','2024-01-21 10:25:04',5),(68,44,'http://localhost:3030/static/f31fcceab9image-7.jpg','2024-01-21 10:25:04','2024-01-21 10:25:04',5),(69,44,'http://localhost:3030/static/ac2e71242dimage-8.jpg','2024-01-21 10:25:04','2024-01-21 10:25:04',5),(70,44,'http://localhost:3030/static/d67f4dd388image-6.jpg','2024-01-21 10:25:04','2024-01-21 10:25:04',5),(71,45,'http://localhost:3030/static/98b32b38b8image-3.jpg','2024-01-24 13:12:31','2024-01-24 13:12:31',1),(72,45,'http://localhost:3030/static/da6ba23f5eimage-4.jpg','2024-01-24 13:12:31','2024-01-24 13:12:31',1),(73,45,'http://localhost:3030/static/17cb227a01image-2.jpg','2024-01-24 13:12:31','2024-01-24 13:12:31',1),(74,46,'http://localhost:3030/static/3d5cb7ee87layer1.png','2024-01-31 04:52:09','2024-01-31 04:52:09',1),(75,46,'http://localhost:3030/static/9d39817264layer2.png','2024-01-31 04:52:09','2024-01-31 04:52:09',1),(76,46,'http://localhost:3030/static/f2de1717e3layer3.png','2024-01-31 04:52:09','2024-01-31 04:52:09',1),(77,46,'http://localhost:3030/static/1ac9656f2clayer4.png','2024-01-31 04:52:09','2024-01-31 04:52:09',1),(78,47,'http://localhost:3030/static/86f0865151image-1.jpg','2024-02-01 02:49:31','2024-02-01 02:49:31',1),(79,48,'http://localhost:3030/static/f187a791f3Illustration.png','2024-02-02 13:01:02','2024-02-02 13:01:02',1),(80,49,'http://localhost:3030/static/214f94053bay.png','2024-02-02 13:03:03','2024-02-02 13:03:03',1);
/*!40000 ALTER TABLE `ac_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ac_post`
--

DROP TABLE IF EXISTS `ac_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ac_post` (
  `id_post` int(11) NOT NULL AUTO_INCREMENT,
  `post_title` varchar(255) DEFAULT NULL,
  `post_badge` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id_post`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `ac_user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ac_post`
--

LOCK TABLES `ac_post` WRITE;
/*!40000 ALTER TABLE `ac_post` DISABLE KEYS */;
INSERT INTO `ac_post` VALUES (37,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua','landscape',3,'2024-01-16 03:50:26','2024-01-16 03:50:26'),(38,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i','testing',3,'2024-01-16 03:51:23','2024-01-16 03:51:23'),(39,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor i','test',3,'2024-01-16 03:53:05','2024-01-16 03:53:05'),(42,'asd','asd',3,'2024-01-16 04:17:48','2024-01-16 04:17:48'),(43,'sasdads','adsf',4,'2024-01-16 07:26:38','2024-01-16 07:26:38'),(44,'faf','agag',5,'2024-01-21 10:25:04','2024-01-21 10:25:04'),(45,'asd','asd',1,'2024-01-24 13:12:31','2024-01-24 13:12:31'),(46,'Lorem ipsum dolor sit amet, consectetur adipiscing elit','Anatomy',1,'2024-01-31 04:52:09','2024-01-31 04:52:09'),(47,'test title','landscape',1,'2024-02-01 02:49:31','2024-02-01 02:49:31'),(48,'asd','asd',1,'2024-02-02 13:01:01','2024-02-02 13:01:01'),(49,'asd','asd',1,'2024-02-02 13:03:03','2024-02-02 13:03:03');
/*!40000 ALTER TABLE `ac_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ac_user`
--

DROP TABLE IF EXISTS `ac_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ac_user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_avatar` varchar(144) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ac_user`
--

LOCK TABLES `ac_user` WRITE;
/*!40000 ALTER TABLE `ac_user` DISABLE KEYS */;
INSERT INTO `ac_user` VALUES (1,'asd','$2b$13$WikmiAM./uPnR1CJi/GHS.1Kb2bsMhKPeqv5c/o9vjmhDGMNdLUB2','http://localhost:3030/static/def.jpg','2024-01-11 06:45:10','2024-01-11 06:45:10','asd'),(2,'asd','$2b$13$cKkpqj4wX5AgP5httSNr7uWoBDzD1dg17hIAUNFmVKA2Hjj.If0bG','/upload/avatar/defAvatar.jpg','2024-01-15 07:03:38','2024-01-15 07:03:38',NULL),(3,'asd1','$2b$13$0QCME.jxsOsAODJqBhPTBOSGbc5/ayTFUU55KNjlZ0uJAi4ho06sO','http://localhost:3030/static/def.jpg','2024-01-15 11:04:20','2024-01-15 11:04:20',NULL),(4,'asdf','$2b$13$8hoWciGTSmtbf.TWndlOa.gbuSHI/8TjVwN.9omria8HC0ZaM6Dla','http://localhost:3030/static/def.jpg','2024-01-16 07:25:54','2024-01-16 07:25:54',NULL),(5,'asda','$2b$13$uSJATNyXiN.lgPYtH/.R6.SBaH7hZc07Y0boZ8w7kyKgA4NnS.unu','http://localhost:3030/static/def.jpg','2024-01-21 10:22:59','2024-01-21 10:22:59',NULL);
/*!40000 ALTER TABLE `ac_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-02 20:32:05

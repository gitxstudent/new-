/*
SQLyog Ultimate - MySQL GUI v8.22 
MySQL - 5.1.51-community : Database - master_news
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `news_author` */

CREATE TABLE `news_author` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `author_user` text NOT NULL,
  `author_name` text NOT NULL,
  `author_view` int(11) NOT NULL,
  `author_post` int(11) NOT NULL,
  `author_intro` text NOT NULL,
  `author_sign` text NOT NULL,
  `author_type` int(11) NOT NULL,
  `author_status` int(11) NOT NULL,
  `author_field1` text NOT NULL,
  `author_field2` text NOT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `news_author` */

/*Table structure for table `news_catalog` */

CREATE TABLE `news_catalog` (
  `catalog_id` int(11) NOT NULL AUTO_INCREMENT,
  `catalog_name` text NOT NULL,
  `catalog_seo` text NOT NULL,
  `catalog_order` int(11) NOT NULL,
  `catalog_type` int(11) NOT NULL,
  `catalog_sub` int(11) NOT NULL,
  `catalog_url` text NOT NULL,
  PRIMARY KEY (`catalog_id`)
) ENGINE=MyISAM AUTO_INCREMENT=710 DEFAULT CHARSET=utf8;

/*Data for the table `news_catalog` */

insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (1,'Xã Hội','xa-hoi',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (2,'Thế giới','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (3,'Thể Thao','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (4,'Giáo dục','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (5,'Giải trí','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (6,'Nhịp sống trẻ','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (7,'Giới tính','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (8,'Sức khỏe','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (9,'Sức mạnh số','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (10,'Kinh doanh','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (11,'Ô tô - Xe máy','',0,0,0,'');
insert  into `news_catalog`(`catalog_id`,`catalog_name`,`catalog_seo`,`catalog_order`,`catalog_type`,`catalog_sub`,`catalog_url`) values (12,'Chuyện lạ','',0,0,0,'');

/*Table structure for table `news_title` */

CREATE TABLE `news_title` (
  `title_id` int(11) NOT NULL AUTO_INCREMENT,
  `title_title` text NOT NULL,
  `title_status` int(11) NOT NULL,
  `title_view` int(11) NOT NULL,
  `title_date` int(11) NOT NULL,
  `title_cid` int(11) NOT NULL,
  `title_aid` int(11) NOT NULL,
  `title_source` text NOT NULL,
  PRIMARY KEY (`title_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `news_title` */

insert  into `news_title`(`title_id`,`title_title`,`title_status`,`title_view`,`title_date`,`title_cid`,`title_aid`,`title_source`) values (1,'22 nữ sinh tại Phú Yên bị ngất xỉu',0,0,1297382400,1,0,'http://dantri.com.vn/c20/s20-456930/22-nu-sinh-tai-phu-yen-bi-ngat-xiu.htm');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

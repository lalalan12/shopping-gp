/*
 Navicat Premium Data Transfer

 Source Server         : lan
 Source Server Type    : MySQL
 Source Server Version : 50732
 Source Host           : localhost:3306
 Source Schema         : shopping

 Target Server Type    : MySQL
 Target Server Version : 50732
 File Encoding         : 65001

 Date: 21/05/2022 17:54:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin`  (
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
INSERT INTO `t_admin` VALUES ('admin', '21232f297a57a5a743894a0e4a801fc3');

-- ----------------------------
-- Table structure for t_car
-- ----------------------------
DROP TABLE IF EXISTS `t_car`;
CREATE TABLE `t_car`  (
  `pid` int(11) NOT NULL,
  `pname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `num` int(11) NOT NULL,
  `allprice` decimal(10, 2) NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `checked` tinyint(1) NOT NULL,
  PRIMARY KEY (`pid`, `username`) USING BTREE,
  INDEX `image`(`image`) USING BTREE,
  INDEX `t_car_ibfk_1`(`username`) USING BTREE,
  INDEX `t_car_ibfk_pname`(`pname`) USING BTREE,
  INDEX `t_car_ibfk_price`(`price`) USING BTREE,
  CONSTRAINT `t_car_ibfk_1` FOREIGN KEY (`username`) REFERENCES `t_user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_car_ibfk_pid` FOREIGN KEY (`pid`) REFERENCES `t_product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_car_ibfk_pname` FOREIGN KEY (`pname`) REFERENCES `t_product` (`pname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_car_ibfk_price` FOREIGN KEY (`price`) REFERENCES `t_product` (`price`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_car
-- ----------------------------
INSERT INTO `t_car` VALUES (2, '西装', 228.00, 1, 228.00, '小鱼', 'http://localhost:85/image/shopping/b015b544398d49fe98ba27dbe1ecd0fd.jpg', '2022年春季新款设计感小众复古高级感显瘦', 0);
INSERT INTO `t_car` VALUES (4, '运动裤', 165.00, 1, 165.00, '小狗', 'http://localhost:85/image/shopping/3511091dc1a440aaa4ea301012f7394a.jpg', '四色松紧腰运动裤女春秋新款韩版百塔休闲宽松直筒卫裤', 0);
INSERT INTO `t_car` VALUES (4, '运动裤', 165.00, 2, 330.00, '小鱼', 'https://gd1.alicdn.com/imgextra/i1/2414178298/O1CN01MvoTra2BAXI20Iv7q_!!2414178298.jpg', '四色松紧腰运动裤女春秋新款韩版百塔休闲宽松直筒卫裤', 0);
INSERT INTO `t_car` VALUES (5, '阔腿裤', 120.00, 1, 120.00, '小狗', 'http://localhost:85/image/shopping/1726f45cec564f97a71f92f8af0955dd.jpg', '2022现货风琴设计百塔高腰显瘦阔腿裤', 0);
INSERT INTO `t_car` VALUES (8, '老爹鞋', 278.00, 1, 278.00, '小鱼', 'https://gd2.alicdn.com/imgextra/i2/769956167/O1CN01DA0GTb1vQXH6xNrs7_!!769956167.jpg', '老爹鞋系带松糕厚底增高女鞋', 0);
INSERT INTO `t_car` VALUES (11, '连衣裙', 388.00, 1, 388.00, '小狗', 'http://localhost:85/image/shopping/a3b68abdb6c8425bbcfc0bd9291ceb73.jpg', '灰幕粉温柔仙气碎花度假风连衣裙长短款', 0);
INSERT INTO `t_car` VALUES (36, '卫衣套装', 229.00, 1, 229.00, '小鱼', 'http://localhost:85/image/shopping/bc516773116b42d5909f28492e76527d.jpg', 'freshtaro 奶油拼灰粉 加绒卫衣运动裤套装女新款加厚宽松百搭', 0);

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order`  (
  `oid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pid` int(11) NOT NULL,
  `pname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `num` int(11) NOT NULL,
  `allprice` decimal(10, 2) NOT NULL,
  `dates` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `state` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tel` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`oid`) USING BTREE,
  INDEX `t_order_ibfk_1`(`pid`) USING BTREE,
  INDEX `t_order_ibfk_2`(`pname`) USING BTREE,
  INDEX `t_order_ibfk_3`(`price`) USING BTREE,
  INDEX `t_order_ibfk_4`(`username`) USING BTREE,
  INDEX `t_order_ibfk_5`(`address`) USING BTREE,
  INDEX `t_order_ibfk_6`(`name`) USING BTREE,
  INDEX `t_order_ibfk_7`(`tel`) USING BTREE,
  CONSTRAINT `t_order_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `t_product` (`pid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_order_ibfk_2` FOREIGN KEY (`pname`) REFERENCES `t_product` (`pname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_order_ibfk_3` FOREIGN KEY (`price`) REFERENCES `t_product` (`price`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_order_ibfk_4` FOREIGN KEY (`username`) REFERENCES `t_user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_order_ibfk_5` FOREIGN KEY (`address`) REFERENCES `t_user` (`address`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_order_ibfk_6` FOREIGN KEY (`name`) REFERENCES `t_user` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_order_ibfk_7` FOREIGN KEY (`tel`) REFERENCES `t_user` (`tel`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_order
-- ----------------------------
INSERT INTO `t_order` VALUES ('1a1649644197', 1, '卫衣', 150.00, 2, 300.00, '2022-04-11 10:29:57', '未发货', '小狗', '爱心卫衣女2022新款慵懒秋冬宽松圆领修仙印花纯色上衣', 'http://localhost:85/image/shopping/ca073a53eb614b4ea37663cde52d98d9.jpg', '江西省新余市', '兰', '15279053960');
INSERT INTO `t_order` VALUES ('4e1648965664', 37, '衬衫', 129.00, 2, 258.00, '2022-04-03 14:01:04', '未发货', '小鱼', 'THELIGHT设计感提花衬衫女长袖秋新款黑白蓝小众中性宽松复古vibe', 'http://localhost:85/image/shopping/e7ed5f6c65ed4235bebe86ce4f235434.jpg', '江西省新余市', '兰', '15279053960');
INSERT INTO `t_order` VALUES ('681648960634', 8, '老爹鞋', 278.00, 1, 278.00, '2022-04-03 12:37:14', '未发货', '小狗', '老爹鞋系带松糕厚底增高女鞋', 'http://localhost:85/image/shopping/5536a4e6bf4e4b89962d46a8a89b5d96.jpg', '江西省新余市', '兰', '15279053960');
INSERT INTO `t_order` VALUES ('771653111814', 2, '西装', 228.00, 3, 684.00, '2022-05-21 13:43:34', '未发货', '小狗', '2022年春季新款设计感小众复古高级感显瘦', 'http://localhost:85/image/shopping/b015b544398d49fe98ba27dbe1ecd0fd.jpg', '江西省新余市', '兰', '15279053960');
INSERT INTO `t_order` VALUES ('891648965664', 3, '卫衣', 179.00, 1, 179.00, '2022-04-03 14:01:04', '未发货', '小鱼', '简单连帽卫衣女2022新款春秋显瘦薄款开衫外套', 'http://localhost:85/image/shopping/add709df971b46b4877fd36d42fb0c36.jpg', '江西省新余市', '兰', '15279053960');
INSERT INTO `t_order` VALUES ('a41648958863', 6, '背带裤', 130.00, 1, 130.00, '2022-04-03 12:07:43', '未发货', '小狗', '牛仔背带裤女学生可爱春秋季2022新款韩版宽松阔腿裤', 'http://localhost:85/image/shopping/5da30a5b34504116a9885a08a781c8c5.jpg', '江西省新余市', '兰', '15279053960');
INSERT INTO `t_order` VALUES ('b61648960621', 47, '洛丽塔', 3028.00, 1, 3028.00, '2022-04-03 12:37:01', '未发货', '小狗', '吉赛尔新色幽灵 花嫁OP古典玩偶原创 lolita洛丽塔连衣裙全款预售', 'http://localhost:85/image/shopping/d38b9eb4c4a54bcd99d8a079768ba297.jpg', '江西省新余市', '兰', '15279053960');
INSERT INTO `t_order` VALUES ('b91653104915', 8, '老爹鞋', 278.00, 1, 278.00, '2022-05-21 11:48:35', '未发货', '小狗', '老爹鞋系带松糕厚底增高女鞋', 'http://localhost:85/image/shopping/5536a4e6bf4e4b89962d46a8a89b5d96.jpg', '江西省新余市', '兰', '15279053960');
INSERT INTO `t_order` VALUES ('ec1648965664', 34, '西装外套', 148.00, 1, 148.00, '2022-04-14 14:48:42', '已完成', '小鱼', '西装外套女春秋2021新款韩版气质设计感小众高级感小个子chic西服', 'http://localhost:85/image/shopping/fef08d59b89142a7ac5b04f5796d5071.jpg', '江西省新余市', '兰', '15279053960');

-- ----------------------------
-- Table structure for t_product
-- ----------------------------
DROP TABLE IF EXISTS `t_product`;
CREATE TABLE `t_product`  (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `pname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `image` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `num` int(11) NOT NULL,
  `tid` int(10) NOT NULL,
  PRIMARY KEY (`pid`) USING BTREE,
  INDEX `pname`(`pname`) USING BTREE,
  INDEX `price`(`price`) USING BTREE,
  INDEX `image`(`image`) USING BTREE,
  INDEX `t_product_ibfk_1`(`tid`) USING BTREE,
  CONSTRAINT `t_product_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `t_product_type` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 53 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_product
-- ----------------------------
INSERT INTO `t_product` VALUES (1, '卫衣', 150.00, 'http://localhost:85/image/shopping/ca073a53eb614b4ea37663cde52d98d9.jpg', '爱心卫衣女2022新款慵懒秋冬宽松圆领修仙印花纯色上衣', 100, 1);
INSERT INTO `t_product` VALUES (2, '西装', 228.00, 'http://localhost:85/image/shopping/b015b544398d49fe98ba27dbe1ecd0fd.jpg', '2022年春季新款设计感小众复古高级感显瘦', 97, 1);
INSERT INTO `t_product` VALUES (3, '卫衣', 179.00, 'http://localhost:85/image/shopping/add709df971b46b4877fd36d42fb0c36.jpg', '简单连帽卫衣女2022新款春秋显瘦薄款开衫外套', 97, 1);
INSERT INTO `t_product` VALUES (4, '运动裤', 165.00, 'http://localhost:85/image/shopping/3511091dc1a440aaa4ea301012f7394a.jpg', '四色松紧腰运动裤女春秋新款韩版百塔休闲宽松直筒卫裤', 98, 2);
INSERT INTO `t_product` VALUES (5, '阔腿裤', 120.00, 'http://localhost:85/image/shopping/1726f45cec564f97a71f92f8af0955dd.jpg', '2022现货风琴设计百塔高腰显瘦阔腿裤', 96, 2);
INSERT INTO `t_product` VALUES (6, '背带裤', 130.00, 'http://localhost:85/image/shopping/5da30a5b34504116a9885a08a781c8c5.jpg', '牛仔背带裤女学生可爱春秋季2022新款韩版宽松阔腿裤', 98, 2);
INSERT INTO `t_product` VALUES (7, '小白鞋', 132.00, 'http://localhost:85/image/shopping/845cc2d94023423ca0616e3ac8d43b65.jpg', '回力奶油大头鞋厚底小白鞋女夏季百塔鞋子小众设计女生板鞋', 99, 3);
INSERT INTO `t_product` VALUES (8, '老爹鞋', 278.00, 'http://localhost:85/image/shopping/5536a4e6bf4e4b89962d46a8a89b5d96.jpg', '老爹鞋系带松糕厚底增高女鞋', 98, 3);
INSERT INTO `t_product` VALUES (9, '运动鞋', 359.00, 'http://localhost:85/image/shopping/0cf02d95dbc14631ac76440e26deea7e.jpg', '安踏女鞋跑步鞋2022年秋春季新款全掌气垫休闲鞋', 100, 3);
INSERT INTO `t_product` VALUES (10, '连衣裙', 169.00, 'http://localhost:85/image/shopping/3e7b3767811d4392a3200f8ad359e450.jpg', '温柔气质中长款收腰V领碎花连衣裙', 99, 4);
INSERT INTO `t_product` VALUES (11, '连衣裙', 388.00, 'http://localhost:85/image/shopping/a3b68abdb6c8425bbcfc0bd9291ceb73.jpg', '灰幕粉温柔仙气碎花度假风连衣裙长短款', 95, 4);
INSERT INTO `t_product` VALUES (12, '百褶裙', 128.00, 'http://localhost:85/image/shopping/07b506bfb9aa42b09dee2b9c6fc0693e.jpg', '迪士尼小熊维尼原创森女部落JK格裙正版学院风百褶半身裙秋冬女裙', 99, 4);
INSERT INTO `t_product` VALUES (34, '西装外套', 148.00, 'http://localhost:85/image/shopping/fef08d59b89142a7ac5b04f5796d5071.jpg', '西装外套女春秋2021新款韩版气质设计感小众高级感小个子chic西服', 99, 1);
INSERT INTO `t_product` VALUES (35, '短袖开衫', 103.00, 'http://localhost:85/image/shopping/f37d0e3fe05d4ca4acec1e9807c6e4cf.jpg', '七个羊 夏季冰丝短袖v领黑色针织小开衫女薄款短款泡泡袖上衣披肩', 100, 1);
INSERT INTO `t_product` VALUES (36, '卫衣套装', 229.00, 'http://localhost:85/image/shopping/bc516773116b42d5909f28492e76527d.jpg', 'freshtaro 奶油拼灰粉 加绒卫衣运动裤套装女新款加厚宽松百搭', 100, 1);
INSERT INTO `t_product` VALUES (37, '衬衫', 129.00, 'http://localhost:85/image/shopping/e7ed5f6c65ed4235bebe86ce4f235434.jpg', 'THELIGHT设计感提花衬衫女长袖秋新款黑白蓝小众中性宽松复古vibe', 98, 1);
INSERT INTO `t_product` VALUES (38, '衬衫', 395.00, 'http://localhost:85/image/shopping/ee079bef7de34a238146bfbd56add3f0.jpg', '鹿与飞鸟 日系复古百搭格子宽松加厚毛呢衬衫外套2034', 100, 1);
INSERT INTO `t_product` VALUES (39, '风衣', 168.00, 'http://localhost:85/image/shopping/9c24bcbdc08a4b4c9cb69fd8185d504e.jpg', '风衣外套女春秋2022新款中长款英伦风小个子高级垂感chic气质大衣', 100, 1);
INSERT INTO `t_product` VALUES (40, '背带裤', 195.00, 'http://localhost:85/image/shopping/89f90715cba248fcbbbe62d635e82137.jpg', 'freshtaro 诱人奶油黄 减龄显瘦直筒阔腿长裤潮宽松牛仔背带裤女', 99, 2);
INSERT INTO `t_product` VALUES (41, '休闲裤', 58.00, 'http://localhost:85/image/shopping/a8b13ee539fd498eaef600fa5294c553.jpg', '樱田川岛ins韩版宽松直筒短裤2022夏季新款百搭休闲阔腿五分裤女', 100, 2);
INSERT INTO `t_product` VALUES (42, '牛仔裤', 79.00, 'http://localhost:85/image/shopping/71d6db2808f74fa0a8b194e3b04bdb46.jpg', '薄荷星球 破洞牛仔裤女街头韩版宽松直筒休闲裤夏薄款bf九分裤子', 100, 2);
INSERT INTO `t_product` VALUES (43, '工装裤', 108.00, 'http://localhost:85/image/shopping/a2eda6e45509453e8b4e0cf1a198d561.jpg', '火山马日系工装裤女休闲学生宽松直筒裤夏季薄款裤子九分裤阔腿裤', 100, 2);
INSERT INTO `t_product` VALUES (44, '皮鞋', 128.00, 'http://localhost:85/image/shopping/e2e8d68c44774310bb1f26f1c5c9c6c6.jpg', '34小码女鞋313233单鞋高跟鞋粗跟厚底玛丽珍鞋英伦小皮鞋女乐福鞋', 100, 3);
INSERT INTO `t_product` VALUES (45, '连衣裙', 139.00, 'http://localhost:85/image/shopping/c87ee73731cf4b1ba7762e2a8ddff5bf.jpg', '安小落夏季连衣裙女法式设计感小众高腰茶歇裙轻熟风绣花公主裙子', 100, 4);
INSERT INTO `t_product` VALUES (46, '连衣裙', 1298.00, 'http://localhost:85/image/shopping/e52351595ad84d4ab58ac1f516ddd700.jpg', '2022夏季新款纯亚麻连衣裙女文艺范复古拼接宽松显瘦显高长裙夏天', 100, 4);
INSERT INTO `t_product` VALUES (47, '洛丽塔', 3028.00, 'http://localhost:85/image/shopping/d38b9eb4c4a54bcd99d8a079768ba297.jpg', '吉赛尔新色幽灵 花嫁OP古典玩偶原创 lolita洛丽塔连衣裙全款预售', 99, 4);
INSERT INTO `t_product` VALUES (48, '洛丽塔', 258.00, 'http://localhost:85/image/shopping/48e0805c6aca42529a77b627a70fdc71.jpg', '喵艾卿现货轻Lo纯黑白色Lolita原创优雅日常洛丽塔裙卡罗尔庄园OP', 100, 4);
INSERT INTO `t_product` VALUES (49, '汉服', 228.00, 'http://localhost:85/image/shopping/bf912549178949f9b80eb8930af2a776.jpg', '池夏 芒种·菱歌 宋制对襟衫褙子三件套正品原创改良汉服中国风', 100, 4);
INSERT INTO `t_product` VALUES (50, '汉服', 208.00, 'http://localhost:85/image/shopping/4f4074125af04f5a978b1569b24b2fda.jpg', '原创魏晋风汉服女仙气飘逸古风广袖流仙裙夏季中国风齐腰古装春秋', 100, 4);
INSERT INTO `t_product` VALUES (51, '马丁靴', 148.00, 'http://localhost:85/image/shopping/9c6e0b61ae32495daa6f49be75ff252a.jpg', '真皮马丁靴女ins酷英伦风2021秋冬新款厚底春秋单靴百搭加绒短靴', 100, 3);

-- ----------------------------
-- Table structure for t_product_type
-- ----------------------------
DROP TABLE IF EXISTS `t_product_type`;
CREATE TABLE `t_product_type`  (
  `tid` int(10) NOT NULL,
  `tname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`tid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_product_type
-- ----------------------------
INSERT INTO `t_product_type` VALUES (1, '上衣');
INSERT INTO `t_product_type` VALUES (2, '下裤');
INSERT INTO `t_product_type` VALUES (3, '鞋子');
INSERT INTO `t_product_type` VALUES (4, '裙子');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tel` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`username`) USING BTREE,
  INDEX `address`(`address`) USING BTREE,
  INDEX `name`(`name`) USING BTREE,
  INDEX `tel`(`tel`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('小兔', 'b0baee9d279d34fa1dfd71aadb908c3f', '兰', '江西省宜春市', '15279053960');
INSERT INTO `t_user` VALUES ('小狗', 'b0baee9d279d34fa1dfd71aadb908c3f', '兰', '江西省新余市', '15279053960');
INSERT INTO `t_user` VALUES ('小猫', 'b0baee9d279d34fa1dfd71aadb908c3f', '兰', '江西省新余市', '15279053960');
INSERT INTO `t_user` VALUES ('小鱼', 'b0baee9d279d34fa1dfd71aadb908c3f', '兰', '江西省新余市', '15279053960');

-- ----------------------------
-- Triggers structure for table t_order
-- ----------------------------
DROP TRIGGER IF EXISTS `oid`;
delimiter ;;
CREATE TRIGGER `oid` BEFORE INSERT ON `t_order` FOR EACH ROW set New.oid= concat(substring(MD5(RAND()),1,2),unix_timestamp(current_timestamp()))
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;

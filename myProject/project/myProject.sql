SET NAMES UTF8;
DROP DATABASE IF EXISTS myproject;
CREATE DATABASE myproject CHARSET=UTF8;
USE myproject;
CREATE TABLE user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(16),
	email VARCHAR(32),
	gender TINYINT,
	user_name VARCHAR(16),
	phone VARCHAR(11),
	upwd VARCHAR(32)
);
INSERT INTO user VALUES(1,"dingding","dingding@163.com",1,"丁丁","18246346123",'123456');
INSERT INTO user VALUES(2,"dingding","dingding@163.com",1,"丁丁","18246346123",'123456');
CREATE TABLE product(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	pbrand VARCHAR(64),
	originalPrice VARCHAR(32),
	price VARCHAR(32),
	imgUrl VARCHAR(128),
	title VARCHAR(256)
);
/*lastest product list*/
INSERT INTO product VALUES(1,'lastest','79.9','45.00','a1.png',"男装 T-shirt 短袖 黑色 圆领 man");
INSERT INTO product VALUES(2,'lastest','179.9','45.00','a2.png',"男装 T-shirt 短袖 黑色 圆领 man");
INSERT INTO product VALUES(3,'lastest','89.9','45.00','a3.png',"男装 T-shirt 短袖 黑色 圆领 man");
INSERT INTO product VALUES(4,'lastest','119.9','45.00','a4.png',"女装 T-shirt 长袖 红色 圆领 man 新品");
INSERT INTO product VALUES(5,'lastest','69.9','45.00','a5.png',"女装 T-shirt 短袖 黑色  灰色 圆领 man 新品");
INSERT INTO product VALUES(6,'lastest','79.9','45.00','a6.png',"女装 T-shirt 短袖 黑色 圆领 时尚 man 新品");
INSERT INTO product VALUES(7,'lastest','79.9','45.00','a7.png',"女装 T-shirt 短袖 黑色 圆领 时尚 woman 长裙 新品");
INSERT INTO product VALUES(8,'lastest','79.9','45.00','a8.png',"男装 T-shirt 西装 约会 黑色 时尚 圆领 man 新品");
INSERT INTO product VALUES(9,'lastest','79.9','45.00','g1.png',"女装 T-shirt 短袖 黑色 时尚 圆领 woman 新品");
INSERT INTO product VALUES(10,'lastest','79.9','45.00','g2.png',"男装 T-shirt 马甲 绅士 短袖 黑色 圆领 man 新品");
INSERT INTO product VALUES(11,'lastest','79.9','45.00','g3.png',"男装 T-shirt 衬衫 黑色 酒红色 圆领 woman 新品");
INSERT INTO product VALUES(12,'lastest','79.9','45.00','mw2.png',"男装 pole衫 短袖 黑色 圆领 man 新品");
/*special_offer_contain*/
INSERT INTO product VALUES(null,'special','79.9','45.00','mw1.png',"凉鞋 儿童 时尚 鞋 卡其色");
INSERT INTO product VALUES(null,'special','179.9','45.00','w1.png',"鞋 女 坡跟 时尚 新品 凉鞋");
INSERT INTO product VALUES(null,'special','89.9','45.00','w2.png',"鞋 女 坡跟 时尚 新品 凉鞋 ");
INSERT INTO product VALUES(null,'special','119.9','45.00','mw3.png',"鞋 男鞋  旅游鞋 时尚 新品 运动鞋");
INSERT INTO product VALUES(null,'special','69.9','45.00','ep2.png',"手表 运动 时尚 石英表 黑色 新品");
INSERT INTO product VALUES(null,'special','79.9','45.00','ep3.png',"手表 运动 时尚 石英表 黑色 新品");

INSERT INTO product VALUES(null,'collection','79.9','45.00','g1.png',"女装 T-shirt 短袖 条纹 时尚 圆领 woman 新品");
INSERT INTO product VALUES(null,'collection','179.9','45.00','g2.png',"男装 T-shirt 马甲 绅士 短袖 黑色 圆领 man 新品");
INSERT INTO product VALUES(null,'collection','89.9','45.00','g3.png',"男装 T-shirt 衬衫 黑色 酒红色 圆领 woman 新品");
INSERT INTO product VALUES(null,'collection','119.9','45.00','mw2.png',"男装 pole衫 短袖 红色 圆领 man 新品");
INSERT INTO product VALUES(null,'collection','69.9','45.00','w3.png',"单肩包 女包 新品 时尚 女生 ");
INSERT INTO product VALUES(null,'collection','79.9','45.00','w4.png',"单肩包 女包 新品 时尚 女生 ");
INSERT INTO product VALUES(null,'a','79.9','45.00','a1.png',"男装 T-shirt 短袖 黑色 圆领 man");
INSERT INTO product VALUES(null,'a','179.9','45.00','a2.png',"男装 T-shirt 短袖 黑色 圆领 man");
INSERT INTO product VALUES(null,'a','89.9','45.00','a3.png',"男装 T-shirt 短袖 黑色 圆领 man");
INSERT INTO product VALUES(null,'a','119.9','45.00','a4.png',"女装 T-shirt 长袖 红色 圆领 man 新品");
INSERT INTO product VALUES(null,'a','69.9','45.00','a5.png',"女装 T-shirt 短袖 黑色  灰色 圆领 man 新品");
INSERT INTO product VALUES(null,'a','79.9','45.00','a6.png',"女装 T-shirt 短袖 黑色 圆领 时尚 man 新品");
INSERT INTO product VALUES(null,'a','79.9','45.00','a7.png',"女装 T-shirt 短袖 黑色 圆领 时尚 woman 长裙 新品");
INSERT INTO product VALUES(null,'a','79.9','45.00','a8.png',"男装 T-shirt 西装 约会 黑色 时尚 圆领 man 新品");
INSERT INTO product VALUES(null,'a','79.9','45.00','g1.png',"女装 T-shirt 短袖 黑色 时尚 圆领 woman 新品");
INSERT INTO product VALUES(null,'a','79.9','45.00','g2.png',"男装 T-shirt 马甲 绅士 短袖 黑色 圆领 man 新品");
INSERT INTO product VALUES(null,'a','79.9','45.00','g3.png',"男装 T-shirt 衬衫 黑色 酒红色 圆领 woman 新品");
INSERT INTO product VALUES(null,'a','79.9','45.00','mw2.png',"男装 pole衫 短袖 黑色 圆领 man 新品");
/*special_offer_contain*/
INSERT INTO product VALUES(null,'a','79.9','45.00','mw1.png',"凉鞋 儿童 时尚 鞋 卡其色");
INSERT INTO product VALUES(null,'a','179.9','45.00','w1.png',"鞋 女 坡跟 时尚 新品 凉鞋");
INSERT INTO product VALUES(null,'a','89.9','45.00','w2.png',"鞋 女 坡跟 时尚 新品 凉鞋 ");
INSERT INTO product VALUES(null,'a','119.9','45.00','mw3.png',"鞋 男鞋  旅游鞋 时尚 新品 运动鞋");
INSERT INTO product VALUES(null,'a','69.9','45.00','ep2.png',"手表 运动 时尚 石英表 黑色 新品");
INSERT INTO product VALUES(null,'a','79.9','45.00','ep3.png',"手表 运动 时尚 石英表 黑色 新品");

INSERT INTO product VALUES(null,'a','79.9','45.00','g1.png',"女装 T-shirt 短袖 条纹 时尚 圆领 woman 新品");
INSERT INTO product VALUES(null,'a','179.9','45.00','g2.png',"男装 T-shirt 马甲 绅士 短袖 黑色 圆领 man 新品");
INSERT INTO product VALUES(null,'a','89.9','45.00','g3.png',"男装 T-shirt 衬衫 黑色 酒红色 圆领 woman 新品");
INSERT INTO product VALUES(null,'a','119.9','45.00','mw2.png',"男装 pole衫 短袖 红色 圆领 man 新品");
INSERT INTO product VALUES(null,'a','69.9','45.00','w3.png',"单肩包 女包 新品 时尚 女生 ");
INSERT INTO product VALUES(null,'a','79.9','45.00','w4.png',"单肩包 女包 新品 时尚 女生 ");

/*购物车模块*/

CREATE TABLE shoppingCart(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT,
	prid INT,
	pcount INT,
	foreign key(uid) references user(uid),
	foreign key(prid) references product(pid)
);
INSERT INTO shoppingCart VAlUES(null,1,1,10);
INSERT INTO shoppingCart VAlUES(null,1,2,4);
INSERT INTO shoppingCart VAlUES(null,1,3,3);
INSERT INTO shoppingCart VAlUES(null,2,1,10);
INSERT INTO shoppingCart VAlUES(null,2,1,4);
INSERT INTO shoppingCart VAlUES(null,2,1,3);
-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2020 at 05:18 AM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tomato`
--

-- --------------------------------------------------------

--
-- Table structure for table `basics`
--

CREATE TABLE `basics` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `basics`
--

INSERT INTO `basics` (`id`, `type`, `name`, `url`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'prod-category', 'Fruits', 'fruits', NULL, '22', '2020-03-08 12:07:37', '2020-06-07 06:20:32'),
(2, 'prod-category', 'Vegetables', 'vegetables', NULL, '22', '2020-03-08 12:30:55', '2020-06-07 06:20:14'),
(3, 'prod-category', 'Milk products', 'milk-products', NULL, '22', '2020-03-08 12:31:11', '2020-06-07 06:20:40'),
(4, 'prod-category', 'Bakery', 'bakery', NULL, '22', '2020-06-07 05:50:53', '2020-06-07 05:50:53'),
(5, 'prod-category', 'Non Veg', 'non-veg', NULL, '22', '2020-06-07 05:51:05', '2020-06-07 05:51:05'),
(6, 'prod-category', 'Special', 'special', NULL, '22', '2020-06-07 05:51:17', '2020-06-07 05:51:17');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `caption` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_img` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` mediumtext COLLATE utf8mb4_unicode_ci,
  `category` mediumtext COLLATE utf8mb4_unicode_ci,
  `tag` mediumtext COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `display` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `caption`, `url`, `cover_img`, `images`, `category`, `tag`, `content`, `display`, `remember_token`, `created_at`, `updated_at`) VALUES
(6, 'How to hire a digital marketing agency in Gurgaon', 'This is caption', 'digital-marketing-agency2', '1584639350.jpg', '[\"1584640014-1.jpg\",\"1584640014-2.jpg\",\"1584640014-3.jpg\",\"1584640014-4.jpg\",\"1584640014-5.jpg\"]', '\"Cat 1 Namex,Cat 2 Namex,cat51\"', '\"Tag 1 Namex,Tag 2 Namex\"', '<p>NOHGA HOTEL UENO の朝食ビュッフェのスタイリングをさせていただきました。<br />\nホテル１階のBistro NOHGA は、地元の老舗や名店で製造・販売されている佃煮、お漬物、お味噌、お米、コーヒー豆、などなどを取り入れたメニューが楽しめる、ちょっと変わったビストロです。<br />\n今回は開業１周年を迎えるにあたり、朝食ビュッフェのスタイリングを一新するお手伝いをしました。すでにあるメニューは全く変えずに、ディスプレイの変更だけで見せ方を変えるというお仕事です。普段のケータリングで大きなテーブルに盛り付けをする感覚で、グリーンの使い方に工夫をしたり、高低差を生かしたディスプレイにしています。黒い鉄のディスプレイ台はお隣墨田区の「中村仲製作所」に作っていただきました。</p>\n\n<p>I directed the styling for breakfast buffet for NOHGA HOTEL UENO.<br />\nBistro NOHGA, located on the first floor of this hotel, is a bistro where you can enjoy a menu that incorporates pickles, miso, rice, coffee beans, etc., made at a local store.<br />\nThis time, I renewed the breakfast buffet styling, making the appearance attractive by changing the display only, without changing the existing menu. The black display stand was made by &ldquo;Nakamura Naka Seisakusho&rdquo; in the neighboring Sumida Ward.</p>', '1', '22', '2020-03-19 11:53:51', '2020-03-19 12:16:54');

-- --------------------------------------------------------

--
-- Table structure for table `blog_metas`
--

CREATE TABLE `blog_metas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_metas`
--

INSERT INTO `blog_metas` (`id`, `type`, `name`, `url`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'category', 'Cat 1 Namex', 'Cat 1 URL', '22', '2020-02-23 11:48:37', '2020-02-23 11:51:53'),
(2, 'category', 'Cat 2 Namex', 'Cat 2 URL', '22', '2020-02-23 11:49:37', '2020-02-23 11:51:57'),
(3, 'tag', 'Tag 1 Namex', 'Tag 1 URL', '22', '2020-02-23 11:51:18', '2020-02-23 11:51:48'),
(4, 'tag', 'Tag 2 Namex', 'Tag 2 URL', '22', '2020-02-23 11:51:36', '2020-02-23 11:51:44'),
(5, 'category', 'cat51', 'cat51', '22', '2020-03-05 06:16:41', '2020-03-05 06:16:48');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `_token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `metas`
--

CREATE TABLE `metas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` mediumtext COLLATE utf8mb4_unicode_ci,
  `description` mediumtext COLLATE utf8mb4_unicode_ci,
  `keyword` mediumtext COLLATE utf8mb4_unicode_ci,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `metas`
--

INSERT INTO `metas` (`id`, `url`, `title`, `description`, `keyword`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'https://www.yocreativ.com/111', 'test1', 'test 2', 'test3', '22', '2020-02-23 12:06:22', '2020-03-05 06:26:30'),
(2, 'http://www.indiaenigma.com/', 'wwwwwww', 'qqqqq', 'eeeeeeee', '22', '2020-02-23 12:08:06', '2020-02-23 12:08:06'),
(3, 'http://www.amitkk.com/', 'ttttt', 'tttt', 'ttttttttttt', '22', '2020-03-05 06:26:24', '2020-03-05 06:26:24'),
(4, 'default', 'default title', 'default description', 'default keyword', '22', '2020-03-05 06:38:19', '2020-03-05 06:38:19');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2020_02_23_130603_create_blogs_table', 1),
(4, '2020_02_23_130620_create_blog_metas_table', 1),
(5, '2020_02_23_130634_create_metas_table', 1),
(6, '2020_02_23_130644_create_contacts_table', 1),
(7, '2020_03_05_123003_create_products_table', 2),
(8, '2020_03_08_173440_create_basics_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` mediumtext COLLATE utf8mb4_unicode_ci,
  `sku` mediumtext COLLATE utf8mb4_unicode_ci,
  `sale` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `short_desc` mediumtext COLLATE utf8mb4_unicode_ci,
  `long_desc` mediumtext COLLATE utf8mb4_unicode_ci,
  `display` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `url`, `category`, `images`, `sku`, `sale`, `short_desc`, `long_desc`, `display`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Tomato', 'tomato', '2', '[\"1591519268-1.jpg\",\"1591519268-2.jpg\",\"1591519268-3.jpg\",\"1591519268-4.jpg\",\"1591519268-5.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"20\\\",\\\"tomato-1\\\"]\",\"[\\\"1 kg\\\",\\\"35\\\",\\\"tomato-2\\\"]\",\"[\\\"3 kg\\\",\\\"90\\\",\\\"tomato-3\\\"]\"]', '50% Discount', '<p>Tomatoes are the major dietary source of the antioxidant lycopene, which has been linked to many health benefits, including reduced risk of heart disease and cancer.</p>\n\n<p>Usually red when mature, tomatoes can also come in a variety of colors, including yellow, orange, green, and purple. What&rsquo;s more, many subspecies of tomatoes exist with different shapes and flavor.</p>', '<p><br />\nTomatoes are available in a wide variety of sizes, from tiny grape-size types to giant ones.&nbsp;The choice&nbsp;also depends on how you will use this verstaile fruit in the kitchen. For example, Roma tomatoes are not very good eaten fresh, but are well suited for sauces and ketchups.&nbsp;</p>\n\n<p>However, keep in mind that ketchup is often consumed in very small amounts. Thus, it may be easier to bump up your lycopene intake by eating unprocessed tomatoes &mdash; which also have far less sugar than ketchup.</p>\n\n<p>Other foods in your diet may have a strong effect on lycopene absorption. Consuming this plant compound with a source of fat can increase absorption by up to four times.</p>\n\n<p>They are also a great source of vitamin C, potassium, folate, and vitamin K.</p>', NULL, '22', '2020-06-07 03:11:08', '2020-06-07 06:43:08'),
(3, 'Banana', 'banana', '1', '[\"1591583644-1.jpg\",\"1591583644-2.jpg\",\"1591583644-3.jpg\",\"1591583644-4.jpg\"]', '[\"[\\\"1Kg\\\",\\\"30\\\",\\\"banana-1\\\"]\",\"[\\\"3kg\\\",\\\"80\\\",\\\"banana-2\\\"]\",\"[\\\"5Kg\\\",\\\"130\\\",\\\"banana-3\\\"]\"]', NULL, '<p>Relish the soft, buttery texture of Robusta bananas that are light green and have a great fragrance and taste. The stalks of Robusta&rsquo;s are thick and rigid. Fresh fruits are green, which revolve to a bright yellow on ripening and the flesh contains a white - ceramic colour. Robusta are fine quality, sweet flavoured, mushy and soft bananas.&nbsp; Do not forget to check our delicious fruit recipe.<br />\n<br />\n&nbsp;</p>', '<p>One banana supplies 30 percent of the daily vitamin B6 requirement and is rich in vitamin C and potassium. It reduces the appetite and promotes weight loss. Very good for pregnant women and athletes. It also boosts the immune system and keeps bones strong. Store them in a cool, dry place away from direct sunlight. Fresh, raw yelakkis are green. They turn into golden yellow on ripening. Look for brown speckles and yellow skin to identify ripened ones.&nbsp;Slice them onto pancakes, blend into smoothies or add to fruit salads. Heat brings out the bananas&#39; creamy sweetness. Try baking or saut&eacute;ing them with butter and sugar for a delicious dessert.&nbsp;<br />\n<br />\n&nbsp;</p>', NULL, '22', '2020-06-07 21:04:04', '2020-06-07 21:04:04'),
(4, 'Apple', 'apple', '1', '[\"1591583838-1.jpg\",\"1591583838-2.jpg\",\"1591583838-3.jpg\",\"1591583838-4.jpg\",\"1591583838-5.jpg\"]', '[\"[\\\"1Kg\\\",\\\"100\\\",\\\"apple-1\\\"]\",\"[\\\"3kg\\\",\\\"250\\\",\\\"apple-2\\\"]\",\"[\\\"5kg\\\",\\\"400\\\",\\\"apple-3\\\"]\"]', NULL, '<p>The bright red coloured and heart shaped Washington apples are crunchy, juicy and slightly sweet. Washington Apples are a natural source of fibre and are fat free. They contain a wide variety of anti-oxidants and poly-nutrients.&nbsp; Do not forget to check our delicious fruit recipe</p>', '<p>The phytonutrients and antioxidants in apples may help reduce the risk of developing cancer, hypertension, diabetes, and heart disease. It can potentially improve neurological health that prevents dementia, lower levels of bad cholesterol. Store them in a cool, dry place away from direct sunlight. Wrap them with newspaper individually to keep them fresh for a long time. If any apple goes bad, it protects other apples from getting spoiled. Take a cup of water, dissolve 1/8th teaspoon of salt in it. Soak freshly cut slices and drain them. Now, rinse them in fresh water so that they will not taste salty. Can be eaten as a fresh fruit or used in salads, fruit hats, smoothies, cookies, pies. Roast Apple peel into a crispy snack.</p>', NULL, '22', '2020-06-07 21:07:18', '2020-06-07 21:07:18'),
(5, 'Grapes', 'grapes', '1', '[\"1591583927-1.jpg\",\"1591583927-2.jpg\",\"1591583927-3.jpg\",\"1591583927-4.jpg\"]', '[\"[\\\"1Kg\\\",\\\"40\\\",\\\"grapes-1\\\"]\",\"[\\\"3Kg\\\",\\\"100\\\",\\\"grapes-3\\\"]\",\"[\\\"5kg\\\",\\\"150\\\",\\\"grapes-3\\\"]\"]', NULL, '<p>Good-quality seeded green grapes are plump and have a yellow or straw colouring, with a fairly large size. Their seeds are edible and nutritious.&nbsp; These grapes are rich in vitamin C, K and A along with flavonoids and minerals. They help in boosting immunity and are a healthy snack for your kids.</p>', '<p>Green grapes with seeds are a good source of fibre. So, they help in weight loss. They boost the immune system. Grape seeds are edible. They improve skin, heart and oral health and also the bone strength. Wash the grapes under cool, running water. Pat them dry and store it in the refrigerator.&nbsp; Rinse well and eat them right off the vine for a healthy, refreshing snack any time of day. You can also freeze them and toss them in drinks. Make your salads and curd rice colourful by adding these refreshing and sweet grapes. Please note that fresh fruit and vegetables items will be billed based on exact weight during order processing (in case the actual weight exceeds the requested weight by more than 10%, you will be charged only for 10% excess weight).</p>', NULL, '22', '2020-06-07 21:08:47', '2020-06-07 21:08:47'),
(6, 'Watermelon', 'Watermelon', '1', '[\"1591584006-1.jpg\",\"1591584006-2.jpg\",\"1591584006-3.jpg\",\"1591584006-4.jpg\",\"1591584006-5.jpg\"]', '[\"[\\\"3kg\\\",\\\"75\\\",\\\"watermelon-1\\\"]\",\"[\\\"6kg\\\",\\\"120\\\",\\\"watermelon-2\\\"]\",\"[\\\"10kg\\\",\\\"200\\\",\\\"watermelon-3\\\"]\"]', NULL, '<p>With greenish black to smooth dark green surface, watermelons are globular in shape and are freshly picked for you directly from our farmers. The juicy, sweet and grainy textured flesh is filled with 12-14% of sugar content, making it a healthy alternative to sugary carbonated drinks. Flesh colour of these watermelons are pink to red with dark brown/black seeds.</p>', '<p>Watermelons have excellent hydrating properties with 90% water content.&nbsp; Rich in anti-oxidant flavonoids that protects against prostate, breast, colon, pancreatic and lung cancers. They are an excellent source of lycopene which protects skin against harmful UV rays. It is also a great source for A, C, B-complex vitamins, iron and fibre which boosts body metabolism.&nbsp;Store them in a cool, dry place away from direct sunlight. Cut and serve the melons chilled. Can be eaten fresh- scoop them up with ice creams or in fruit salads. Spice up your watermelon with a tinge of mint leaves. Used in cocktails and fresh juices which also serves as a healthy alternative to sugary carbonated drinks. Rind can be used to prepare pickles, curries and pies. Seeds can be roasted with salt and consumed.<br />\n<br />\n&nbsp;</p>', NULL, '22', '2020-06-07 21:10:06', '2020-06-07 21:10:06'),
(7, 'Papaya', 'Papaya', '1', '[\"1591584132-1.jpg\",\"1591584132-2.jpg\",\"1591584132-3.jpg\",\"1591584132-4.jpg\",\"1591584132-5.jpg\"]', '[\"[\\\"1kg\\\",\\\"50\\\",\\\"Papaya-1\\\"]\",\"[\\\"2Kg\\\",\\\"80\\\",\\\"Papaya-2\\\"]\",\"[\\\"5Kg\\\",\\\"200\\\",\\\"Papaya-3\\\"]\"]', NULL, '<p>Semi ripe papayas have blend of sweet buttery consistency and sour taste. They are half green and half yellow. Ripe papaya has orange flesh and black coloured seeds at the centre. Do not forget to check our delicious fruit recipe.</p>', '<p>Papayas reduce the risk of macular degeneration, a disease that affects the eyes as people age. They prevent asthma and cancer. Mashed papayas help in wound healing and preventing infections. The potassium and fibre content present in papayas help to ward off heart diseases. Store it in the refrigerator if you wish to consume it before ripening.&nbsp; Raw papaya salad is one of the most popular dishes across the globe too. Toss the chopped flesh with lemon juice, chillies, peanuts and fresh herbs for delicious medley of flavours, that make a great option for refreshing lunch. Make your meal interesting by raw papaya curries.&nbsp;&nbsp;</p>', NULL, '22', '2020-06-07 21:12:12', '2020-06-07 21:12:12'),
(8, 'Pineapple', 'Pineapple', '1', '[\"1591584240-1.jpg\",\"1591584240-2.jpg\",\"1591584240-3.jpg\",\"1591584240-4.jpg\",\"1591584240-5.jpg\",\"1591584240-6.jpg\"]', '[\"[\\\"2kg\\\",\\\"150\\\",\\\"Pineapple-1\\\"]\",\"[\\\"4kg\\\",\\\"280\\\",\\\"Pineapple-2\\\"]\",\"[\\\"6kg\\\",\\\"400\\\",\\\"Pineapple-3\\\"]\"]', NULL, '<p>With the shape of a pine cone, the fruit is loosely fibrous and juicy with white to yellowish flesh. The edible centre part is firm, leathery and sweet.&nbsp; Do not forget to check our delicious fruit recipe Pineapples reduce the risk of macular degeneration, a disease that affects the eyes as people age due to vitamin C and antioxidants present in it. Reduces inflammation and blood clot. Also reduces common cold and sinus inflammation. Helps develop strong bones.</p>', '<p>Uncut, ripe pineapples usually last for about 3 days in room temperature. Store freshly cut pineapples in an air tight container and refrigerate. Pineapples can be cut and eaten fresh. These luxurious treats are used to prepare juices, smoothies, desserts and also added in salads and seafoods. Pineapples reduce the risk of macular degeneration, a disease that affects the eyes as people age due to vitamin C and antioxidants present in it. Reduces inflammation and blood clot. Also reduces common cold and sinus inflammation. Helps develop strong bones.</p>', NULL, '22', '2020-06-07 21:14:00', '2020-06-07 21:14:00'),
(9, 'Blackberry', 'Blackberry', '1', '[\"1591584373-1.jpg\",\"1591584373-2.jpg\",\"1591584373-3.jpg\",\"1591584373-4.jpg\",\"1591584373-5.jpg\",\"1591584373-6.jpg\"]', '[\"[\\\"100gm\\\",\\\"15\\\",\\\"Blackberry-1\\\"]\",\"[\\\"250gm\\\",\\\"35\\\",\\\"Blackberry-2\\\"]\",\"[\\\"500gm\\\",\\\"60\\\",\\\"Blackberry-3\\\"]\"]', NULL, '<p>Dried blackberries&nbsp;are known for&nbsp;their long&nbsp;life. And guess what, having just 1/4 cup of dried blackberries&nbsp;will supply you one serving of fruits and vegetables equivalence. &nbsp;So, you can be sure that you will never run out of the necessary nutrients in your busy life.</p>', '<p>From muffins to scrumptious pies, try newer ways to include blackberries in your deserts</p>\n\n<ul>\n	<li>Abundant source of vitamins, antioxidants and minerals</li>\n	<li>Its low fat contribution is a advantage for which obese people are advised to make it a part of their snacks</li>\n	<li>Fat free</li>\n	<li>Shelf life (days): 180</li>\n	<li>Ingredient type: Vegetarian</li>\n	<li>Package contents: 1 x farm blackberry dried fruit</li>\n</ul>', NULL, '22', '2020-06-07 21:16:13', '2020-06-07 21:16:13'),
(10, 'Dragon Fruit', 'dragon-fruit', '1', '[\"1591584508-1.jpg\",\"1591584508-2.jpg\",\"1591584508-3.jpg\",\"1591584508-4.jpg\",\"1591584508-5.jpg\"]', '[\"[\\\"250gm\\\",\\\"150\\\",\\\"DragonFruit-1\\\"]\",\"[\\\"500gm\\\",\\\"300\\\",\\\"DragonFruit-2\\\"]\",\"[\\\"1kg\\\",\\\"450\\\",\\\"DragonFruit-3\\\"]\"]', NULL, '<p>Imagine a Kiwi on steroids! Except easy to peel. These are the white fleshed variety.</p>', '<p>Buy this exotic fruit to fulfil your sweet dinner endeavours. The package comes in the refined manner to fulfil your last course of actions in the sweetest possible way.</p>', NULL, '22', '2020-06-07 21:18:28', '2020-06-07 21:18:28'),
(11, 'Chicken', 'Chicken', '5', '[\"1591584640-1.jpg\",\"1591584640-2.jpg\",\"1591584640-3.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"100\\\",\\\"Chicken-1\\\"]\",\"[\\\"1Kg\\\",\\\"180\\\",\\\"Chicken-3\\\"]\",\"[\\\"3kg\\\",\\\"500\\\",\\\"Chicken-5\\\"]\"]', NULL, '<p>The heights of pure meat indulgence. One of the meatier and versatile cuts of chicken, Chicken Breast is cut from the breastbone with the wings and back removed. Skinless and boneless, its supple texture and pink, tender flesh offers a chunky bite when cooked. To add to the melt-in-the-mouth indulgence, you might get juicy pieces of Chicken tenderloin.&nbsp;</p>', '<p>Dive into the mildly spicy and lip-smacking flavours typical of Afghani cuisine. Enjoy the rich mouthfeel of cream, cheese and cashew, followed by the fragrant notes of cardamom and the slightest heat from green chilies-all done perfectly to give you the right kick of smoothness and spice! Our poultry is procured from regularly monitored farms, that ensures the prime quality and freshness of the meat. Our production-line is integrated with various quality checks that ensure the products to be of the highest quality standards. Our chicken meat is always healthy, succulent, tender and farm-fresh. No antibiotics are ever added which ensures the extremely delicious taste of meaty goodness. Our products are weighed after they are cut and the offals are removed. So, you only pay for the meat you eat.</p>', NULL, '22', '2020-06-07 21:20:40', '2020-06-07 21:20:40'),
(12, 'Crab', 'crab', '5', '[\"1591584765-1.jpg\",\"1591584765-2.jpg\",\"1591584765-3.jpg\",\"1591584765-4.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"150\\\",\\\"Crab-1\\\"]\",\"[\\\"1Kg\\\",\\\"300\\\",\\\"Crab-2\\\"]\",\"[\\\"3kg\\\",\\\"450\\\",\\\"Crab-3\\\"]\"]', NULL, '<p>Fresh seafood smells like the sea, such is the quality of fresh fish that we provide. Seafood is always sustainable, healthy, delicious and best of all, formalin free. Our unique packing and cold chain supply delivery process helps in retaining almost all of the flavour, nutrients, and freshness of the fish.</p>', '<p>Best-tasting crab after cooking them doesn&#39;t ruin the flavour, but it does diminish it a bit. It is the sweetest, most tender, most succulent crab you can ever taste. Our seafood is packed with the use of world-class technology and under the watchful eyes of our seafood safety experts to exacting standards. Whenever you order from us, you can rest assured that the seafood is fresh and full of nutrients. Please note that fresh fruit and vegetables items will be billed based on exact weight during order processing (in case the actual weight exceeds the requested weight by more than 10%, you will be charged only for 10% excess weight).</p>', NULL, '22', '2020-06-07 21:22:45', '2020-06-07 21:22:45'),
(13, 'Egg', 'egg', '5', '[\"1591584832-1.jpg\",\"1591584832-2.jpg\",\"1591584832-3.jpg\",\"1591584832-4.jpg\"]', '[\"[\\\"6\\\",\\\"30\\\",\\\"Egg\\\"]\",\"[\\\"12\\\",\\\"60\\\",\\\"Egg\\\"]\",\"[\\\"24\\\",\\\"220\\\",\\\"Egg\\\"]\"]', NULL, '<p>Fresh Table eggs are hygienically processed and securely filled for keeping these free from any contamination and impurity. It has high dietary content, protein, smell and rich taste. These are one of nature&#39;s most wholesome and cost-effective foods. You can bake enjoyable cakes, cookies, scones etc. with eggs; try your hand over at family pasta as well. It twisted boiled, sunny-side up, devilled or evens the Indian method curry eggs can be finished in so many unique tasty ways.</p>', '<p>Besides its direct use, eggs are used as main ingredients in so many other dishes. You can bake yummy cakes, cookies, scones etc. with eggs; Try your hand at homemade pasta as well. There is so much you can do with just one egg! Buy online and save yourself the exhaustive trips to grocery stores. Just a few clicks and it will be delivered right to your doorstep.</p>', NULL, '22', '2020-06-07 21:23:52', '2020-06-07 21:23:52'),
(14, 'Fish', 'fish', '5', '[\"1591584923-1.jpg\",\"1591584923-2.jpg\",\"1591584923-3.jpg\",\"1591584923-4.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"80\\\",\\\"Fish-1\\\"]\",\"[\\\"1Kg\\\",\\\"150\\\",\\\"Fish-2\\\"]\",\"[\\\"3kg\\\",\\\"400\\\",\\\"Fish-3\\\"]\"]', NULL, '<p>One of the most demanding fish in India having good meat quality and better taste than other carps. It is also a good source of Vitamin C, Riboflavin, Niacin, Iron, Magnesium and Phosphorus, and a very good source of Protein.</p>', '<p>One of the most demanding fish in India having good meat quality and better taste than other carps. We procure it specially for you. Fresh seafood smells like the sea, such is the quality of fresh fish that we provide. Seafood from us is always sustainable, healthy, delicious and best of all, formalin free. Our unique packing and cold chain supply delivery process helps in retaining almost all of the flavour, nutrients, and freshness of the fish. Our seafood is packed with the use of world-class technology and under the watchful eyes of our seafood safety experts to exacting standards. Whenever you order from us, you can rest assured that the seafood is fresh and full of nutrients.</p>', NULL, '22', '2020-06-07 21:25:23', '2020-06-07 21:25:23'),
(15, 'Lamb', 'lamb', '5', '[\"1591585014-1.jpg\",\"1591585014-2.jpg\",\"1591585014-3.jpg\",\"1591585014-4.jpg\",\"1591585014-5.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"250\\\",\\\"Lamb-1\\\"]\",\"[\\\"1Kg\\\",\\\"500\\\",\\\"Lamb-2\\\"]\",\"[\\\"3kg\\\",\\\"1200\\\",\\\"Lamb-3\\\"]\"]', NULL, '<p>Planning a feast is now easy as&nbsp;<em>lamb</em>&nbsp;is now available&nbsp;<em>online</em>&nbsp;in India&rsquo;s biggest&nbsp;<em>online</em>&nbsp;grocery store at the best price. Order now to get it delivered to your place.</p>', '<p>What could be more tempting than a hot plate of rogan josh or galauti kebab to relish on a cold winter&rsquo;s day? But, as any cook true to his craft would know, that nothing can put you off more than poor quality mutton. The quality of mutton meat if not good, can ruin an entire dish. Hence, it is important to source your lamb meat from a trusted vendor. So, why take the stress and go to a local butchery yourself, when we are here. Buy goat meat online and get guaranteed delivery the next day. Are you still thinking? Rush now and buy goat meat online and serve a fantastic mutton dish for your friends and family. You can just take care of preparing the mutton while we assure you with the quality and freshness of our lamb meat or goat meat.</p>', NULL, '22', '2020-06-07 21:26:54', '2020-06-07 21:26:54'),
(16, 'Mutton', 'mutton', '5', '[\"1591585088-1.jpg\",\"1591585088-2.jpg\",\"1591585088-3.jpg\",\"1591585088-4.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"250\\\",\\\"Mutton-1\\\"]\",\"[\\\"1Kg\\\",\\\"400\\\",\\\"Mutton-2\\\"]\",\"[\\\"2kg\\\",\\\"700\\\",\\\"Mutton-3\\\"]\"]', NULL, '<p>We take utmost care in selecting the best suppliers to provide you with high quality and succulent products. Every product is stored in our cold storage right until your doorstep ensuring freshness and utmost hygiene.</p>', '<p>Additionally, every product is packed using food grade plastic which provides a nourishing and wholesome environment. These freshly processed and clean curry pieces are ready for cooking.</p>\n\n<p>Know About Your Mutton</p>\n\n<ul>\n	<li>Correctly weighed product after complete processing and cleaning.&nbsp;</li>\n	<li>Lab-Certified products, without any added chemicals and preservatives.&nbsp;</li>\n	<li>Processed from Healthy tender meat, without liver and kidney.&nbsp;</li>\n	<li>Contains normal fat to enhance the taste.&nbsp;</li>\n	<li>This product is Halal.&nbsp;</li>\n	<li>Chilled, not frozen to ensure freshness and delicacy.&nbsp;</li>\n	<li>Each cut piece weighing approx. 45 to 60 gm</li>\n</ul>', NULL, '22', '2020-06-07 21:28:08', '2020-06-07 21:28:08'),
(17, 'Pork', 'pork', '5', '[\"1591585300-1.jpg\",\"1591585300-2.jpg\",\"1591585300-3.jpg\",\"1591585300-4.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"150\\\",\\\"Pork-1\\\"]\",\"[\\\"1Kg\\\",\\\"300\\\",\\\"Pork-2\\\"]\",\"[\\\"2kg\\\",\\\"600\\\",\\\"Pork-3\\\"]\"]', 'null', '<p>A savoury Polish pork sausage smoked with our trademark beechwood wood chips and blended with cayenne pepper and garlic. This sausage can be eaten cold or hot, but is at its best when simmered over a grill and served in bun with mustard.</p>', '<p><em>Buy pork</em>&nbsp;meat such as&nbsp;<em>pork</em>&nbsp;mince &amp; tenderloin&nbsp;<em>online</em>&nbsp;of best quality in India.&nbsp;<em>Shop</em>&nbsp;for&nbsp;<em>pork</em>&nbsp;ribs &amp; other&nbsp;<em>pork</em>&nbsp;meat&nbsp;<em>online. </em>Pack is not only tasty and good for health, but also it is packed with nutrition which makes it all the more desired. Depending on your choice of food, you can prepare the gravy or sauce suitable to go with it. It is a rich source of protein and it also helps boost the immune system.<br />\n# Rich source of proteins.<br />\n# Takes less time to cook.<br />\n# Low in fat.</p>', NULL, '22', '2020-06-07 21:29:25', '2020-06-07 21:31:40'),
(18, 'Prawns', 'prawns', '5', '[\"1591585244-1.jpg\",\"1591585244-2.jpg\",\"1591585244-3.jpg\",\"1591585244-4.jpg\",\"1591585244-5.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"400\\\",\\\"Prawns-1\\\"]\",\"[\\\"1Kg\\\",\\\"700\\\",\\\"Prawns-2\\\"]\",\"[\\\"2kg\\\",\\\"1200\\\",\\\"Prawns-3\\\"]\"]', NULL, '<p>A slightly larger sized variant of our Prawns Medium, these prawns make for more bite. They&#39;re de-shelled, deveined, and cleaned with head and tail removed so you have absolutely zero prep.</p>', '<p>Fresh seafood smells like the sea, such is the quality of fresh fish that we provide. Seafood is always sustainable, healthy, delicious and best of all, formalin free. Our unique packing and cold chain supply delivery process helps in retaining almost all of the flavour, nutrients, and freshness of the fish. Our seafood is packed with the use of world-class technology and under the watchful eyes of our seafood safety experts to exacting standards. Whenever you order from us, you can rest assured that the seafood is fresh and full of nutrients.</p>', NULL, '22', '2020-06-07 21:30:44', '2020-06-07 21:30:44'),
(19, 'Beans', 'beans', '2', '[\"1591585392-1.jpg\",\"1591585392-2.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"40\\\",\\\"Beans-1\\\"]\",\"[\\\"1Kg\\\",\\\"80\\\",\\\"Beans-2\\\"]\",\"[\\\"2kg\\\",\\\"150\\\",\\\"Beans-3\\\"]\"]', NULL, '<p>Tender, crispy and sweet tasting green cowpea beans have a succulent and pale flesh. These long and slender beans contain lime green peas. They are also known as black-eyed peas and lobia.&nbsp;<br />\n<br />\n&nbsp;</p>', '<p>Store unwashed fresh beans in a perforated plastic bag and refrigerate. Whole beans stored this way will stay for a week. Cowpea Beans are most commonly used in curries and rice. Can be saut&eacute;ed, deep fried and stir fried. Cowpea beans maintain standard cholesterol levels and control blood cholesterol. They treat stomach and pancreatic problems, urination and bowel related problems. They are good for weight loss, skin and hair health. Please note that fresh fruit and vegetables items will be billed based on exact weight during order processing (in case the actual weight exceeds the requested weight by more than 10%, you will be charged only for 10% excess weight).</p>', NULL, '22', '2020-06-07 21:33:12', '2020-06-07 21:33:12'),
(20, 'Beetroot', 'beetroot', '2', '[\"1591585471-1.jpg\",\"1591585471-2.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"35\\\",\\\"Beetroot-1\\\"]\",\"[\\\"1 kg\\\",\\\"70\\\",\\\"Beetroot-2\\\"]\",\"[\\\"3kg\\\",\\\"200\\\",\\\"Beetroot-3\\\"]\"]', NULL, '<p>These edible ruby red roots are smooth and bulbous and have the highest sugar content than any other vegetable.&nbsp;</p>', '<p>While storing beets, trim the leaves 2 inches from the root soon after you buy them as they sap the moisture from the beet root. The root bulbs should also be put into a bag and can be stored in the refrigerator for a maximum of 7 to 10 days. They are used to prepare curries, chutneys and raithas. Its sweet nature makes it a popular ingredient for halwas and other such sweets. Red beets lower blood pressure, promotes brain and heart health. It fights inflammation and boosts energy levels. Please note that fresh fruit and vegetables items will be billed based on exact weight during order processing (in case the actual weight exceeds the requested weight by more than 10%, you will be charged only for 10% excess weight).</p>', NULL, '22', '2020-06-07 21:34:31', '2020-06-07 21:34:31'),
(21, 'Broccoli', 'Broccoli', '2', '[\"1591585547-1.jpg\",\"1591585547-2.jpg\",\"1591585547-3.jpg\",\"1591585547-4.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"80\\\",\\\"Broccoli\\\"]\",\"[\\\"1Kg\\\",\\\"150\\\",\\\"Broccoli\\\"]\",\"[\\\"2kg\\\",\\\"250\\\",\\\"Broccoli\\\"]\"]', NULL, '<p>With a shape resembling that of a cauliflower, Broccoli has clusters of small, tight flower heads. These heads turn bright green on cooking and tastes slightly bitter.&nbsp;</p>', '<p>Consume fresh broccoli as soon as you can as it will not keep for long. To store, drizzle water droplets on the flower heads, cover loosely in damp paper towels and refrigerate. But never wash broccoli before storing in the refrigerator. The excess moisture promotes mould. Do not store broccoli in a sealed container or plastic bag. Raw broccoli requires air circulation.&nbsp;Broccolis serve as a healthy raw vegetable. Add them to your salads, pasta, curries and rice. Steam broccoli stalks, add some salt and oil and roast it for a crunchy flavour. Broccoli prevents cancer and reduces cholesterol. It maintains bone and heart health, good for skin, eyes and has anti-ageing properties.</p>', NULL, '22', '2020-06-07 21:35:47', '2020-06-07 21:35:47'),
(22, 'Cabbage', 'cabbage', '2', '[\"1591585982-1.jpg\",\"1591585982-2.jpg\",\"1591585982-3.jpg\",\"1591585982-4.jpg\",\"1591585982-5.jpg\",\"1591585982-6.jpg\",\"1591585982-7.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"25\\\",\\\"Cabbage-1\\\"]\",\"[\\\"1Kg\\\",\\\"50\\\",\\\"Cabbage-2\\\"]\",\"[\\\"2kg\\\",\\\"100\\\",\\\"Cabbage-3\\\"]\"]', NULL, '<p>With a texture of crispness and juiciness the moment you take the first bite, cabbages are sweet and grassy flavoured with dense and smooth leafy layers.&nbsp;Cabbage improves brain health and vision. Best for people who want to lose weight in a healthy way. It detoxifies the body and contains glutamine that reduces effects of inflammation, allergies, joint pain, irritation, fever. Cabbages also help prevent cancer.</p>', '<p>Do not cut cabbages unless you are immediately consuming as it begins to lose vitamin C when cut. If you absolutely cannot immediately finish the remaining cabbage, wrap it tightly in plastic wrap and store it in the refrigerator for up to two days. Keeping them in the refrigerator retains the crispiness of the vegetable.&nbsp;Shredded cabbage can be directly added to any salad and sandwiches as they are most nutritious when eaten raw. Also used in pickles and flat breads.&nbsp;Stew fried cabbage, onion, garlic, bell pepper and green chilies mixed with steamed rice, and soya/chili/tomato sauce is a popular favourite (Chowmein) in China and other South East Asian regions.&nbsp;</p>', NULL, '22', '2020-06-07 21:43:02', '2020-06-07 21:43:02'),
(23, 'Capsicum', 'capsicum', '2', '[\"1591586039-1.jpg\",\"1591586039-2.jpg\",\"1591586039-3.jpg\",\"1591586039-4.jpg\",\"1591586039-5.jpg\",\"1591586039-6.jpg\"]', '[\"[\\\"0.5 kg\\\",\\\"40\\\",\\\"Capsicum-1\\\"]\",\"[\\\"1Kg\\\",\\\"80\\\",\\\"Capsicum-2\\\"]\",\"[\\\"3kg\\\",\\\"200\\\",\\\"Capsicum-3\\\"]\"]', NULL, '<p>Leaving a moderately pungent taste on the tongue, Green capsicums, also known as green peppers are bell shaped, medium-sized fruit pods. They have thick and shiny skin with a fleshy texture inside.&nbsp;Green capsicums have powerful antioxidants and anti-inflammatory properties. Rich in Vitamin A, B complex, C and phytonutrients. Relieves pain of bone disorders and has the capacity to relax the respiratory passage.</p>', '<p>Store them in a cool, dry place away from direct sunlight. Keep capsicums dry as moisture makes them rot faster. Refrigerate the peppers unwashed, in a plastic bag and consume within a week. Resort to refrigeration only when they cannot be consumed immediately.&nbsp;Green bell peppers can be used for a wide variety of dishes due to its distinct flavour and scent. Can be grilled, roasted, baked and saut&eacute;ed. Widely used in salads, pastas, pizzas, pepper sauce and even for flavouring curries.&nbsp; Please note that fresh fruit and vegetables items will be billed based on exact weight during order processing (in case the actual weight exceeds the requested weight by more than 10%, you will be charged only for 10% excess weight).</p>', NULL, '22', '2020-06-07 21:43:59', '2020-06-07 21:43:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_activated` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `is_activated`, `remember_token`, `created_at`, `updated_at`) VALUES
(9, 'Amit', 'amit.khare588@gmail.com', NULL, '$2y$10$n71DmVietfqWW3.JRq07/ufft5JXZswpiMuHwX/u26mhJc9viTTQ6', 'Admin', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90b21hdG8ueHl6XC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTU4NTE1NTAxMiwiZXhwIjoxNTg1MTU4NjEyLCJuYmYiOjE1ODUxNTUwMTIsImp0aSI6Im9DZWtKOFg1QmNHa05wSm8iLCJzdWIiOjksInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.KL6Bo6CDKGkyuzMGUQGwe-lzHL9ePpa73cGfZcWniVs', '2020-03-09 01:24:46', '2020-03-25 11:20:12'),
(10, 'amit', 'test@test.com', NULL, '$2y$10$RUTDGBvG1z0Lr8aPePqOEu8MVirEP4VSGQbCxU/WeRScf/p8K1zf2', 'Admin', NULL, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90b21hdG8ueHl6XC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTU5MTU4MzI3NywiZXhwIjoxNTkxNTg2ODc3LCJuYmYiOjE1OTE1ODMyNzcsImp0aSI6IldsVmI2bmxwSG8xcld0Q0MiLCJzdWIiOjEwLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.GK91XIxBLUVccxJ8U1YK1NwD_EhFFtzpLi82lb3tSKk', '2020-05-26 11:10:05', '2020-06-07 20:57:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `basics`
--
ALTER TABLE `basics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blogs_url_unique` (`url`);

--
-- Indexes for table `blog_metas`
--
ALTER TABLE `blog_metas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `blog_metas_url_unique` (`url`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `metas`
--
ALTER TABLE `metas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `metas_url_unique` (`url`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_url_unique` (`url`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `basics`
--
ALTER TABLE `basics`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_metas`
--
ALTER TABLE `blog_metas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `metas`
--
ALTER TABLE `metas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

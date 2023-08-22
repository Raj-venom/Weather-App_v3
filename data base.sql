-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2023 at 07:49 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weather`
--

-- --------------------------------------------------------

--
-- Table structure for table `weather_data`
--

CREATE TABLE `weather_data` (
  `city` varchar(255) DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `current_day_and_date` varchar(255) DEFAULT NULL,
  `pressure` float DEFAULT NULL,
  `wind_speed` float DEFAULT NULL,
  `humidity` int(11) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weather_data`
--

INSERT INTO `weather_data` (`city`, `temperature`, `description`, `current_day_and_date`, `pressure`, `wind_speed`, `humidity`, `icon`) VALUES
('Stockton-on-Tees', 14.65, 'moderate rain', '2023-08-13', 1003, 3.09, 96, '10n'),
('Stockton-on-Tees', 28.5, 'partly cloudy', '2023-08-06', 1020, 5.2, 55, 'cloud_sun'),
('Stockton-on-Tees', 20.8, 'clear sky', '2023-08-05', 1019, 4.12, 50, 'sun'),
('Stockton-on-Tees', 22.1, 'partly cloudy', '2023-08-07', 1021, 3.8, 52, 'cloud_sun'),
('Stockton-on-Tees', 23.9, 'clear sky', '2023-08-09', 1022, 3.2, 48, 'sun'),
('Stockton-on-Tees', 25.5, 'clear sky', '2023-08-10', 1020, 2.7, 46, 'sun'),
('Stockton-on-Tees', 20.8, 'clear sky', '2023-08-08', 1019, 4.12, 50, 'sun'),
('Stockton-on-Tees', 28.5, 'partly cloudy', '2023-08-09', 1020, 5.2, 55, 'cloud_sun'),
('Stockton-on-Tees', 22.1, 'partly cloudy', '2023-08-11', 1021, 3.8, 52, 'cloud_sun'),
('Stockton-on-Tees', 23.9, 'clear sky', '2023-08-12', 1022, 3.2, 48, 'sun'),
('Stockton-on-Tees', 25.5, 'clear sky', '2023-08-04', 1020, 2.7, 46, 'sun');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- -----------------------------------------------------
-- Schema fetin2022
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fetin2022` DEFAULT CHARACTER SET utf8 ;
USE `fetin2022` ;

-- -----------------------------------------------------
-- Table user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fetin2022`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  `email` VARCHAR(45) NULL,
  `emailVerification` TINYINT(1) NULL,
  `token` VARCHAR(300) NULL,
  PRIMARY KEY (`id`)
  );
-- -----------------------------------------------------
-- Table cards
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fetin2022`.`cards` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NOT NULL,
  `img` VARCHAR(500) NULL,
  `title` VARCHAR(45) NULL,
  `ingredients` VARCHAR(200) NULL,
  `info` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cards_user_idx` (`userId` ASC),
  CONSTRAINT `fk_cards_user`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

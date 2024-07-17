-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema teamNotesDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema teamNotesDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `teamNotesDB` DEFAULT CHARACTER SET utf8 ;
USE `teamNotesDB` ;

-- -----------------------------------------------------
-- Table `teamNotesDB`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teamNotesDB`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `theme` INT NULL DEFAULT 0,
  `password` TEXT NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teamNotesDB`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teamNotesDB`.`groups` (
  `idGroup` INT NOT NULL AUTO_INCREMENT,
  `adminId` INT NOT NULL,
  `groupName` VARCHAR(45) NOT NULL,
  `creationDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idGroup`),
  INDEX `group-admin_idx` (`adminId` ASC) VISIBLE,
  CONSTRAINT `group-admin`
    FOREIGN KEY (`adminId`)
    REFERENCES `teamNotesDB`.`users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teamNotesDB`.`notes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teamNotesDB`.`notes` (
  `idNote` INT NOT NULL AUTO_INCREMENT,
  `owningGroupId` INT NOT NULL,
  `creatorId` INT NOT NULL,
  `creationDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `noteText` LONGTEXT NOT NULL,
  `noteName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idNote`),
  INDEX `note-user_idx` (`creatorId` ASC) VISIBLE,
  INDEX `note-group_idx` (`owningGroupId` ASC) VISIBLE,
  CONSTRAINT `note-user`
    FOREIGN KEY (`creatorId`)
    REFERENCES `teamNotesDB`.`users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `note-group`
    FOREIGN KEY (`owningGroupId`)
    REFERENCES `teamNotesDB`.`groups` (`idGroup`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teamNotesDB`.`memberships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teamNotesDB`.`memberships` (
  `idMembership` INT NOT NULL AUTO_INCREMENT,
  `groupId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`idMembership`),
  INDEX `membership-group_idx` (`groupId` ASC) VISIBLE,
  INDEX `membership-user_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `membership-group`
    FOREIGN KEY (`groupId`)
    REFERENCES `teamNotesDB`.`groups` (`idGroup`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `membership-user`
    FOREIGN KEY (`userId`)
    REFERENCES `teamNotesDB`.`users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teamNotesDB`.`invitations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `teamNotesDB`.`invitations` (
  `idInvitation` INT NOT NULL AUTO_INCREMENT,
  `groupId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`idInvitation`),
  INDEX `invitation-group_idx` (`groupId` ASC) VISIBLE,
  INDEX `invitation-user_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `invitation-group`
    FOREIGN KEY (`groupId`)
    REFERENCES `teamNotesDB`.`groups` (`idGroup`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `invitation-user`
    FOREIGN KEY (`userId`)
    REFERENCES `teamNotesDB`.`users` (`idUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

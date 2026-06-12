-- CreateTable
CREATE TABLE `quarto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(10) NOT NULL,
    `tipo` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospede` VARCHAR(100) NOT NULL,
    `data_entrada` DATETIME(3) NOT NULL,
    `data_saida` DATETIME(3) NOT NULL,
    `quartoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reserva` ADD CONSTRAINT `reserva_quartoId_fkey` FOREIGN KEY (`quartoId`) REFERENCES `quarto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

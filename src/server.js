import express from "express";
import { user_router } from "./usuario.js";
import { alimentos_router } from "./alimentos.js";

const app = express();


app.use(express.json());

app.use(user_router);

app.use(alimentos_router);

app.get("/", (req, res) => {
    res.send("servidor rodando");
});

app.listen(3000, (req, res) => {
    console.log("sem erros no servidor");
});

// CREATE TABLE usuarios (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     nome VARCHAR(100) NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     senha VARCHAR(255) NOT NULL, 
//     data_nascimento DATE NOT NULL,
//     genero ENUM('M', 'F', 'Outro') NOT NULL,
//     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE alimentos (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     nome VARCHAR(100) NOT NULL,
//     calorias DECIMAL(6,2) NOT NULL, -- Por 100g
//     proteinas DECIMAL(6,2) DEFAULT 0,
//     carboidratos DECIMAL(6,2) DEFAULT 0,
//     gorduras DECIMAL(6,2) DEFAULT 0,
//     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE refeicoes (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     usuario_id INT NOT NULL, -- Relaciona com o usuário
//     nome VARCHAR(100) NOT NULL, -- Ex: Café da manhã, almoço
//     data DATE NOT NULL,
//     horario TIME NOT NULL,
//     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
// );

// CREATE TABLE itens_refeicao (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     refeicao_id INT NOT NULL, -- Relaciona com a refeição
//     alimento_id INT NOT NULL, -- Relaciona com o alimento
//     quantidade DECIMAL(6,2) NOT NULL, -- Quantidade em gramas
//     FOREIGN KEY (refeicao_id) REFERENCES refeicoes(id) ON DELETE CASCADE,
//     FOREIGN KEY (alimento_id) REFERENCES alimentos(id) ON DELETE CASCADE
// );

import express from "express";
import { user_router } from "./usuario.js";
import { alimentos_router } from "./alimentos.js";
import { semana_router } from "./semanas.js";
import { refeiçao_router } from "./refeiçao.js";

const app = express();


app.use(express.json());

app.use(user_router);

app.use(alimentos_router);

app.use(semana_router);

app.use(refeiçao_router);

app.get("/", (req, res) => {
    res.send("servidor rodando");
});

app.listen(3000, (req, res) => {
    console.log("sem erros no servidor");
});



// -- Tabela de Usuários
// CREATE TABLE usuarios (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     nome VARCHAR(100) NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     senha VARCHAR(255) NOT NULL, 
//     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Tabela de Semanas (Para associar os planos semanais a usuários)
// CREATE TABLE semanas (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     usuario_id INT NOT NULL,
//     semana_inicio DATE NOT NULL,
//     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
// );

// -- Tabela de Refeições (Associada a uma semana e dia específico)
// CREATE TABLE refeicoes (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     semana_id INT NOT NULL,
//     dia ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo') NOT NULL,
//     nome VARCHAR(100) NOT NULL, 
//     horario TIME NOT NULL,
//     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (semana_id) REFERENCES semanas(id) ON DELETE CASCADE
// );

// -- Tabela de Alimentos (Cadastro dos alimentos e seus valores nutricionais)
// CREATE TABLE alimentos (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     nome VARCHAR(100) NOT NULL,
//     calorias DECIMAL(6,2) NOT NULL, 
//     proteinas DECIMAL(6,2) DEFAULT 0,
//     carboidratos DECIMAL(6,2) DEFAULT 0,
//     gorduras DECIMAL(6,2) DEFAULT 0,
//     vitamina_a DECIMAL(6,2) DEFAULT 0,
//     vitamina_c DECIMAL(6,2) DEFAULT 0,
//     ferro DECIMAL(6,2) DEFAULT 0,
//     calcio DECIMAL(6,2) DEFAULT 0,
//     criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// -- Tabela de Itens de Refeição (Associa alimentos às refeições)
// CREATE TABLE itens_refeicao (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     refeicao_id INT NOT NULL,
//     alimento_id INT NOT NULL,
//     quantidade DECIMAL(6,2) NOT NULL, 
//     FOREIGN KEY (refeicao_id) REFERENCES refeicoes(id) ON DELETE CASCADE,
//     FOREIGN KEY (alimento_id) REFERENCES alimentos(id) ON DELETE CASCADE
// );
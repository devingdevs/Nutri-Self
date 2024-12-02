import express from "express";
import { conn } from "./bandodedados.js";



 
const user_router = express.Router();

//inserir
user_router.post("/usuarios", (req, res) => {
    const { nome, email, senha, data_nascimento, genero } = req.body;
    const sql = `INSERT INTO usuarios (nome, email, senha, data_nascimento, genero) VALUES ('${nome}', '${email}', '${senha}', '${data_nascimento}', '${genero}')`;
    conn.query(sql, [nome, email, senha, data_nascimento, genero], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, nome, email });
    });
});

//listar
user_router.get("/usuarios", (req, res) => {
    conn.query("SELECT * FROM usuarios", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

//atuaalizar
user_router.put("/usuarios/:id", (req, res) => {
    const { nome, email } = req.body;
    const { id } = req.params;
    const sql = `UPDATE usuarios SET nome = ?, email = ? WHERE id = ?`;
    conn.query(sql, [nome, email, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuário atualizado com sucesso!" });
    });
});

//deletar
user_router.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    conn.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuario deletado com sucesso!"})
    });
});

export {user_router}

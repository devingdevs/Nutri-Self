import { Router } from "express";
import { conn } from "./bandodedados.js";

const alimentos_router = Router();

// Addicionar alimento
alimentos_router.post("/alimentos", (req, res) => {
    const { nome, dia_ingerido, calorias, proteinas, carboidratos, gorduras } = req.body;
    const sql = `INSERT INTO alimentos (nome, dia_ingerido, calorias, proteinas, carboidratos, gorduras) VALUES ('${nome}', '${dia_ingerido}','${calorias}', '${proteinas}', '${carboidratos}', '${gorduras}')`;
    conn.query(sql, [nome, calorias, proteinas, carboidratos, gorduras], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, nome });
    });
});

// Listar alimentos
alimentos_router.get("/alimentos", (req, res) => {
    const { usuario_id, dia_ingerido, data, nome, proteina, carboidratos, gorduras, calorias } = req.body;
    conn.query(`SELECT * FROM alimentos where usuario_id=${usuario_id} and dia_ingerido=${data}`, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Atualizar alimento
alimentos_router.put("/alimentos/:id", (req, res) => {
    const { nome, calorias } = req.body;
    const { id } = req.params;
    const sql = `UPDATE alimentos SET nome = ?, calorias = ? WHERE id = ?`;
    conn.query(sql, [nome, calorias, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Alimento atualizado com sucesso!" });
    });
});

// Deletar alimento
alimentos_router.delete("/alimentos/:id", (req, res) => {
    const { id } = req.params;
    conn.query("DELETE FROM alimentos WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Alimento deletado com sucesso!" });
    });
});


export { alimentos_router };

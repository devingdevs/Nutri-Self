import {Router} from "express";
import { conn } from "./bandodedados.js";


const ali_router = Router();


// Listar todos os alimentos
ali_router.get("/alimentos/cadastrados", (req, res) => {
    const sql = "SELECT * FROM alimentos";
    conn.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Criar um novo alimento


// Criar alimento e associar diretamente à refeição
ali_router.post("/alimentos", (req, res) => {
    const { nome, calorias, proteinas, carboidratos, gorduras, vitamina_a, vitamina_c, ferro, calcio, refeicao_id, quantidade } = req.body;


    // Inserir o alimento na tabela alimentos
    const sqlAlimento = `
        INSERT INTO alimentos (nome, calorias, proteinas, carboidratos, gorduras, vitamina_a, vitamina_c, ferro, calcio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    conn.query(
        sqlAlimento,
        [nome, calorias, proteinas || 0, carboidratos || 0, gorduras || 0, vitamina_a || 0, vitamina_c || 0, ferro || 0, calcio || 0],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const alimentoId = result.insertId;

            // Inserir o alimento na refeição (itens_refeicao)
            const sqlItensRefeicao = `
                INSERT INTO itens_refeicao (refeicao_id, alimento_id, quantidade)
                VALUES (?, ?, ?)
            `;

            conn.query(sqlItensRefeicao, [refeicao_id, alimentoId, quantidade], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json({
                    message: "Alimento cadastrado e associado à refeição com sucesso!",
                    alimento_id: alimentoId,
                    refeicao_id: refeicao_id
                });
            });
        }
    );
});


// Atualizar um alimento
ali_router.put("/alimentos/:id", (req, res) => {
    const { id } = req.params;
    const { nome, calorias, proteinas, carboidratos, gorduras, vitamina_a, vitamina_c, ferro, calcio, refeicao_id } = req.body;
    const sql = `
        UPDATE alimentos SET nome = ?, calorias = ?, proteinas = ?, carboidratos = ?, gorduras = ?, 
        vitamina_a = ?, vitamina_c = ?, ferro = ?, calcio = ?, usuario_id = ? WHERE id = ?
    `;
    conn.query(sql, [nome, calorias, proteinas, carboidratos, gorduras, vitamina_a, vitamina_c, ferro, calcio, refeicao_id, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Alimento atualizado com sucesso!" });
    });
});

// Excluir um alimento
ali_router.delete("/alimentos/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM alimentos WHERE id = ?";
    conn.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Alimento deletado com sucesso!" });
    });
});

// Filtrar alimentos por refeição, usuario_id e data, com soma de calorias
ali_router.get("/filtro", (req, res) => {
    const { usuario_id, data, refeicao } = req.query;


    // Query para listar os alimentos filtrados
    const sql = `
        SELECT 
            a.nome AS alimento,
            ir.quantidade,
            (a.calorias * ir.quantidade ) AS calorias
        FROM refeicoes r
        INNER JOIN itens_refeicao ir ON r.id = ir.refeicao_id
        INNER JOIN alimentos a ON ir.alimento_id = a.id
        INNER JOIN semanas s ON r.semana_id = s.id
        WHERE s.usuario_id = ? 
          AND DATE(r.horario) = ?
          AND r.nome = ?
    `;

    // Query para calcular a soma das calorias
    const somaSql = `
        SELECT 
            SUM(a.calorias * ir.quantidade ) AS calorias_totais
        FROM refeicoes r
        INNER JOIN itens_refeicao ir ON r.id = ir.refeicao_id
        INNER JOIN alimentos a ON ir.alimento_id = a.id
        INNER JOIN semanas s ON r.semana_id = s.id
        WHERE s.usuario_id = ? 
          AND DATE(r.horario) = ?
          AND r.nome = ?
    `;

    // Executar a primeira query para listar os alimentos
    conn.query(sql, [usuario_id, data, refeicao], (err, alimentos) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Executar a segunda query para calcular a soma das calorias
        conn.query(somaSql, [usuario_id, data, refeicao], (err, resultadoSoma) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Obter o total de calorias
            const caloriasTotais = resultadoSoma[0].calorias_totais || 0;

            // Retornar os resultados combinados
            res.json({
                usuario_id: parseInt(usuario_id),
                data,
                refeicao,
                alimentos,
                calorias_totais: caloriasTotais
            });
        });
    });
});

export {ali_router};
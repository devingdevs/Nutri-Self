import { Router } from "express";

import { conn } from "./bandodedados";

import { user_router } from "./usuario";

user_router.delete("/remover_user", (req, res) => {
    const {i } = req.body;
})
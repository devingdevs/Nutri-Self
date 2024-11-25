import mysql from "mysql";

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nutriself"
});

conn.connect((err) => {
    if(err){
        console.log("Ocorreu o erro", err);
        return;
    }
    console.log("Sem erros")
});

export {conn}
//importar o sqlite
const sqlite3 = require ('sqlite3').verbose()

//criar objeto para fazer operações
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto para criar tabelas e etc
/*db.serialize(() => {
        //criar tabela com comandos SQL
        db.run(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                name TEXT,
                address TEXT,
                address2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT
            );
        `)

        //inserir dados
        const query = `
            INSERT INTO places (
                image,
                name, 
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
        `

        const values = [
            "https://images.unsplash.com/photo-1563853874711-9ec16dc3f6a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            "Praia e futebol",
            "Rua dos pombos, Jurema",
            "Nº 280",
            "Bahia",
            "Ilhéus",
            "Obras da natureza, cultura brasileira"
        ]

        db.run(query, values, function(err) {
            if (err) {
                return console.log(err)
            }
            console.log("Cadastrado com sucesso")
            console.log(this)

        }) 

        //consultar dados 
    /* db.all (`SELECT * FROM places`, function (err, rows) {
            if(err) {
                return console.log(err)
            }

            console.log("Aqui estão seus registros: ")
            console.log (rows)
        })

        //deletar dados
        db.run(`DELETE FROM places WHERE id = ?`, [], function (err) {
            if (err) {
                return console.log (err)
            }

            console.log ("Registro deletado com sucesso")
        })

}) */ 
const express = require ('express')
const server = express()
 
const db = require ('./database/db.js')

server.use(express.static("public"))

server.use(express.urlencoded({extended: true}))

const nunjucks = require ('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.get("/", (request, response) => {
    return response.render("index.html", {title: "Título"})
})

server.get("/create-point", (request, response) => {
    return response.render("create-point.html")
})

server.post ("/savepoint", (request, response) => {
    console.log(request.body)

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
        request.body.image,
        request.body.name,
        request.body.address,
        request.body.address2,
        request.body.state,
        request.body.city,
        request.body.items
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return response.send("Erro no cadastro")

        }
        console.log("Cadastrado com sucesso")
        return response.render("create-point.html", {saved: true})
    }) 

})

server.get("/search", (request, response) => {

    const search = request.query.search
    if (search == "") {
        return response.render("search.html", {total: 0})
    }


    //pegar os dados do db
    db.all (`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        return response.render("search.html", {places: rows, total})
    })
})

server.listen(3000)

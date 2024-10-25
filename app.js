app.get("/consultar", function(req, res){
    var posts = [];
    db.collection('clientes').get().then(
        function(snapshot){
            snapshot.forEach(
                function(doc){
                    const data = doc.data();
                    data.id = doc.id ;
                    posts.push(data);
                }
            )
            res.render("consulta", {posts: posts});
        }
    )
});

Handlebars.registerHelper('eq', function (v1, v2) {
    return v1 === v2 ;
});

app.post("/atualizar", function(req, res){
    const id = req.body.id;
    var result = db.collection('clientes').doc(id).update({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    }).then(function(){
        console.log('Documento atualizado com sucesso!');
        res.redirect("/consultar");
    });
});

app.get("/excluir/:id", function(req, res){
    const id = req.params.id;
    var result = db.collection('clientes').doc(id).delete().then(function(){
        console.log('Documento excluído com sucesso!');
        res.redirect("/consultar");
    });
});

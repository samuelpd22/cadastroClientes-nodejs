const express = require('express')
const mongoose = require('mongoose');



const app = express()
const port = 3000
app.use(express.json());



const Pessoa = mongoose.model('Pessoa', {
    name: String,
    cpf: String,
    idade: String
})


app.get('/', async (req, res) => {
    try {
        const pessoas = await Pessoa.find(); 
        return res.send(pessoas); 
    } catch (err) {
        console.error('Erro ao buscar dados:', err.message);
        return res.status(500).send({ error: 'Erro ao buscar dados' });
    }
});

app.post('/', async (req, res) =>{
    const pessoa = new Pessoa({
        name: req.body.name,
        cpf: req.body.cpf,
        idade: req.body.idade
    })
    await pessoa.save()
    return res.send(pessoa)
})
app.put( "/:id" , async (req, res) =>{
    const pessoa = await Pessoa.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            cpf: req.body.cpf,
            idade: req.body.idade
        })
    return res.send(pessoa)
})


app.delete('/:id', async(req, res) => {
    const pessoa = await Pessoa.findByIdAndDelete(req.params.id)
    return res.send(pessoa)
})

app.get('/:id', async(req, res) => {
    const pessoa = await Pessoa.findById(req.params.id)
    return res.send(pessoa)
})

app.listen(port, ()=>{
    mongoose.connect('mongodb+srv://samuel:123@cadastrogeral.tizlg.mongodb.net/?retryWrites=true&w=majority&appName=CadastroGeral')
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Erro de conexão:', err.message));

    console.log('App running')
})
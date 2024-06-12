import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());


// Método Get
app.get('/usuarios', async (req, res) => {

  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        password: req.query.password
      }
    })
  } else {
    users = await prisma.user.findMany();
  }
  res.status(200).json(users);
});


// Método Post
app.post('/usuarios', async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
  })

  res.status(201).send(req.body);
})


// Método Put
app.put('/usuarios/:id', async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id 
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
  });

  res.status(201).send(req.body);
})



// Método Delete
app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(200).send({ message: 'Usuário deletado com sucesso!' });
})


// Servidor rodar na porta 3000
app.listen(3000);


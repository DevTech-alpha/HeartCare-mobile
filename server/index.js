const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let batimentos = [];

// Carrega os batimentos do arquivo JSON quando o servidor é iniciado
fs.readFile("batimentos.json", "utf-8", (err, data) => {
  if (!err) {
    batimentos = JSON.parse(data);
  }
});

// Retorna todos os batimentos
app.get("/batimentos", (req, res) => {
  return res.json(batimentos);
});

// Adiciona um novo batimento
app.post("/batimentos", (req, res) => {
  const { O2 } = req.body;
  if (O2 !== 0) {
    batimentos.push({ O2 });
    // Salva os batimentos no arquivo JSON
    fs.writeFile("batimentos.json", JSON.stringify(batimentos), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Batimento inserido com sucesso");
      }
    });
  }
  return res.json(batimentos);
});

// Remove um batimento pelo nome
app.delete("/batimentos/:name", (req, res) => {
  const { name } = req.params;
  const batIndex = batimentos.findIndex((dado) => dado.name === name);
  if (batIndex !== -1) {
    batimentos.splice(batIndex, 1);
    // Salva os batimentos atualizados no arquivo JSON
    fs.writeFile("batimentos.json", JSON.stringify(batimentos), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Batimento removido com sucesso");
      }
    });
    return res.json({ message: "Batimento removido com sucesso" });
  } else {
    return res.status(404).json({ error: "Batimento não encontrado" });
  }
});

const PORT = 4002;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

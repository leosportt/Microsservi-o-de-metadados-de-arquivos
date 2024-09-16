var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Importar multer para lidar com uploads de arquivos
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Rota principal para servir o HTML
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configuração do multer para armazenar os arquivos enviados temporariamente
var upload = multer({ dest: 'uploads/' }); // Define o diretório onde os arquivos serão temporariamente armazenados

// Rota para analisar o arquivo enviado
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Verifique se um arquivo foi enviado
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
  }

  // Retornar os metadados do arquivo
  res.json({
    name: req.file.originalname,  // Nome do arquivo original
    type: req.file.mimetype,      // Tipo MIME do arquivo
    size: req.file.size           // Tamanho do arquivo em bytes
  });
});

// Configurar a porta do servidor
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

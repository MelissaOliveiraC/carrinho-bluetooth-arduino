const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const express = require('express');
const app = express();

const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

app.set('view engine', 'ejs'); // Definindo o mecanismo de visualização como EJS
app.use(express.static('public')); // Pasta para arquivos estáticos

parser.on('data', (data) => {
  // Processar os dados recebidos do Arduino
  console.log('Dados do Arduino:', data);
  // Atualizar a interface ou realizar outras ações conforme necessário
  io.emit('dadosArduino', data); // Emitir os dados para os clientes conectados via WebSocket
});

app.get('/', (req, res) => {
  res.render('index'); // Renderizar a página inicial usando o template EJS
});

const server = app.listen(3000, () => {
  console.log('Servidor escutando na porta 3000');
});

// Configurar WebSocket usando Socket.io
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Um cliente se conectou');
  // Adicionar lógica adicional conforme necessário para lidar com eventos do WebSocket
});

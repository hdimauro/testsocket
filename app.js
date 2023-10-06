const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const cors = require('cors');

app.use(cors());

const server = http.createServer(app);


const io = new socketIo.Server(server, {
    cors: {
      origin: '*'
      
    },
  });


// Ruta para el método GET que emite un evento al socket
app.get('/emit-event', (req, res) => {
  // Emitir un evento al socket llamado "custom-event"
  io.emit('custom-event', { message: '¡Este es un evento personalizado!' });
  res.send('Evento emitido al socket.');
});

app.get('/', (req, res) => {
       res.send('api socket up.');
  });

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

// Configurar Socket.io para escuchar conexiones
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado al socket.');

  // Manejar eventos del socket, si es necesario
  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado del socket.');
  });
});
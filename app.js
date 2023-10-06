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

let eventCount=0;

// Ruta para el método GET que emite un evento al socket
app.get('/notificar', (req, res) => {
  io.emit('notificar', { usuarios: [] });
  res.send('Evento emitido al socket.');
});

app.get('/actualizarTareaOT/:id', (req, res) => {
    const id = req.params.id; 
    io.emit('actualizarTareasOT', { id: id});
    res.send('Send ' + id);
  });


  // Ruta para el método GET que emite un evento al socket
app.get('/emit-event', (req, res) => {
    // Emitir un evento al socket llamado "custom-event"
      // Generar un número aleatorio entre 1 y 100
      //const randomNumber = Math.floor(Math.random() * 100000) + 1;
      eventCount=eventCount+1;
    io.emit('custom-event', { message: 'events server: '+ eventCount });
    res.send('Evento emitido al socket.');
  });


  // Ruta para el método GET que emite un evento al socket
app.get('/', (req, res) => {
    res.send('Api socket Up!');
  });

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});

// Configurar Socket.io para escuchar conexiones
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado al socket con ID:', socket.id);

    // Manejar eventos del socket, si es necesario
    socket.on('disconnect', () => {
      console.log('El cliente con ID', socket.id, 'se ha desconectado del socket.');
    });
});
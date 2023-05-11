const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const loginRoutes = require('./routes/loginRoutes');
const rolRoutes = require('./routes/rolRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const formularioRoutes = require('./routes/formularioRoutes');
const registroEventoRoutes = require('./routes/registroEventoRoutes');
const fotoRoutes = require('./routes/fotoRoutes');
const contratacionRoutes = require('./routes/contratacionRoutes');
const facturaRoutes = require('./routes/facturaRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/usuarios', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/roles', rolRoutes);
app.use('/formularios', formularioRoutes);
app.use('/eventos', eventoRoutes);
app.use('/registros', registroEventoRoutes);
app.use('/contrataciones', contratacionRoutes);
app.use('/fotos', fotoRoutes);
app.use('/facturas', facturaRoutes);

module.exports = app;
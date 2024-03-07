const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(express.json());

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('transito.db');



//#####################################AGENTE#######################################################
// Crear la tabla de agentes (si no existe)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS agentes (
        id INTEGER PRIMARY KEY,
        nombreCompleto TEXT,
        cedula TEXT,
        eliminado REAL DEFAULT 0
    )`);
});

//Agregar un nuevo agente
app.post('/crearAgente', (req, res) => {
    const { nombreCompleto, cedula } = req.body;
    if (!nombreCompleto || !cedula) {
        res.status(400).json({ error: 'Requiere nombreCompleto y cedula' });
        return;
    }
    db.get('select id,nombreCompleto,cedula from agentes where cedula=? and eliminado=0', [cedula], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {
            res.status(404).json({ error: 'Agente ya existe con esa cedula' });
        } else {
            db.run('INSERT INTO agentes (nombreCompleto, cedula) VALUES (?, ?)', [nombreCompleto, cedula], function(err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(200).json({ id: this.lastID, nombreCompleto, cedula });
                }
            });
        }
    });    
});

//Actualizar un agente
app.post('/updateAgente', (req, res) => {
    const { nombreCompleto, cedula } = req.body;
    if (!nombreCompleto || !cedula) {
        res.status(400).json({ error: 'Requiere nombreCompleto y cedula' });
        return;
    }
    db.get('select id,nombreCompleto,cedula from agentes where cedula=? and eliminado=0', [cedula], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {
            db.run('update agentes set  nombreCompleto=? where cedula=? and eliminado=0', [nombreCompleto, cedula], function(err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(200).json({ id: this.lastID, nombreCompleto, cedula });
                }
            });
        } else {
            res.status(404).json({ error: 'No se encontro la agente' });
        }
    });
});

//Obtener un agente
app.post('/obtenerAgente', (req, res) => {
    const { cedula } = req.body;
    if (!cedula) {
        res.status(400).json({ error: 'Requiere cedula' });
        return;
    }
    
    db.get('select id,nombreCompleto,cedula from agentes where cedula=? and eliminado=0', [cedula], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'No se encontro la agente' });
        }
    });
});

//Eliminar un agente
app.post('/eliminarAgente', (req, res) => {
    const { cedula } = req.body;
    if (!cedula) {
        res.status(400).json({ error: 'Requiere cedula' });
        return;
    }
    
    db.run('update agentes set  eliminado=1 where cedula=? and eliminado=0', [cedula], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ cedula, mensaje: 'Agente Eliminado' });
        }
    });
});
//#####################################Vehiculo#######################################################

// Crear la tabla de vehiculo (si no existe)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS vehiculo (
        id INTEGER PRIMARY KEY,
        placa TEXT,
        marca TEXT,
        modelo  TEXT,
        color  TEXT,
        eliminado REAL DEFAULT 0
    )`);
});

//Agregar un nuevo vehiculo
app.post('/crearVehiculo', (req, res) => {
    const { placa, marca, modelo,  color} = req.body;
    if (!placa || !marca || !modelo || !color) {
        res.status(400).json({ error: 'Requiere placa, marca, modelo, color' });
        return;
    }
    db.get('select id,placa,marca,modelo,color from vehiculo where placa=? and eliminado=0', [placa], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {
            res.status(404).json({ error: 'Vehiculo ya existe' });
        } else {
            db.run('INSERT INTO vehiculo (placa, marca, modelo, color) VALUES (?, ? , ?, ?)', [placa, marca, modelo,  color], function(err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(200).json({ id: this.lastID, placa, marca, modelo,  color });
                }
            });
        }
    });    
});

//Actualizar un vehiculo
app.post('/updateVehiculo', (req, res) => {
    const { placa, marca, modelo,  color } = req.body;
    if (!placa) {
        res.status(400).json({ error: 'Requiere placa' });
        return;
    }
    db.get('select id, placa, marca, modelo, color from vehiculo where placa=? and eliminado=0', [placa], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {
            db.run('update vehiculo set  marca=?, modelo=?, color=? where placa=? and eliminado=0', [marca, modelo,  color, placa], function(err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(200).json({ id: this.lastID, placa, marca, modelo,  color });
                }
            });
        } else {
            res.status(404).json({ error: 'No se encontro placa de vehiculo' });
        }
    });
});

//Obtener un vehiculo
app.post('/obtenerVehiculo', (req, res) => {
    const { placa } = req.body;
    if (!placa) {
        res.status(400).json({ error: 'Requiere placa' });
        return;
    }
    
    db.get('select id, placa, marca, modelo, color from vehiculo where placa=? and eliminado=0', [placa], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'No se encontro el vehiculo' });
        }
    });
});

//Eliminar un Vehiculo
app.post('/eliminarVehiculo', (req, res) => {
    const { placa } = req.body;
    if (!placa) {
        res.status(400).json({ error: 'Requiere placa' });
        return;
    }
    
    db.run('update vehiculo set  eliminado=1 where placa=? and eliminado=0', [placa], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ placa, mensaje: 'Vehiculo Eliminado' });
        }
    });
});
//#####################################Vehiculo#######################################################

// Crear la tabla de vehiculo (si no existe)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS multas (
        id INTEGER PRIMARY KEY,
        fecha TEXT,
        placa TEXT,
        agente TEXT,
        tipo TEXT,
        estado REAL DEFAULT 0,
        fechaPago TEXT,
        eliminado REAL DEFAULT 0
    )`);
});

//Agregar Multa
app.post('/crearMulta', (req, res) => {
    const { placa, agente, tipo} = req.body;
    if (!placa || !agente || !tipo) {
        res.status(400).json({ error: 'Requiere placa, agente, tipo' });
        return;
    }
    //Consulta Placa
    db.get('select id from vehiculo where placa=? and eliminado=0', [placa], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {

            //Consulta agente
            db.get('select id from agentes where cedula=? and eliminado=0', [agente], (err, row) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else if (row) {
                    db.run('INSERT INTO multas (placa, agente, tipo, fecha) VALUES (?, ? , ?, datetime("now","localtime"))', [placa, agente, tipo], function(err) {
                        if (err) {
                            console.error(err.message);
                            res.status(500).json({ error: 'Internal Server Error' });
                        } else {
                            db.get('SELECT m.id,m.fecha, m.placa, a.nombreCompleto agente, CASE WHEN m.tipo="A" THEN "$139.000" WHEN m.tipo="B" THEN "$278.600" WHEN m.tipo="C" THEN "$522.900" WHEN m.tipo="D" THEN "$1’045.500" WHEN m.tipo="E" THEN "$1’568.400" WHEN m.tipo="F" THEN "$3’136.800" END tipo,CASE WHEN m.estado=0 THEN "Pendiente Pago" ELSE "Pagado" END estado FROM multas m JOIN agentes a ON cedula WHERE m.id=?', [this.lastID], (err, row) => {
                                if (err) {
                                    console.error(err.message);
                                    res.status(500).json({ error: 'Internal Server Error' });
                                } else if (row) {
                                    res.json(row);
                                } else {
                                    res.status(404).json({ error: 'No se encontro la multa' });
                                }
                            });
                        }
                    });
                    
                }else {
                    res.status(404).json({ error: 'Agente NO existe' });
                }
            }); 
        } else {
            res.status(404).json({ error: 'Vehiculo NO existe' });
        }
    });    
});

//Obtener Multas
app.post('/obtenerMulta', (req, res) => {
    const { placa } = req.body;
    if (!placa) {
        res.status(400).json({ error: 'Requiere placa' });
        return;
    }
    
    db.all('SELECT m.id,m.fecha, m.placa, a.nombreCompleto agente, CASE WHEN m.tipo="A" THEN "$139.000" WHEN m.tipo="B" THEN "$278.600" WHEN m.tipo="C" THEN "$522.900" WHEN m.tipo="D" THEN "$1’045.500" WHEN m.tipo="E" THEN "$1’568.400" WHEN m.tipo="F" THEN "$3’136.800" END tipo,CASE WHEN m.estado=0 THEN "Pendiente Pago" ELSE "Pagado" END estado, m.fechaPago  FROM multas m JOIN agentes a ON cedula WHERE m.placa=?', [placa], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'No se encontro el vehiculo' });
        }
    });
});

//Actualizar un vehiculo
app.post('/pagarMulta', (req, res) => {
    const { idmulta } = req.body;
    if (!idmulta) {
        res.status(400).json({ error: 'Requiere id de la multa [idmulta]' });
        return;
    }
    db.get('select id from multas where id=? and estado=0', [idmulta], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (row) {
            db.run('update multas set  estado=1,fechaPago=datetime("now","localtime") where id=?', [idmulta], function(err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(200).json({mensaje: 'Multa Pagada' });
                }
            });
        } else {
            res.status(404).json({ error: 'La multa no existe o ya fue pagada' });
        }
    });
});



app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

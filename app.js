import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql2 from "mysql2";

const app = express();
const PORT = 3000;

function loadHost() {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
    
    app.listen(PORT, () => {
        console.log(`Запуск сервера на http://localhost:${PORT}`);
    });
}
loadHost();

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_portfolio'
})

db.connect((err) => {
    if (err) {
        console.log(`Ошибка подключения к базе данных: ${err}`)
        return;
    }
    console.log('База данных подключена')
})

app.get('/api/my_projects', (req, res) => {
    const sql = 'SELECT * FROM my_projects';
    db.query(sql, (err, result) => {
        if(err) {
            concole.error(err);
            res.staus(500).json({error: 'Ошибка получения данных'});
            return;
        }
        res.json(result)
    })
})
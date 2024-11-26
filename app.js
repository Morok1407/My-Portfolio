import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql2 from "mysql2";

function loadHost() {
    const app = express();
    const PORT = 3000;

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
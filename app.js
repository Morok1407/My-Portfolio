import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql2 from "mysql2";
import 'dotenv/config';
import { Bot } from 'grammy'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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
            console.error(err);
            res.status(500).json({error: 'Ошибка получения данных'});
            return;
        }
        res.json(result)
    })
})

const bot = new Bot(process.env.BOT_API);
const targetUserId = 1203619482;
function MyBot() {
    bot.command('start', async (ctx) => {
        if (ctx.from.id === targetUserId) {
            ctx.reply('Привет хозяин!!!');
        } else {
            ctx.reply('Бот создан не для тебя!!! / The bot was not created for you!!!');
        }
    });

    bot.start();
}
MyBot();

app.post('/api/messageData', async (req, res) => {
    const {name, email, text} = req.body;

    const message = `
    Новое сообщение с сайта:
    \nИмя: ${name}
    \nEmail: ${email}
    \nСообщение: ${text}
    `;

    try {
        res.status(200).json({ message: 'Данные успешно получены и отправлены в Telegram.' });
        bot.api.sendMessage(targetUserId, message)
    } catch (error) {
        console.error('Ошибка при отправке в Telegram:', error);
        res.status(500).json({ message: 'Ошибка при отправке сообщения в Telegram.' });
    }
});
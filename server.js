// server.js
const express = require('express');
const bodyParser = require('body-parser'); // или используйте app.use(express.json())
const Database = require('better-sqlite3');
const path = require('path'); // Для работы с путями файлов

const app = express();
const PORT = process.env.PORT || 8080; // Используем переменную окружения PORT для Render

// Подключаемся к базе данных SQLite
// Используем путь к файлу database.db в корне проекта
const dbPath = path.join(__dirname, 'database.db');
const db = new Database(dbPath);

// Создаём таблицу contacts, если она не существует
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    mobile TEXT,
    home TEXT
  );
`);

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Определяем маршрут для проверки работоспособности
app.get('/', (req, res) => {
  res.send('REST API Server is running!');
});


// Обработчик ошибок
function handleError(res, message, code = 500) {
  console.error("Ошибка:", message);
  res.status(code).json({ error: message });
}

// --- CRUD Маршруты ---

// GET /api/contacts - Получить все контакты
app.get('/api/contacts', (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM contacts ORDER BY name');
    const contacts = stmt.all();
    res.json(contacts);
  } catch (err) {
    handleError(res, err.message);
  }
});

// POST /api/contacts - Создать новый контакт
app.post('/api/contacts', (req, res) => {
  const { name, email, mobile, home } = req.body;

  if (!name) { // Проверяем обязательное поле
    return handleError(res, "Имя (name) обязательно для заполнения", 400);
  }

  try {
    const stmt = db.prepare('INSERT INTO contacts (name, email, mobile, home) VALUES (?, ?, ?, ?)');
    const info = stmt.run(name, email, mobile, home);
    // Получаем ID нового контакта
    const newContact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(info.lastInsertRowid);
    res.status(201).json(newContact); // 201 Created
  } catch (err) {
    handleError(res, err.message);
  }
});

// GET /api/contacts/:id - Получить контакт по ID
app.get('/api/contacts/:id', (req, res) => {
  const id = req.params.id;

  try {
    const stmt = db.prepare('SELECT * FROM contacts WHERE id = ?');
    const contact = stmt.get(id);

    if (!contact) {
      return res.status(404).json({ error: "Контакт не найден" });
    }

    res.json(contact);
  } catch (err) {
    handleError(res, err.message);
  }
});

// PUT /api/contacts/:id - Обновить контакт по ID
app.put('/api/contacts/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, mobile, home } = req.body;

  if (!name) { // Проверяем обязательное поле
    return handleError(res, "Имя (name) обязательно для заполнения", 400);
  }

  try {
    const stmt = db.prepare('UPDATE contacts SET name = ?, email = ?, mobile = ?, home = ? WHERE id = ?');
    const info = stmt.run(name, email, mobile, home, id);

    if (info.changes === 0) { // Если ни одна строка не была изменена
      return res.status(404).json({ error: "Контакт не найден" });
    }

    // Получаем обновлённый контакт
    const updatedContact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
    res.json(updatedContact);
  } catch (err) {
    handleError(res, err.message);
  }
});

// DELETE /api/contacts/:id - Удалить контакт по ID
app.delete('/api/contacts/:id', (req, res) => {
  const id = req.params.id;

  try {
    const stmt = db.prepare('DELETE FROM contacts WHERE id = ?');
    const info = stmt.run(id);

    if (info.changes === 0) { // Если ни одна строка не была удалена
      return res.status(404).json({ error: "Контакт не найден" });
    }

    res.status(204).send(); // 204 No Content - успешно удалено
  } catch (err) {
    handleError(res, err.message);
  }
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Приложение запущено на порту ${PORT}`);
  console.log(`База данных SQLite находится в: ${dbPath}`);
});
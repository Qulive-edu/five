# Source Code Context

Generated on: 2025-11-11T17:22:17+03:00

## Repository Overview
- Total Files: 5
- Total Size: 23381 bytes

## Directory Structure
```
context/
  images/
database.db
package.json
redoc/
  openapi.yaml
  redoc.html
server.js
swagger.yaml

```

## File Contents


### File: package.json

```json
{
  "name": "my-contacts-api",
  "version": "1.0.0",
  "description": "Simple REST API for contacts using SQLite",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "sqlite3": "^5.1.6",
    "better-sqlite3": "^8.4.0",
    "body-parser": "^1.20.2",
    "swagger-ui-express": "^4.6.3",
    "yamljs": "^0.3.0"
  }
}
```



### File: redoc/openapi.yaml

```yaml
openapi: 3.1.3
info:
  title: Contacts API
  description: REST API для управления контактами с использованием SQLite базы данных
  version: 1.0.0
  contact:
    name: API Support
    email: support@example.com

servers:
  - url: http://localhost:8080
    description: Development server
  - url: https://your-app.onrender.com
    description: Production server

paths:
  /:
    get:
      summary: Проверка работоспособности сервера
      description: Возвращает статус работы сервера
      responses:
        '200':
          description: Сервер работает
          content:
            text/plain:
              example: "REST API Server is running!"

  /api/contacts:
    get:
      summary: Получить все контакты
      description: Возвращает список всех контактов, отсортированных по имени
      responses:
        '200':
          description: Успешный запрос
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Contact'
              example:
                - id: 1
                  name: "Иван Иванов"
                  email: "ivan@example.com"
                  mobile: "+79991234567"
                  home: "+74951234567"
                - id: 2
                  name: "Петр Петров"
                  email: "petr@example.com"
                  mobile: "+79997654321"
                  home: null
        '500':
          $ref: '#/components/responses/InternalServerError'

    post:
      summary: Создать новый контакт
      description: Создает новый контакт в базе данных
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ContactInput'
            example:
              name: "Мария Сидорова"
              email: "maria@example.com"
              mobile: "+79998887766"
              home: "+74957654321"
      responses:
        '201':
          description: Контакт успешно создан
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Contact'
        '400':
          description: Ошибка валидации
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Имя (name) обязательно для заполнения"
        '500':
          $ref: '#/components/responses/InternalServerError'

  /api/contacts/{id}:
    get:
      summary: Получить контакт по ID
      description: Возвращает контакт по указанному идентификатору
      parameters:
        - name: id
          in: path
          required: true
          description: ID контакта
          schema:
            type: integer
            format: int64
            example: 1
      responses:
        '200':
          description: Успешный запрос
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Contact'
        '404':
          description: Контакт не найден
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Контакт не найден"
        '500':
          $ref: '#/components/responses/InternalServerError'

    put:
      summary: Обновить контакт по ID
      description: Обновляет информацию о контакте по указанному идентификатору
      parameters:
        - name: id
          in: path
          required: true
          description: ID контакта
          schema:
            type: integer
            format: int64
            example: 1
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ContactInput'
            example:
              name: "Иван Иванов (обновленный)"
              email: "ivan.new@example.com"
              mobile: "+79999999999"
              home: null
      responses:
        '200':
          description: Контакт успешно обновлен
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Contact'
        '400':
          description: Ошибка валидации
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Имя (name) обязательно для заполнения"
        '404':
          description: Контакт не найден
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Контакт не найден"
        '500':
          $ref: '#/components/responses/InternalServerError'

    delete:
      summary: Удалить контакт по ID
      description: Удаляет контакт по указанному идентификатору
      parameters:
        - name: id
          in: path
          required: true
          description: ID контакта
          schema:
            type: integer
            format: int64
            example: 1
      responses:
        '204':
          description: Контакт успешно удален
        '404':
          description: Контакт не найден
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Контакт не найден"
        '500':
          $ref: '#/components/responses/InternalServerError'

components:
  schemas:
    Contact:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: integer
          format: int64
          description: Уникальный идентификатор контакта
          example: 1
        name:
          type: string
          description: Имя контакта
          example: "Иван Иванов"
        email:
          type: string
          nullable: true
          description: Email адрес
          example: "ivan@example.com"
        mobile:
          type: string
          nullable: true
          description: Мобильный телефон
          example: "+79991234567"
        home:
          type: string
          nullable: true
          description: Домашний телефон
          example: "+74951234567"

    ContactInput:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          description: Имя контакта (обязательное поле)
          example: "Иван Иванов"
        email:
          type: string
          nullable: true
          description: Email адрес
          example: "ivan@example.com"
        mobile:
          type: string
          nullable: true
          description: Мобильный телефон
          example: "+79991234567"
        home:
          type: string
          nullable: true
          description: Домашний телефон
          example: "+74951234567"

    Error:
      type: object
      properties:
        error:
          type: string
          description: Сообщение об ошибке
          example: "Произошла ошибка"

  responses:
    InternalServerError:
      description: Внутренняя ошибка сервера
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: "Внутренняя ошибка сервера"

tags:
  - name: Contacts
    description: Операции с контактами
  - name: Health
    description: Проверка работоспособности
```



### File: redoc/redoc.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Contacts API Documentation</title>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
    <style>
      body { margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    <redoc spec-url='openapi.yaml'></redoc>
    <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
  </body>
</html>
```



### File: server.js

```javascript
    // server.js
    const swaggerUi = require('swagger-ui-express');
    const YAML = require('yamljs');
    const swaggerDocument = YAML.load('./swagger.yaml');

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
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/docs', express.static('./redoc'));

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
```



### File: swagger.yaml

```yaml
openapi: 3.0.3
info:
  title: Contacts API
  description: REST API для управления контактами с использованием SQLite базы данных
  version: 1.0.0
  contact:
    name: API Support
    email: support@example.com

servers:
  - url: http://localhost:8080
    description: Development server
  - url: https://your-app.onrender.com
    description: Production server

paths:
  /:
    get:
      summary: Проверка работоспособности сервера
      description: Возвращает статус работы сервера
      responses:
        '200':
          description: Сервер работает
          content:
            text/plain:
              example: "REST API Server is running!"

  /api/contacts:
    get:
      summary: Получить все контакты
      description: Возвращает список всех контактов, отсортированных по имени
      responses:
        '200':
          description: Успешный запрос
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Contact'
              example:
                - id: 1
                  name: "Иван Иванов"
                  email: "ivan@example.com"
                  mobile: "+79991234567"
                  home: "+74951234567"
                - id: 2
                  name: "Петр Петров"
                  email: "petr@example.com"
                  mobile: "+79997654321"
                  home: null
        '500':
          $ref: '#/components/responses/InternalServerError'

    post:
      summary: Создать новый контакт
      description: Создает новый контакт в базе данных
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ContactInput'
            example:
              name: "Мария Сидорова"
              email: "maria@example.com"
              mobile: "+79998887766"
              home: "+74957654321"
      responses:
        '201':
          description: Контакт успешно создан
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Contact'
        '400':
          description: Ошибка валидации
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Имя (name) обязательно для заполнения"
        '500':
          $ref: '#/components/responses/InternalServerError'

  /api/contacts/{id}:
    get:
      summary: Получить контакт по ID
      description: Возвращает контакт по указанному идентификатору
      parameters:
        - name: id
          in: path
          required: true
          description: ID контакта
          schema:
            type: integer
            format: int64
            example: 1
      responses:
        '200':
          description: Успешный запрос
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Contact'
        '404':
          description: Контакт не найден
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Контакт не найден"
        '500':
          $ref: '#/components/responses/InternalServerError'

    put:
      summary: Обновить контакт по ID
      description: Обновляет информацию о контакте по указанному идентификатору
      parameters:
        - name: id
          in: path
          required: true
          description: ID контакта
          schema:
            type: integer
            format: int64
            example: 1
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ContactInput'
            example:
              name: "Иван Иванов (обновленный)"
              email: "ivan.new@example.com"
              mobile: "+79999999999"
              home: null
      responses:
        '200':
          description: Контакт успешно обновлен
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Contact'
        '400':
          description: Ошибка валидации
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Имя (name) обязательно для заполнения"
        '404':
          description: Контакт не найден
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Контакт не найден"
        '500':
          $ref: '#/components/responses/InternalServerError'

    delete:
      summary: Удалить контакт по ID
      description: Удаляет контакт по указанному идентификатору
      parameters:
        - name: id
          in: path
          required: true
          description: ID контакта
          schema:
            type: integer
            format: int64
            example: 1
      responses:
        '204':
          description: Контакт успешно удален
        '404':
          description: Контакт не найден
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              example:
                error: "Контакт не найден"
        '500':
          $ref: '#/components/responses/InternalServerError'

components:
  schemas:
    Contact:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: integer
          format: int64
          description: Уникальный идентификатор контакта
          example: 1
        name:
          type: string
          description: Имя контакта
          example: "Иван Иванов"
        email:
          type: string
          nullable: true
          description: Email адрес
          example: "ivan@example.com"
        mobile:
          type: string
          nullable: true
          description: Мобильный телефон
          example: "+79991234567"
        home:
          type: string
          nullable: true
          description: Домашний телефон
          example: "+74951234567"

    ContactInput:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          description: Имя контакта (обязательное поле)
          example: "Иван Иванов"
        email:
          type: string
          nullable: true
          description: Email адрес
          example: "ivan@example.com"
        mobile:
          type: string
          nullable: true
          description: Мобильный телефон
          example: "+79991234567"
        home:
          type: string
          nullable: true
          description: Домашний телефон
          example: "+74951234567"

    Error:
      type: object
      properties:
        error:
          type: string
          description: Сообщение об ошибке
          example: "Произошла ошибка"

  responses:
    InternalServerError:
      description: Внутренняя ошибка сервера
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error: "Внутренняя ошибка сервера"

tags:
  - name: Contacts
    description: Операции с контактами
  - name: Health
    description: Проверка работоспособности
```



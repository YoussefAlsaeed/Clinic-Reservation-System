@echo off

REM Create the database using createDB.js
node createDB.js

REM Start your Sequelize project
node index.js

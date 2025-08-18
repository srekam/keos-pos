@echo off
echo ========================================
echo Thai Pharmacy POS - Database Setup
echo ========================================
echo.

echo Starting PostgreSQL database...
docker-compose up -d postgres

echo.
echo Waiting for database to be ready...
timeout /t 10 /nobreak > nul

echo.
echo Starting pgAdmin...
docker-compose up -d pgadmin

echo.
echo ========================================
echo Database Setup Complete!
echo ========================================
echo.
echo PostgreSQL Database:
echo - Host: localhost
echo - Port: 5432
echo - Database: pharmacy_pos
echo - Username: pharmacy_user
echo - Password: pharmacy_password_2024
echo.
echo pgAdmin (Web Interface):
echo - URL: http://localhost:8080
echo - Email: admin@pharmacypos.com
echo - Password: admin_password_2024
echo.
echo Connection String:
echo postgresql://pharmacy_user:pharmacy_password_2024@localhost:5432/pharmacy_pos
echo.
echo Press any key to continue...
pause > nul

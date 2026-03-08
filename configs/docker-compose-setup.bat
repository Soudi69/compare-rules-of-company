@echo off
REM Docker Compose Script - Windows Version

echo 🚀 AI Rules Analyzer - Docker Setup ^& Launch
echo ==============================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed!
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed!
    echo Please install Docker Compose from: https://docs.docker.com/compose/install/
    exit /b 1
)

echo ✓ Docker is installed
echo ✓ Docker Compose is installed
echo.

echo Step 1: Building Docker images...
docker-compose build --no-cache
if errorlevel 1 (
    echo ❌ Failed to build images
    exit /b 1
)
echo ✓ Images built successfully!
echo.

echo Step 2: Starting services...
docker-compose up -d
if errorlevel 1 (
    echo ❌ Failed to start services
    exit /b 1
)
echo ✓ Services starting...
echo.

echo Step 3: Waiting for services to be ready...
timeout /t 15 /nobreak
echo.

echo Step 4: Service status
docker-compose ps
echo.

echo ✅ All services are starting!
echo.
echo 🎉 You can now access the application:
echo    Frontend: http://localhost:5173
echo    Backend API: http://localhost:8000
echo    API Docs: http://localhost:8000/docs
echo.

echo 📜 Useful commands:
echo.
echo   View logs:
echo     docker-compose logs -f
echo     docker-compose logs -f backend
echo     docker-compose logs -f frontend
echo.
echo   Stop services:
echo     docker-compose down
echo.
echo   Restart services:
echo     docker-compose restart
echo.

echo Happy analyzing! 🚀
pause

@echo off
REM AI Rules Analyzer - Prerequisites Installer (Windows)

echo 🚀 AI Rules Analyzer - Prerequisites Installer
echo ============================================
echo.
echo This script will help you install all required prerequisites:
echo   • Node.js 18+ for frontend
echo   • Python 3.8+ for backend
echo   • Docker Desktop for containerization
echo   • Ollama for Llama 2 LLM
echo.
echo Checking your Windows system...
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Node.js: Already installed
    node --version
) else (
    echo ✗ Node.js: NOT INSTALLED
    echo   Download from: https://nodejs.org/
    echo   Choose the LTS version
)

echo.

REM Check Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Python: Already installed
    python --version
) else (
    echo ✗ Python: NOT INSTALLED
    echo   Download from: https://www.python.org/downloads/
    echo   Check "Add Python to PATH" during installation
)

echo.

REM Check Docker
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Docker: Already installed
    docker --version
) else (
    echo ✗ Docker: NOT INSTALLED
    echo   Download from: https://www.docker.com/products/docker-desktop
)

echo.

REM Check Docker Compose
docker-compose --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Docker Compose: Already installed
    docker-compose --version
) else (
    echo   Docker Compose: Check if included with Docker Desktop
)

echo.

echo === Installation Instructions ===
echo.
echo 1. Node.js:
echo    - Visit: https://nodejs.org/
echo    - Download LTS version
echo    - Run installer and follow defaults
echo.
echo 2. Python:
echo    - Visit: https://www.python.org/downloads/
echo    - Download Python 3.11+
echo    - IMPORTANT: Check "Add Python to PATH"
echo.
echo 3. Docker Desktop:
echo    - Visit: https://www.docker.com/products/docker-desktop
echo    - Download and install
echo    - Restart your computer after installation
echo.
echo 4. Ollama:
echo    - Visit: https://ollama.ai
echo    - Download and install
echo    - Run "ollama serve" to start
echo.

echo === After Installation ===
echo.
echo 1. Open PowerShell or Command Prompt
echo 2. Navigate to project folder:
echo    cd path\to\compare-rules-of-company
echo.
echo 3. Download Llama 2 model:
echo    ollama pull llama2
echo.
echo 4. Start Ollama (in one terminal):
echo    ollama serve
echo.
echo 5. In another terminal, run Docker:
echo    docker-compose-setup.bat
echo.
echo === Verification ===
echo.
node --version
python --version
docker --version
docker-compose --version

echo.
echo Press any key to exit...
pause >nul

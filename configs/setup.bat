@echo off
echo 🚀 AI Rules Analyzer - Setup Script
echo ====================================
echo.

REM Check prerequisites
echo ✓ Checking prerequisites...

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org
    exit /b 1
)

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python 3 is not installed. Please install Python 3.8+ from https://www.python.org
    exit /b 1
)

where ollama >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Ollama is not installed. Please install from https://ollama.ai
    echo    After installation, run: ollama pull llama2
    echo    Then start it with: ollama serve
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('python --version') do set PYTHON_VERSION=%%i

echo ✓ Node.js: %NODE_VERSION%
echo ✓ Python: %PYTHON_VERSION%
echo ✓ Ollama: installed
echo.

REM Backend setup
echo 📦 Setting up backend...
cd backend

if not exist "venv" (
    python -m venv venv
    echo ✓ Virtual environment created
)

call venv\Scripts\activate.bat

pip install -r requirements.txt
echo ✓ Backend dependencies installed

if not exist ".env" (
    copy .env.example .env
    echo ✓ .env file created
)

cd ..

REM Frontend setup
echo 📦 Setting up frontend...
cd frontend

call npm install
echo ✓ Frontend dependencies installed

cd ..

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo.
echo 1. Start Ollama (in a new terminal):
echo    ollama serve
echo.
echo 2. Start the backend (in another terminal):
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python main.py
echo.
echo 3. Start the frontend (in another terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open http://localhost:5173 in your browser
echo.
echo 🎉 Happy analyzing!

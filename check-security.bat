@echo off
REM Script para verificar integridade de segurança da aplicação

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║        🔒 Verificação de Segurança - Raffle System            ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Verificar Node.js
echo [1/6] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js instalado
    node --version
) else (
    echo ❌ Node.js não encontrado
    exit /b 1
)

REM Verificar frontend
echo.
echo [2/6] Verificando dependências do frontend...
if exist "node_modules" (
    echo ✅ Frontend dependencies instaladas
) else (
    echo ⚠️  Frontend dependencies não instaladas
    echo   Execute: npm install
)

REM Verificar backend
echo.
echo [3/6] Verificando dependências do backend...
if exist "backend\node_modules" (
    echo ✅ Backend dependencies instaladas
) else (
    echo ⚠️  Backend dependencies não instaladas
    echo   Execute: cd backend && npm install
)

REM Verificar .env
echo.
echo [4/6] Verificando arquivo .env...
if exist "backend\.env" (
    echo ✅ Arquivo .env existe
    
    REM Verificar se tem ENCRYPTION_KEY
    findstr /c:"ENCRYPTION_KEY=" backend\.env >nul
    if %errorlevel% equ 0 (
        echo ✅ ENCRYPTION_KEY configurada
    ) else (
        echo ❌ ENCRYPTION_KEY não configurada
        echo   Execute: node backend/generate-security-keys.js
    )
    
    REM Verificar se tem MongoDB URI
    findstr /c:"MONGODB_URI=" backend\.env >nul
    if %errorlevel% equ 0 (
        echo ✅ MONGODB_URI configurada
    ) else (
        echo ❌ MONGODB_URI não configurada
        echo   Siga as instruções em MONGODB_SETUP.md
    )
) else (
    echo ❌ Arquivo .env não encontrado
    echo   Copie backend\.env.example para backend\.env
)

REM Verificar pacotes de segurança
echo.
echo [5/6] Verificando pacotes de segurança...
cd backend
findstr /c:"helmet" package.json >nul
if %errorlevel% equ 0 echo ✅ Helmet (headers)
findstr /c:"express-rate-limit" package.json >nul
if %errorlevel% equ 0 echo ✅ Rate limiting
findstr /c:"bcryptjs" package.json >nul
if %errorlevel% equ 0 echo ✅ Bcrypt (passwords)
findstr /c:"jsonwebtoken" package.json >nul
if %errorlevel% equ 0 echo ✅ JWT (tokens)
findstr /c:"mongo-sanitize" package.json >nul
if %errorlevel% equ 0 echo ✅ Mongo-sanitize
cd ..

REM Arquivos de segurança
echo.
echo [6/6] Verificando arquivos de segurança...
if exist "backend\middleware\securityHeaders.js" echo ✅ Security headers
if exist "backend\middleware\securityMonitoring.js" echo ✅ Security monitoring
if exist "backend\utils\encryption.js" echo ✅ Encryption utils
if exist "backend\utils\validators.js" echo ✅ Input validators
if exist "MONGODB_SETUP.md" echo ✅ MongoDB setup guide
if exist "SECURITY_VERIFICATION.md" echo ✅ Security verification guide

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                   ✅ Verificação Completa!                     ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.
echo Próx imos passos:
echo 1. Configure MongoDB: veja MONGODB_SETUP.md
echo 2. Inicie backend:    cd backend && npm run dev
echo 3. Inicie frontend:   npm run dev
echo 4. Teste endpoints:   consulte SECURITY_VERIFICATION.md
echo.
pause

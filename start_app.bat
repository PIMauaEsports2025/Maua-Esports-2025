@echo off
echo Iniciando o servidor backend e o cliente frontend...
echo.

REM Verifica se o Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo ERRO: Node.js não encontrado. Por favor, instale o Node.js antes de continuar.
  pause
  exit /b 1
)

REM Primeiro instalar dependências críticas para o servidor
echo Verificando dependências do servidor...
npm list --depth=0 express mongoose dotenv cors >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo Instalando dependências do servidor...
  npm install express mongoose dotenv cors
)

echo.
echo Iniciando servidor backend na porta 5000...
start cmd /k "cd /d %~dp0 && node src/server/server.js"

echo.
echo Aguardando 5 segundos para o servidor iniciar...
timeout /t 5 /nobreak > nul

REM Verifica se o servidor está rodando
echo Verificando se o servidor está funcionando...
curl -s http://localhost:5000 >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo AVISO: Não foi possível conectar ao servidor. Verifique:
  echo  - Se a porta 5000 não está sendo usada por outro processo
  echo  - Se não há erros no console do servidor
  echo  - Se as credenciais do MongoDB estão corretas
  echo Continuando mesmo assim...
  echo.
) else (
  echo Servidor verificado e funcionando!
  echo.
)

echo Iniciando cliente frontend na porta 3000...
start cmd /k "cd /d %~dp0 && set BROWSER=none&& set WDS_SOCKET_PORT=3000&& set REACT_APP_API_URL=http://localhost:5000/api&& npm start"

echo.
echo Aplicação iniciada! Acesse http://localhost:3000 no seu navegador.
echo.
echo Para verificar se o servidor está rodando, abra http://localhost:5000 em seu navegador.
echo.
@echo off
echo Iniciando todos os serviços do Projeto Mauá Esports...
echo.

REM Verifica se o Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo ERRO: Node.js não encontrado. Por favor, instale o Node.js antes de continuar.
  pause
  exit /b 1
)
echo Node.js encontrado.
echo.

REM Navega para o diretório raiz do projeto a partir da localização do script (tools\)
set PROJECT_ROOT=%~dp0..\
echo Raiz do projeto definida como: %PROJECT_ROOT%
echo.

REM ----------------------------------------------------------------------
REM 1. Iniciar "Banco de Dados" (Node.js em server/server.js)
REM ----------------------------------------------------------------------
echo Preparando para iniciar o Servidor Backend/Banco de Dados (server/server.js)...
set SERVER_DIR=%PROJECT_ROOT%server
echo Verificando dependencias em %SERVER_DIR%...
if exist "%SERVER_DIR%\package.json" (
  echo Encontrado package.json. Instalando dependencias para o servidor...
  start "Install_Server_Deps" /wait cmd /c "cd /d %SERVER_DIR% && npm install"
) else (
  echo package.json nao encontrado em %SERVER_DIR%. Pulando npm install.
)
echo Iniciando Servidor Backend/Banco de Dados...
REM Este servidor precisará ser configurado para rodar em uma porta específica
REM que não entre em conflito com a API (5001) ou o Frontend (3000).
REM Exemplo: porta 5000.
start "Backend_DB_Server" cmd /k "cd /d %SERVER_DIR% && node server.js"
echo.
echo Aguardando 3 segundos para o primeiro servidor iniciar...
timeout /t 3 /nobreak > nul
echo.

REM ----------------------------------------------------------------------
REM 2. Iniciar API Mauá Esports (Node.js em api/Stage-API-Maua-Esports-main/index.js)
REM ----------------------------------------------------------------------
echo Preparando para iniciar a API Mauá Esports (api/Stage-API-Maua-Esports-main/index.js)...
set API_DIR=%PROJECT_ROOT%api\Stage-API-Maua-Esports-main
echo Verificando dependencias em %API_DIR%...
if exist "%API_DIR%\package.json" (
  echo Encontrado package.json. Instalando dependencias para a API...
  start "Install_API_Deps" /wait cmd /c "cd /d %API_DIR% && npm install"
) else (
  echo package.json nao encontrado em %API_DIR%. Pulando npm install.
)
echo Iniciando API Mauá Esports...
REM Esta API deve estar configurada para rodar na porta 5001.
start "API_Maua_Esports" cmd /k "cd /d %API_DIR% && node index.js"
echo.
echo Aguardando 5 segundos para a API iniciar...
timeout /t 5 /nobreak > nul
echo.

REM ----------------------------------------------------------------------
REM 3. Iniciar Frontend (npm start na raiz do projeto)
REM ----------------------------------------------------------------------
echo Preparando para iniciar o Frontend (raiz do projeto)...
echo Verificando dependencias do frontend em %PROJECT_ROOT%...
if exist "%PROJECT_ROOT%\package.json" (
  echo Encontrado package.json. Instalando dependencias para o frontend...
  start "Install_Frontend_Deps" /wait cmd /c "cd /d %PROJECT_ROOT% && npm install"
) else (
  echo ALERTA: package.json nao encontrado na raiz do projeto %PROJECT_ROOT%. O comando 'npm start' pode falhar.
)
echo Iniciando Frontend...
REM O frontend rodará na porta 3000 (padrão do React)
REM REACT_APP_API_URL está configurado para http://localhost:5001
start "Frontend_React" cmd /k "cd /d %PROJECT_ROOT% && set NODE_ENV=development && set BROWSER=none && set WDS_SOCKET_PORT=3000 && set REACT_APP_API_URL=http://localhost:5001 && npm start"
echo.

echo Todos os serviços foram iniciados em janelas separadas.
echo.
echo Verifique cada janela para logs e status:
echo  - Backend_DB_Server (server/server.js): Verifique o console para a porta e status.
echo  - API_Maua_Esports (api/.../index.js): Deve estar rodando na porta 5001.
echo  - Frontend_React: Deve estar acessível em http://localhost:3000
echo.
echo Pressione qualquer tecla para fechar esta janela principal se todas as outras iniciaram...
pause
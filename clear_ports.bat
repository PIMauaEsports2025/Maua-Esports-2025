@echo off
echo Verificando e encerrando processos na porta 5000...

REM Encontra e mata processos usando a porta 5000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
    echo Processo encontrado: PID %%a usando a porta 5000
    echo Tentando encerrar processo com PID %%a...
    taskkill /F /PID %%a
    if %ERRORLEVEL% equ 0 (
        echo Processo encerrado com sucesso.
    ) else (
        echo Falha ao encerrar o processo. Talvez seja necessário executar como administrador.
    )
)

echo.
echo Verificação concluída.
echo Se você ainda tiver problemas, tente executar este script como administrador.
echo.
pause
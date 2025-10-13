@echo off
echo Iniciando servidor web local...
echo.
echo Tu portafolio estara disponible en:
echo http://localhost:8000
echo http://127.0.0.1:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
python -m http.server 8000
pause

Write-Host "Iniciando servidor web local..." -ForegroundColor Green
Write-Host ""
Write-Host "Tu portafolio estara disponible en:" -ForegroundColor Yellow
Write-Host "http://localhost:8000" -ForegroundColor Cyan
Write-Host "http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Red
Write-Host ""

# Cambiar al directorio del proyecto
Set-Location -Path "C:\Users\estev\Downloads\web"

# Iniciar servidor
python -m http.server 8000

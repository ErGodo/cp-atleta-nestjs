@echo off
setlocal enabledelayedexpansion

:: 1. Definir nombre del servicio y región
set SERVICE_NAME=cp-atleta-nestjs
set REGION=us-central1

:: 2. Leer variables del .env y construir string para gcloud
set ENV_VARS=
for /F "usebackq tokens=*" %%A in (".env") do (
    set LINE=%%A
    :: Ignorar comentarios y líneas vacías (básico)
    if not "!LINE:~0,1!"=="#" (
        if defined ENV_VARS (
            set ENV_VARS=!ENV_VARS!,!LINE!
        ) else (
            set ENV_VARS=!LINE!
        )
    )
)

echo.
echo ========================================================
echo  Deploying %SERVICE_NAME% to Cloud Run (%REGION%)
echo ========================================================
echo.
echo Inyectando variables de entorno desde .env...
echo Vars: %ENV_VARS%
echo.

:: 3. Ejecutar comando de deploy
call gcloud run deploy %SERVICE_NAME% ^
  --source . ^
  --region %REGION% ^
  --allow-unauthenticated ^
  --set-env-vars "%ENV_VARS%"

echo.
echo ========================================================
echo  Deploy Finalizado
echo ========================================================


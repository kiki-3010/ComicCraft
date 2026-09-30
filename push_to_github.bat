@echo off
title Push ComicCraft to GitHub
echo ====================================================
echo        COMICCRAFT - GITHUB PUSH WIZARD
echo ====================================================
echo.
set PATH=C:\Users\ELCOT\mingit\cmd;%PATH%

echo Repository: https://github.com/kiki-3010/ComicCraft.git
echo Branch:     main
echo.
echo NOTE: GitHub requires a Personal Access Token (classic) with 'repo' scope.
echo If you don't have one yet, generate it at: https://github.com/settings/tokens
echo.
set /p TOKEN="Paste your GitHub Personal Access Token: "

if "%TOKEN%"=="" (
    echo Error: Token cannot be empty.
    pause
    exit /b
)

echo.
echo Setting remote with your authenticated token...
git remote set-url origin https://kiki-3010:%TOKEN%@github.com/kiki-3010/ComicCraft.git

echo.
echo Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ====================================================
    echo SUCCESS! ComicCraft has been pushed to:
    echo https://github.com/kiki-3010/ComicCraft
    echo ====================================================
    git remote set-url origin https://github.com/kiki-3010/ComicCraft.git
) else (
    echo.
    echo Push failed. Please verify that your token has 'repo' permissions and that you have write access to the repository.
)

pause

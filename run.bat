@echo off
title ComicCraft Platform Launcher
echo ====================================================
echo Starting ComicCraft AI Platform (Client + Server)
echo ====================================================

set PATH=%USERPROFILE%\nodejs;%PATH%

npm run dev
pause

@echo off
SET PATH=C:\Program Files\nodejs;C:\Users\WINDOWS 11\AppData\Roaming\npm;%PATH%
echo Menjalankan Vercel Dev Server...
npx vercel dev --listen 3000
pause

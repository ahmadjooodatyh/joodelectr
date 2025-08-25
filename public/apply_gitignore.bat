\
@echo off
REM هذا الملف ينشئ .gitignore داخل المجلد الحالي
echo Creating .gitignore ...
echo node_modules/ > .gitignore
echo logs >> .gitignore
echo *.log >> .gitignore
echo npm-debug.log* >> .gitignore
echo yarn-debug.log* >> .gitignore
echo yarn-error.log* >> .gitignore
echo dist/ >> .gitignore
echo build/ >> .gitignore
echo .env >> .gitignore
echo .vscode/ >> .gitignore
echo .DS_Store >> .gitignore
echo Thumbs.db >> .gitignore
echo .
echo Done. .gitignore created.
echo.
echo Now run in CMD:
echo git rm -r --cached node_modules
echo git add .gitignore
echo git commit -m "Add .gitignore and remove node_modules from tracking"
echo git push -u origin main
pause

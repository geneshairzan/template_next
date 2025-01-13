cd /web/project_websocket/html
git pull git master
npm i
npm run build
pm2 restart project_websocket

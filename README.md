# Graceful shutdown example

```bash
git clone <this-project-or-your-fork>
npm i
node src

lsof -i :3000
# COMMAND   PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
# node    45095 nukr   11u  IPv6 0x9bf023269c340f89      0t0  TCP *:hbci (LISTEN)

kill -term 45095
```

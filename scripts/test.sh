#!/bin/bash

node src/&

sleep 1 \
  && export NODE_PID=`lsof -i :3000 | grep node | head -n 1 | awk '{print $2}'` \
  && echo $NODE_PID \
  && sleep 1 \
  && echo "kill pid $NODE_PID" \
  && kill -term $NODE_PID&

sleep 1 \
  && echo "GET http://localhost:3000" | vegeta attack -duration=5s | tee result.bin | vegeta report&
wait

echo "done"

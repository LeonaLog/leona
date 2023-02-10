#!/usr/bin/env bash

echo "Start ..."

java -jar /opt/leona/leona-server-4.4.1-SNAPSHOT-shaded.jar server --configfile=/opt/leona/server/server.conf

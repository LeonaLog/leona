# Dockerfile - leona-server image
# Usage: docker build -t guinsoolab/leona_server:4.4.1 .

FROM azul/zulu-openjdk:17.0.4.1

EXPOSE 9000

RUN  mkdir -p /opt/leona

COPY ./leona /opt/leona

WORKDIR /opt/leona

RUN chmod u+x start.sh

ENTRYPOINT ["./start.sh"]

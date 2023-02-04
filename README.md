<div align="right">
    <img src="/misc/assets/guinsoolab-badge.png" width=60 alt="badge">
</div>
<div align="center">
    <img src="/misc/assets/graylog.svg" width=120 alt="logo" />
    <br />
    <small>Security and log data done right</small>
</div>

# Leona

[![License](https://img.shields.io/badge/license-SSPL-green)](https://www.mongodb.com/licensing/server-side-public-license)
[![Maven Central](https://img.shields.io/maven-central/v/org.graylog2/graylog2-server.svg)](http://mvnrepository.com/artifact/org.graylog2/graylog2-server)
[![Build](https://github.com/Graylog2/graylog2-server/actions/workflows/build.yml/badge.svg)](https://github.com/Graylog2/graylog2-server/actions/workflows/build.yml)

Welcome! _Leona_ is an open source log management platform.

You can read more about the project on our [LeonaLog Tutorial](https://ciusji.gitbook.io/leona).

## Quickstart

```shell
git clone git@github.com:LeonaLog/leona.git
cd leona
# JAVA_HOME=?17.jdk/Contents/Home
mvn clean package -DskipTests

# Start server in dev model
java -cp org.graylog2.bootstrap.Main server --configfile=/Users/admin/.graylog/server/server.conf

# Start web in dev model
cd graylog2-web-interface
yarn start
```

Server configuration detail:

```shell
# Leona Server Configuration
## General
is_leader = true
node_id_file = ./server-node-id
password_secret = IHRzmjWfc0mh7D1Pepv7Od6NRL7jqNb0k9g8fvjwyX4Vq1KIHvQSFOHLf4BO1k3hdKdFWmceKwy46BGqIk2NurWAUYSedspb
root_username = admin
root_password_sha2 = 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
rest_listen_uri = http://127.0.0.1:12900/

## Web & REST API
http_bind_address = 127.0.0.1:9000

## Elasticsearch / OpenElasticsearch
elasticsearch_max_docs_per_index = 20000000
elasticsearch_index_prefix = graylog
elasticsearch_max_number_of_indices = 20
elasticsearch_shards = 1
elasticsearch_replicas = 0
elasticsearch_hosts = http://xxx:9200
elasticsearch_analyzer = standard
elasticsearch_disable_version_check = true

## Rotation
output_batch_size = 5000
processbuffer_processors = 5
outputbuffer_processors = 5
processor_wait_strategy = sleeping
ring_size = 1024

## MongoDB
mongodb_uri = mongodb://xxx:27017/graylog
mongodb_max_connections = 100
mongodb_threads_allowed_to_block_multiplier = 5
```

## Documentation

- [Overview](https://ciusji.gitbook.io/leona)
- Installation
  - [Docker](https://ciusji.gitbook.io/leona/installation/docker)
  - [Manual Setup](https://ciusji.gitbook.io/leona/installation/manual-setup)
- Configuration
  - [Server Conf](https://ciusji.gitbook.io/leona/configuration/server-conf)
  - [Web Interface](https://ciusji.gitbook.io/leona/configuration/web-interface)
  - [Multi-Nodes](https://ciusji.gitbook.io/leona/configuration/multi-nodes)
  - [Index Model](https://ciusji.gitbook.io/leona/configuration/index-model)
  - [Backup](https://ciusji.gitbook.io/leona/configuration/backup)
  - [The REST APIs](https://ciusji.gitbook.io/leona/configuration/the-rest-apis)
- Security
  - [Using ModSecurity](https://ciusji.gitbook.io/leona/security/using-modsecurity)
  - [Logging User Activity](https://ciusji.gitbook.io/leona/security/logging-user-activity)
  - [The URL Whitelist](https://ciusji.gitbook.io/leona/security/the-url-whitelist)
- Dashboards
  - [Leona Dashboard](https://ciusji.gitbook.io/leona/dashboards/leona-dashboard)
- Alerts & Notifications 
  - [Alerts And Events](https://ciusji.gitbook.io/leona/alerts-and-notifications/alerts-and-events)
  - [Alerting By Example](https://ciusji.gitbook.io/leona/alerts-and-notifications/alerting-by-example)
  - [Notifications](https://ciusji.gitbook.io/leona/alerts-and-notifications/notifications)
- Searching
  - [Search Query Language](https://ciusji.gitbook.io/leona/searching/search-query-language)
  - [Time Frame Selector](https://ciusji.gitbook.io/leona/searching/time-frame-selector)

## Issue Tracking

Found a bug? Have an idea for an improvement? Feel free to [add an issue](https://github.com/LeonaLog/leona/issues/new/choose).


## Contributing

Help us build the future of log management and be part of a project that is used by thousands of people out there every day.

Read [the contributing instructions](CONTRIBUTING.md) to get started.


## License

Leona is released under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

<img src="https://raw.githubusercontent.com/GuinsooLab/glab/main/src/images/guinsoolab-group.svg" width="120" alt="license" />

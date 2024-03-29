<div align="right">
    <img src="https://raw.githubusercontent.com/LeonaLog/leona/main/misc/assets/guinsoolab-badge.png" width=60 alt="badge">
</div>
<div align="center">
    <img src="https://raw.githubusercontent.com/LeonaLog/leona/main/misc/assets/graylog.svg" width=120 alt="logo" />
    <br />
    <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=14&pause=1000&color=299DAD&center=true&width=435&lines=Security+and+Log+Data+Done+Right" alt="Typing SVG" /></a>
</div>

# Leona

[What's LeonaLog](https://ciusji.gitbook.io/leona/) |
[Log Collection](https://ciusji.gitbook.io/leona/installation/log-collection) |
[Server Configuration](https://ciusji.gitbook.io/leona/configuration/server-conf) |
[Log Source](https://ciusji.gitbook.io/leona/getting-in/log-sources) |
[Log Sense](https://ciusji.gitbook.io/leona/making-sense/pipelines) |
[Leona Ecosystem](https://ciusji.gitbook.io/leona/appendix/ecosystem) |
[FAQs](https://ciusji.gitbook.io/leona/appendix/faqs)

![leona-hero](./misc/assets/leona-hero.png)

Welcome! A centralized Log Management System (LMS) like LeonaLog provides a means to aggregate, organize, and make sense
of all this data.

You can read more about the project on our [LeonaLog Tutorial](https://ciusji.gitbook.io/leona).

## Main Features

There are many features that enhance LeonaLog usefulness as a flexible tool:

- Streams operate as a form of tagging for incoming messages. Streams route messages into categories in real time, and
  team rules instruct LeonaLog to route messages into the appropriate stream.
- The LeonaLog Search page is the interface used to search logs directly. LeonaLog uses a simplified syntax, very
  similar to Lucene. Relative or absolute time ranges are configurable from drop down menus. Searches may be saved or
  visualized as dashboard widgets that may be added directly to dashboards from within the search screen.
- Users may configure their own views and may choose to see either a summary or complete data from event messages.
- LeonaLog Dashboards are visualizations or summaries of information contained in log events. Each dashboard is
  populated by one or more widgets. Widgets visualize or summarize event log data with data derived from field values
  such as counts, averages, or totals. Users can create indicators, charts, graphs, and maps to visualize the data.
- Alerts are created using Event Definitions that consist of Conditions. When a given condition is met it will be stored
  as an Event and can be used to trigger a notification.
- An Index is the basic unit of storage for data in OpenSearch and Elasticsearch. Index sets provide configuration for
  retention, sharding, and replication of the stored data. Values, like retention and rotation strategy, are set on a
  per-index basis, so different data may be subjected to different handling rules.
- LeonaLog's Processing Pipelines enable the user to run a rule, or a series of rules, against a specific type of event.
  Tied to streams, pipelines allow routing, denying, modification, and enrichment of messages as they flow through
  LeonaLog.

## Quickstart

```shell
wget https://raw.githubusercontent.com/LeonaLog/leona/main/docker-compose.yml
docker-compose -f docker-compose.yml up -d
```

Then open your browser with http://lolahost:9000 ✌

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
elasticsearch_index_prefix = leonalog
elasticsearch_max_number_of_indices = 20
elasticsearch_shards = 1
elasticsearch_replicas = 0
elasticsearch_hosts = http://localhost:9200
elasticsearch_analyzer = standard
elasticsearch_disable_version_check = true

## Rotation
output_batch_size = 5000
processbuffer_processors = 5
outputbuffer_processors = 5
processor_wait_strategy = sleeping
ring_size = 1024

## MongoDB
mongodb_uri = mongodb://localhost:27017/leonalog
mongodb_max_connections = 100
mongodb_threads_allowed_to_block_multiplier = 5
```

## Documentation

- [Overview](https://ciusji.gitbook.io/leona)
- Installation
    - [Docker](https://ciusji.gitbook.io/leona/installation/docker)
    - [Manual Setup](https://ciusji.gitbook.io/leona/installation/manual-setup)
    - [Log Collection](https://ciusji.gitbook.io/leona/installation/log-collection)
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
- Getting In
    - [Log Sources](https://ciusji.gitbook.io/leona/getting-in/log-sources)
    - [Sidecar](https://ciusji.gitbook.io/leona/getting-in/sidecar)
    - [Forwarder](https://ciusji.gitbook.io/leona/getting-in/forwarder/forward-installation)
- Making Sense
    - [Pipelines](https://ciusji.gitbook.io/leona/making-sense/pipelines)
    - [Streams](https://ciusji.gitbook.io/leona/making-sense/streams)
    - [Enrichment](https://ciusji.gitbook.io/leona/making-sense/enrichment)
- Alerts & Notifications
    - [Alerts And Events](https://ciusji.gitbook.io/leona/alerts-and-notifications/alerts-and-events)
    - [Alerting By Example](https://ciusji.gitbook.io/leona/alerts-and-notifications/alerting-by-example)
    - [Notifications](https://ciusji.gitbook.io/leona/alerts-and-notifications/notifications)
- Searching
    - [Search Query Language](https://ciusji.gitbook.io/leona/searching/search-query-language)
    - [Time Frame Selector](https://ciusji.gitbook.io/leona/searching/time-frame-selector)

## Issue Tracking

Found a bug? Have an idea for an improvement? Feel free
to [add an issue](https://github.com/LeonaLog/leona/issues/new/choose).

## Contributing

Help us build the future of log management and be part of a project that is used by thousands of people out there every
day.

Read [the contributing instructions](CONTRIBUTING.md) to get started.

## License

Leona is released under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

<img src="https://raw.githubusercontent.com/GuinsooLab/glab/main/src/images/guinsoolab-group.svg" width="120" alt="license" />

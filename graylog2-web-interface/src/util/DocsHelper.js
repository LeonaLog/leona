/*
 * Copyright (C) 2020 Graylog, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the Server Side Public License, version 1,
 * as published by MongoDB, Inc.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * Server Side Public License for more details.
 *
 * You should have received a copy of the Server Side Public License
 * along with this program. If not, see
 * <http://www.mongodb.com/licensing/server-side-public-license>.
 */

class DocsHelper {
  PAGES = {
    ALERTS: 'alerts-and-notifications',
    AUTHENTICATORS: 'permission-management#authentication',
    CHANGELOG: 'appendix/change-log',
    CLUSTER_STATUS_EXPLAINED: 'elasticsearch#cluster-status-explained',
    COLLECTOR: 'getting-in/sidecar',
    COLLECTOR_SIDECAR: 'getting-in/sidecar',
    COLLECTOR_STATUS: 'getting-in/sidecar',
    CONFIGURING_ES: 'elasticsearch',
    DASHBOARDS: 'alerts-and-notifications/leona-dashboard',
    DECORATORS: 'decorators',
    ENTERPRISE_SETUP: 'installation/manual-setup',
    ES_CLUSTER_STATUS_RED: 'elasticsearch#cluster-status-explained',
    ES_CLUSTER_UNAVAILABLE: 'elasticsearch#configuration',
    ES_OPEN_FILE_LIMITS: 'elasticsearch#configuration',
    EXTRACTORS: 'extractors',
    INDEXER_FAILURES: 'indexer-failures',
    INDEX_MODEL: 'configuration/index-model',
    LOAD_BALANCERS: 'load-balancers',
    LOOKUPTABLES: 'making-sense/enrichment/lookup-tables',
    OPERATIONS_CHANGELOG: 'appendix/change-log',
    PAGE_FLEXIBLE_DATE_CONVERTER: 'extractors#normalization',
    PAGE_STANDARD_DATE_CONVERTER: 'extractors#normalization',
    PERMISSIONS: 'permission-management',
    PIPELINE_FUNCTIONS: 'making-sense/pipelines/functions',
    PIPELINE_RULES: 'making-sense/pipelines/rules',
    PIPELINES: 'making-sense/pipelines',
    REPORTING: 'reporting',
    ROLLING_ES_UPGRADE: 'rolling-es-upgrade',
    SEARCH_QUERY_ERRORS: {
      UNKNOWN_FIELD: 'searching/search-query-language',
      QUERY_PARSING_ERROR: 'searching/search-query-language',
      INVALID_OPERATOR: 'searching/search-query-language',
      UNDECLARED_PARAMETER: 'searching/search-query-language',
    },
    SEARCH_QUERY_LANGUAGE: 'searching/search-query-language',
    STREAMS: 'making-sense/streams',
    STREAM_PROCESSING_RUNTIME_LIMITS: 'streams#stream-processing-runtime-limits',
    TIME_FRAME_SELECTOR: 'time-frame-selector',
    UPGRADE_GUIDE: 'installation/manual-setup',
    USERS_ROLES: 'permission-management',
    WELCOME: '', // Welcome page to the documentation
  };

  DOCS_URL = 'https://ciusji.gitbook.io/leona';

  toString(path) {
    const baseUrl = this.DOCS_URL;

    return path === '' ? baseUrl : `${baseUrl}/${path}`;
  }

  toLink(path, title) {
    return `<a href="${this.toString(path)}" target="_blank">${title}</a>`;
  }

  versionedDocsHomePage() {
    return this.toString('');
  }
}

const docsHelper = new DocsHelper();

export default docsHelper;

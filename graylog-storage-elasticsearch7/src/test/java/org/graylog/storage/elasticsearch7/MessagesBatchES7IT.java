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
package org.graylog.storage.elasticsearch7;

import com.codahale.metrics.MetricRegistry;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.graylog.shaded.elasticsearch7.org.elasticsearch.action.admin.indices.refresh.RefreshRequest;
import org.graylog.shaded.elasticsearch7.org.elasticsearch.client.core.CountRequest;
import org.graylog.shaded.elasticsearch7.org.elasticsearch.client.core.CountResponse;
import org.graylog.storage.elasticsearch7.testing.ElasticsearchInstanceES7;
import org.graylog.testing.elasticsearch.SearchServerInstance;
import org.graylog2.indexer.messages.ChunkedBulkIndexer;
import org.graylog2.indexer.messages.MessagesAdapter;
import org.graylog2.indexer.messages.MessagesBatchIT;
import org.graylog2.shared.bindings.providers.ObjectMapperProvider;
import org.junit.Rule;

public class MessagesBatchES7IT extends MessagesBatchIT {
    @Rule
    public final ElasticsearchInstanceES7 elasticsearch = ElasticsearchInstanceES7.create("256m");

    private final ObjectMapper objectMapper = new ObjectMapperProvider().get();

    @Override
    protected SearchServerInstance elasticsearch() {
        return this.elasticsearch;
    }


    @Override
    protected MessagesAdapter createMessagesAdapter(MetricRegistry metricRegistry) {
        return new MessagesAdapterES7(this.elasticsearch.elasticsearchClient(), metricRegistry, new ChunkedBulkIndexer(), objectMapper);
    }

    @Override
    protected long messageCount(String indexName) {
        this.elasticsearch.elasticsearchClient().execute((c, requestOptions) -> c.indices().refresh(new RefreshRequest(), requestOptions));

        final CountRequest countRequest = new CountRequest(indexName);
        final CountResponse result = this.elasticsearch.elasticsearchClient().execute((c, requestOptions) -> c.count(countRequest, requestOptions));

        return result.getCount();
    }
}

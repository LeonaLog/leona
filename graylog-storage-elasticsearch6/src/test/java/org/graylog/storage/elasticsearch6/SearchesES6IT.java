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
package org.graylog.storage.elasticsearch6;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.graylog.storage.elasticsearch6.testing.ElasticsearchInstanceES6;
import org.graylog.testing.elasticsearch.SearchServerInstance;
import org.graylog.testing.elasticsearch.TestableSearchServerInstance;
import org.graylog2.Configuration;
import org.graylog2.indexer.searches.Searches;
import org.graylog2.indexer.searches.SearchesAdapter;
import org.graylog2.indexer.searches.SearchesIT;
import org.junit.Rule;

import static org.graylog.storage.elasticsearch6.testing.TestUtils.jestClient;

public class SearchesES6IT extends SearchesIT {
    @Rule
    public final TestableSearchServerInstance elasticsearch = ElasticsearchInstanceES6.create();

    @Override
    protected SearchServerInstance elasticsearch() {
        return this.elasticsearch;
    }

    private SearchesAdapter createSearchesAdapter() {
        final ScrollResultES6.Factory scrollResultFactory = (initialResult, query, scroll, fields, limit) -> new ScrollResultES6(
                jestClient(elasticsearch), new ObjectMapper(), initialResult, query, scroll, fields, limit
        );

        return new SearchesAdapterES6(
                new Configuration(),
                new MultiSearch(jestClient(elasticsearch)), new Scroll(scrollResultFactory, jestClient(elasticsearch)),
                new SortOrderMapper()
        );
    }

    @Override
    public Searches createSearches() {
        return new Searches(
                indexRangeService,
                metricRegistry,
                streamService,
                indices,
                indexSetRegistry,
                createSearchesAdapter()
        );
    }
}

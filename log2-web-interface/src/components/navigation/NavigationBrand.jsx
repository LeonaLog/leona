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
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { themePropTypes } from 'theme';

// Don't pass active prop, since `a` tag doesn't support it.
// eslint-disable-next-line no-unused-vars
function BrandComponent({ active, theme, ...props }) {
  return (
    <a {...props} className="navbar-brand">
      <svg width="45px" height="45px" viewBox="0 0 45 45" version="1.1">
        <title>graylog</title>
        <g id="graylog-45x45" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <circle id="Oval" fill="#ED1C25" cx="22.5" cy="22.5" r="22.5" />
          <g id="Group" transform="translate(25.110000, 22.290000) rotate(-45.000000) translate(-25.110000, -22.290000) translate(13.110000, 10.290000)">
            <circle id="Oval" fill="#FFFFFF" cx="6" cy="6" r="6" />
            <circle id="Oval" fill="#FFFFFF" cx="6" cy="18" r="6" />
            <polygon id="Path" fill="#FFFFFF" points="18 0 6 0 0 6 0 24 6 24 12 18 12 6" />
            <circle id="Oval" fill="#FFCACA" cx="18" cy="6" r="6" />
          </g>
        </g>
      </svg>
    </a>
  );
}

BrandComponent.propTypes = {
  active: PropTypes.bool,
  theme: themePropTypes.isRequired,
};

BrandComponent.defaultProps = {
  active: false,
};

export default withTheme(BrandComponent);

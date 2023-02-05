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
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';

import { ScratchpadProvider } from 'contexts/ScratchpadProvider';
import { Icon, Spinner } from 'components/common';
import Scratchpad from 'components/scratchpad/Scratchpad';
import CurrentUserContext from 'contexts/CurrentUserContext';
import Navigation from 'components/navigation/Navigation';
import ReportedErrorBoundary from 'components/errors/ReportedErrorBoundary';
import RuntimeErrorBoundary from 'components/errors/RuntimeErrorBoundary';
import LogoIcon from 'assets/leona.svg';

import 'stylesheets/typeahead.less';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-left: 60px;
`;

const NavAppLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 60px;
  background: #24292f;
`;

const PageContent = styled.div`
  height: 100%;
  overflow: auto;
  flex: 1;
`;

const ScrollToHint = styled.div(({ theme }) => css`
  position: fixed;
  left: 50%;
  margin-left: -125px;
  top: 50px;
  color: ${theme.utils.readableColor(chroma(theme.colors.brand.tertiary).alpha(0.8).css())};
  font-size: 80px;
  padding: 25px;
  z-index: 2000;
  width: 200px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  display: none;
  background: ${chroma(theme.colors.brand.tertiary).alpha(0.8).css()};
`);

const App = ({ children }) => (
  <CurrentUserContext.Consumer>
    {(currentUser) => {
      if (!currentUser) {
        return <Spinner />;
      }

      return (
        <ScratchpadProvider loginName={currentUser.username}>
          <NavAppLayout>
            <img style={{ padding: 10 }} src={LogoIcon} width={60} height={60} alt="logo" />
            <ul className="appNavUl">
              <li className="appNavLi">
                <Icon name="magnifying-glass" className="appNavImg" title="Search" onClick={() => window.open('/search', '_self')} />
              </li>
              <li className="appNavLi">
                <Icon name="plus-square" className="appNavImg" title="Input" onClick={() => window.open('/system/inputs', '_self')} />
              </li>
              <li className="appNavLi">
                <Icon name="wind" className="appNavImg" title="Stream" onClick={() => window.open('/streams', '_self')} />
              </li>
              <li className="appNavLi">
                <Icon name="bell" className="appNavImg" title="Alert" onClick={() => window.open('/alerts', '_self')} />
              </li>
              <li className="appNavLi">
                <Icon name="gauge-simple-high" className="appNavImg" title="Dashboard" onClick={() => window.open('/dashboards', '_self')} />
              </li>
              <li className="appNavLi">
                <Icon name="user-edit" className="appNavImg" title="User" onClick={() => window.open('/system/users', '_self')} />
              </li>
              <li className="appNavLi">
                <Icon name="cog" className="appNavImg" title="Configuration" onClick={() => window.open('/system/configurations', '_self')} />
              </li>
              <li style={{ position: 'absolute', left: 0, bottom: 0, width: 60, height: 60, padding: '12px', color: '#fff' }}>
                <Icon name="question-circle" className="appHelpImg" onClick={() => window.open('https://ciusji.gitbook.io/leona', '_blank')} />
              </li>
            </ul>
          </NavAppLayout>
          <AppLayout>
            <Navigation />
            <ScrollToHint id="scroll-to-hint">
              <Icon name="arrow-up" />
            </ScrollToHint>
            <Scratchpad />
            <ReportedErrorBoundary>
              <RuntimeErrorBoundary>
                <PageContent>
                  {children}
                </PageContent>
              </RuntimeErrorBoundary>
            </ReportedErrorBoundary>
          </AppLayout>
        </ScratchpadProvider>
      );
    }}
  </CurrentUserContext.Consumer>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default App;

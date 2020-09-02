/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { ThemeProps, DefaultTheme, css } from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';
import { AlphaPicker } from 'react-color';

const COMPONENT_ID = '{{component}}.AlphaPicker';

export const StyledAlphaPicker = styled(AlphaPicker).attrs<any>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<any>`
  width: 252px !important; /* [1] Override react-color style*/
  margin-top: 4px;

  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledAlphaPicker.defaultProps = {
  theme: DEFAULT_THEME
};

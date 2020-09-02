/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { ThemeProps, DefaultTheme, css } from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';

const COMPONENT_ID = '{{component}}.AlphaPicker';

export const StyledRgbLabel = styled.label.attrs<any>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<any>`
  margin: 4px 0;
  text-align: center;
  color: rgb(104, 115, 125);
  font-size: 14px;
  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledRgbLabel.defaultProps = {
  theme: DEFAULT_THEME
};

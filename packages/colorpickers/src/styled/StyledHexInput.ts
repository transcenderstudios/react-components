/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import styled, { ThemeProps, DefaultTheme, css } from 'styled-components';
import { retrieveComponentStyles, DEFAULT_THEME, getColor } from '@zendeskgarden/react-theming';
import { HuePicker } from 'react-color';

const COMPONENT_ID = '{{component}}.HuePicker';

export const StyledHexInput = styled.input.attrs<any>({
  'data-garden-id': COMPONENT_ID,
  'data-garden-version': PACKAGE_VERSION
})<any>`
  padding: 4px 0;
  text-align: center;
  color: rgb(47, 57, 65);
  ${props => retrieveComponentStyles(COMPONENT_ID, props)};
`;

StyledHexInput.defaultProps = {
  theme: DEFAULT_THEME
};

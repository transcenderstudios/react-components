/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/* eslint-disable */

import * as React from 'react';
import {
  ColorPicker as FluentColorPicker,
  ChoiceGroup,
  IChoiceGroupOption,
  Toggle,
  getColorFromString,
  IColor,
  IColorPickerStyles,
  IColorPickerProps,
  updateA
} from 'office-ui-fabric-react/lib/index';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { useConstCallback } from '@uifabric/react-hooks';

const white = getColorFromString('#ffffff')!;

export const ColorPicker = React.forwardRef<HTMLDivElement, IColorPickerProps>((props, ref) => {
  const [color, setColor] = React.useState(white);
  const [showPreview, setShowPreview] = React.useState(true);
  const [alphaType, setAlphaType] = React.useState<IColorPickerProps['alphaType']>('alpha');

  const updateColor = useConstCallback((ev: any, colorObj: IColor) => setColor(colorObj));
  const onShowPreviewClick = useConstCallback((ev: any, checked?: boolean) =>
    setShowPreview(!!checked)
  );
  const onAlphaTypeChange = React.useCallback(
    (ev: any, option: IChoiceGroupOption = alphaOptions[0]) => {
      if (option.key === 'none') {
        // If hiding the alpha slider, remove transparency from the color
        setColor(updateA(color, 100));
      }
      setAlphaType(option.key as IColorPickerProps['alphaType']);
    },
    [color]
  );

  return (
    <div className={classNames.wrapper}>
      <FluentColorPicker
        showPreview={showPreview}
        styles={colorPickerStyles}
        // The ColorPicker provides default English strings for visible text.
        // If your app is localized, you MUST provide the `strings` prop with localized strings.
        strings={{
          // By default, the sliders will use the text field labels as their aria labels.
          // If you'd like to provide more detailed instructions, you can use these props.
          alphaAriaLabel:
            'Alpha slider: Use left and right arrow keys to change value, hold shift for a larger jump',
          transparencyAriaLabel:
            'Transparency slider: Use left and right arrow keys to change value, hold shift for a larger jump',
          hueAriaLabel:
            'Hue slider: Use left and right arrow keys to change value, hold shift for a larger jump',
          red: 'R',
          green: 'G',
          blue: 'B',
          alpha: 'A'
        }}
        {...props}
      />
    </div>
  );
});

const alphaOptions: IChoiceGroupOption[] = [
  { key: 'alpha', text: 'Alpha' },
  { key: 'transparency', text: 'Transparency' },
  { key: 'none', text: 'None' }
];

const classNames = mergeStyleSets({
  wrapper: { display: 'flex' },
  column2: { marginLeft: 10 }
});

const colorPickerStyles: Partial<IColorPickerStyles> = {
  panel: { padding: 12 },
  root: {
    maxWidth: 302,
    minWidth: 302
  },
  colorRectangle: {
    height: 172,
    '> div.ms-ColorPicker-thumb': {
      width: '18px',
      height: '18px'
    },
    '&.garden-focus-visible': {
      border: '1px solid green'
    }
  },
  colorSquare: {
    marginRight: '8px', // depend on RTL
    marginLeft: '0px',
    height: '34px',
    width: '34px'
  },
  flexContainer: {
    flexDirection: 'row-reverse'
  },
  flexPreviewBox: {
    // border: '2px solid darkgreen'
  },
  flexSlider: {
    '> div': {
      marginBottom: '4px',
      '> div.ms-ColorPicker-thumb': {
        width: '18px',
        height: '18px',
        border: 'none',
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.12), 0px 4px 8px 0px rgba(4, 68, 77, 0.15)'
      }
    },
    'div[role=slider]': {
      height: '16px'
    },
    // '[data-is-focusable="true"]': {
    //   boxShadow: 'rgba(31, 115, 183, 0.35) 0px 0px 0px 3px',
    //   borderColor: 'rgb(31, 115, 183)'
    // }
    '.garden-focus-visible': {
      border: '1px solid red'
    }
  },
  input: {
    input: {
      textAlign: 'center',
      color: 'rgb(47, 57, 65)'
    }
  },
  table: {
    // border: '2px solid magenta'
  },
  tableAlphaCell: {
    textAlign: 'center',
    color: 'rgb(104,115,125)',
    fontSize: '14px'
  },
  tableHeader: {
    textAlign: 'center',
    color: 'rgb(104,115,125)',
    fontSize: '14px'
  },
  tableHexCell: {
    // border: '2px solid orange'
  }
};

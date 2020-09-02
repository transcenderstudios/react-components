/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import {
  StyledExample,
  StyledHuePicker,
  StyledHexInput,
  StyledRgbInput,
  StyledAlphaPicker,
  StyledHexLabel,
  StyledRgbLabel
} from '../styled';
import tinycolor from 'tinycolor2';
import { hsl } from 'polished';
import { ColorPicker } from './ColorPicker';

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const { EditableInput, Saturation } = require('react-color/lib/components/common');

const initialState = {
  hex: '#b4da55',
  hsl: { h: 77, s: 64, l: 59 },
  hsv: {
    h: 77.14285714285714,
    s: 0.610091743119266,
    v: 0.8549019607843137
  },
  rgb: { r: 180, g: 218, b: 85, a: 1 },
  rgbString: 'rgb(180, 218, 85)'
};

function reducer(state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case 'SATURATION BLOCK CHANGE':
      return {
        hsv: payload,
        hex: tinycolor(payload).toHexString(),
        hsl: tinycolor(payload).toHsl(),
        rgb: tinycolor(payload).toRgb(),
        rgbString: tinycolor(payload).toRgbString()
      };
    case 'HUE SLIDER CHANGE':
      return {
        hex: payload.hex,
        hsl: payload.hsl,
        hsv: payload.hsv,
        rgb: payload.rgb,
        rgbString: tinycolor(payload.rgb).toRgbString()
      };
    case 'ALPHA SLIDER CHANGE':
      return {
        hex: payload.hex,
        hsl: payload.hsl,
        hsv: payload.hsv,
        rgb: payload.rgb,
        rgbString: tinycolor(payload.rgb).toRgbString()
      };
    case 'HEX CHANGE':
      if (tinycolor(payload.hex).isValid()) {
        return {
          hex: payload.hex,
          hsl: tinycolor(payload.hex).toHsl(),
          hsv: tinycolor(payload.hex).toHsv(),
          rgb: tinycolor(payload.hex).toRgb(),
          rgbString: tinycolor(payload.hex).toRgbString()
        };
      }

      return {
        ...state,
        hex: payload.hex
      };
    case 'RGBA CHANGE': {
      const { rgb } = state;
      const { r, g, b, a } = payload;
      const nextRgb = {
        r: r || rgb.r,
        g: g || rgb.g,
        b: b || rgb.b,
        a: a || rgb.a
      };
      return {
        hex: tinycolor(nextRgb).toHexString(),
        hsl: tinycolor(nextRgb).toHsl(),
        hsv: tinycolor(nextRgb).toHsv(),
        rgb: nextRgb,
        rgbString: tinycolor(nextRgb).toRgbString()
      };
    }
    default:
      throw new Error();
  }
}

const inlineStyles = {
  container: {
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
    display: 'flex',
    flexDirection: 'column',
    height: 282,
    width: 200
  },
  pointer: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    transform: 'translate(-9px, -1px)',
    backgroundColor: 'rgb(248, 248, 248)',
    boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)'
  },
  slider: {
    marginTop: '1px',
    width: '4px',
    borderRadius: '1px',
    height: '8px',
    boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
    background: '#fff',
    transform: 'translateX(-2px)'
  },
  saturation: {
    width: '100%',
    paddingBottom: '75%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px'
  },
  swatchSquare: {
    minWidth: 20,
    minHeight: 20,
    margin: '1px 2px',
    cursor: 'pointer',
    boxShadow: '0 0 2px rgba(0, 0, 0, .6)'
  }
};

const inputStyles = {
  input: {
    border: '1px solid red'
  },
  label: {
    fontSize: '12px',
    color: 'red'
  }
};

const CustomPointer = () => {
  return <div style={inlineStyles.pointer} />;
};

function Picker({ onChange }: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const groupContext = {};

  // React.useEffect(() => {
  //   if (Object.keys(groupContext).length) {
  //     setColorPickerState && setColorPickerState(state);
  //   } else {
  //     onChange && onChange(state);
  //   }
  // }, [onChange, state, setColorPickerState, groupContext]);
  const inputRef = React.useRef<any>();
  const redRef = React.useRef<any>();
  const greenRef = React.useRef<any>();
  const blueRef = React.useRef<any>();
  const alphaRef = React.useRef<any>();

  return (
    <div className="App" style={{ width: '292px' }}>
      <div style={inlineStyles.saturation as any}>
        <Saturation
          style={{ width: '100%' }}
          onChange={(hsv: any, event: any) => {
            dispatch({ type: 'SATURATION BLOCK CHANGE', payload: hsv });
          }}
          hsl={state.hsl}
          hsv={state.hsv}
          pointer={CustomPointer}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <div
          style={{
            height: '36px',
            width: '36px',
            backgroundColor: tinycolor(state.rgb).toRgbString(),
            boxShadow: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.19)'
          }}
        ></div>

        <div>
          <StyledHuePicker
            color={state.hex}
            onChange={(colorPickerState: any) => {
              dispatch({ type: 'HUE SLIDER CHANGE', payload: colorPickerState });
            }}
          />

          <StyledAlphaPicker
            color={state.hsl}
            onChange={(colorPickerState: any, event: any) => {
              dispatch({ type: 'ALPHA SLIDER CHANGE', payload: colorPickerState });
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '84px' }}>
          <StyledHexLabel htmlFor="hex-input">Hex</StyledHexLabel>
          <StyledHexInput
            ref={inputRef}
            id="hex-input"
            value={state.hex}
            onChange={(e: any) => {
              console.log(e.target.value);
              dispatch({ type: 'HEX CHANGE', payload: { hex: e.target.value } });
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '48px', fontSize: '14px' }}>
          <StyledRgbLabel htmlFor="red-input">R</StyledRgbLabel>
          <StyledRgbInput
            id="red-input"
            ref={redRef}
            max="255"
            min="0"
            type="number"
            value={state.rgb.r}
            onChange={(e: any) => {
              dispatch({
                type: 'RGBA CHANGE',
                payload: { r: e.target.value }
              });
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '48px', fontSize: '14px' }}>
          <StyledRgbLabel htmlFor="green-input">G</StyledRgbLabel>
          <StyledRgbInput
            id="green-input"
            ref={greenRef}
            max="255"
            min="0"
            type="number"
            value={state.rgb.g}
            onChange={(e: any) => {
              dispatch({
                type: 'RGBA CHANGE',
                payload: { g: e.target.value }
              });
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '48px', fontSize: '14px' }}>
          <StyledRgbLabel htmlFor="blue-input">B</StyledRgbLabel>
          <StyledRgbInput
            id="blue-input"
            ref={blueRef}
            max="255"
            min="0"
            type="number"
            value={state.rgb.b}
            onChange={(e: any) => {
              dispatch({
                type: 'RGBA CHANGE',
                payload: { b: e.target.value }
              });
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '48px', fontSize: '14px' }}>
          <StyledRgbLabel htmlFor="alpha-input">A</StyledRgbLabel>
          <StyledRgbInput
            id="alpha-input"
            ref={alphaRef}
            step=".1"
            max="1"
            min="0"
            type="number"
            value={state.rgb.a}
            onChange={(e: any) => {
              dispatch({
                type: 'RGBA CHANGE',
                payload: { a: e.target.value }
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface IExampleProps extends HTMLAttributes<HTMLDivElement> {
  /** Apply compact styling */
  isCompact?: boolean;
}

/**
 * Accepts all `<div>` attributes and events
 */
export const Example = React.forwardRef<HTMLDivElement, IExampleProps>((props, ref) => (
  <>
    <StyledExample ref={ref} {...props} />
    <ColorPicker />
  </>
));

Example.displayName = 'Example';

Example.propTypes = {
  isCompact: PropTypes.bool
};

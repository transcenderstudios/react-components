/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledHuePicker,
  StyledHexInput,
  StyledRgbInput,
  StyledAlphaPicker,
  StyledHexLabel,
  StyledRgbLabel
} from '../styled';
import tinycolor from 'tinycolor2';
import { Saturation } from 'react-color/lib/components/common';

const initialState = {
  hex: '#000',
  hsl: { h: 0, s: 0, l: 0 },
  hsv: { h: 0, s: 0, v: 0 },
  rgb: { r: 0, g: 0, b: 0, a: 0 },
  rgbString: 'rgb(0, 0, 0)'
};

const getInitialState = (defaultColor: string) => ({
  hex: tinycolor(defaultColor).toHexString(),
  hsl: tinycolor(defaultColor).toHsl(),
  hsv: tinycolor(defaultColor).toHsv(),
  rgb: tinycolor(defaultColor).toRgb(),
  rgbString: tinycolor(defaultColor).toRgbString()
});

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
      const prevAlpha = state.rgb.a;
      let nextColor = tinycolor(payload.hex).toRgb();

      nextColor.a = prevAlpha;

      return {
        hex: tinycolor(nextColor).toHexString(),
        hsl: tinycolor(nextColor).toHsl(),
        hsv: tinycolor(nextColor).toHsv(),
        rgb: tinycolor(nextColor).toRgb(),
        rgbString: tinycolor(nextColor).toRgbString()
      };
    case 'ALPHA SLIDER CHANGE':
      return {
        hex: tinycolor(payload.rgb).toHex8String(),
        hsl: tinycolor(payload.rgb).toHsl(),
        hsv: tinycolor(payload.rgb).toHsv(),
        rgb: tinycolor(payload.rgb).toRgb(),
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
    case 'RGB CHANGE': {
      const { rgb } = state;
      const { r, g, b, a } = payload;
      const nextRgb = {
        r: r || rgb.r,
        g: g || rgb.g,
        b: b || rgb.b,
        a: a || rgb.a
      };
      return {
        hex: nextRgb.a > 0 ? tinycolor(nextRgb).toHex8String() : tinycolor(nextRgb).toHexString(),
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

const CustomPointer = () => (
  <div
    style={{
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      transform: 'translate(-9px, -1px)',
      backgroundColor: 'rgb(248, 248, 248)',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)'
    }}
  />
);

interface IColorPickerProps {
  onChange?: any;
  defaultColor?: string;
  color?: any;
}

/**
 * Accepts all `<div>` attributes and events
 */
export const ColorPicker = React.forwardRef<HTMLDivElement, IColorPickerProps>((props, ref) => {
  const preloadedState = props.defaultColor ? getInitialState(props.defaultColor) : initialState;
  const [uncontrolledState, dispatch] = React.useReducer(reducer, preloadedState);

  const isControlled = props.color != null;

  const controlledState = {
    hex: tinycolor(props.color).toHexString(),
    hsl: tinycolor(props.color).toHsl(),
    hsv: tinycolor(props.color).toHsv(),
    rgb: tinycolor(props.color).toRgb(),
    rgbString: tinycolor(props.color).toRgbString()
  };

  console.log(tinycolor('rgb(255,0,255,0.5)').toRgb());

  const state = isControlled ? controlledState : uncontrolledState;

  const { onChange, ...other } = props;

  const onHuePickerChange = (colorPickerState: any) => {
    if (isControlled) {
      if (props.color.length === 8 && props.color.includes('#')) {
        const a = tinycolor(props.color).getAlpha();
        const rgba = { ...colorPickerState.rgb, a };

        onChange({
          hex: tinycolor(rgba).toHexString(),
          rgb: tinycolor(rgba).toRgb(),
          rgbString: tinycolor(rgba).toRgbString()
        });
      } else {
        const prevAlpha = state.rgb.a;
        const rgba = { ...colorPickerState.rgb, a: prevAlpha };

        onChange &&
          onChange({
            hex: tinycolor(rgba).toHexString(),
            rgb: tinycolor(rgba).toRgb(),
            rgbString: tinycolor(rgba).toRgbString()
          });
      }
    } else {
      dispatch({ type: 'HUE SLIDER CHANGE', payload: colorPickerState });
      onChange &&
        onChange({
          hex: colorPickerState.hex,
          rgb: colorPickerState.rgb,
          rgbString: colorPickerState.rgbString
        });
    }
  };

  const onAlphaPickerChange = (colorPickerState: any, event: any) => {
    if (isControlled) {
      const nextRgb = { ...tinycolor(props.color).toRgb(), a: colorPickerState.rgb.a };

      onChange &&
        onChange({
          hex: tinycolor(nextRgb).toHex8String(),
          rgb: nextRgb,
          rgbString: tinycolor(nextRgb).toRgbString()
        });
    }

    if (isControlled === false) {
      dispatch({ type: 'ALPHA SLIDER CHANGE', payload: colorPickerState });
      onChange &&
        onChange({
          hex: state.hex,
          rgb: state.rgb,
          rgbString: state.rgbString
        });
    }
  };

  const onSaturationChange = (hsv: any, event: any) => {
    if (isControlled) {
      const prevAlpha = state.rgb.a;
      const rgba = { ...tinycolor(hsv).toRgb(), a: prevAlpha };
      const controlledState = {
        hex: tinycolor(rgba).toHexString(),
        rgb: tinycolor(rgba).toRgb(),
        rgbString: tinycolor(rgba).toRgbString()
      };
      props.onChange && props.onChange(controlledState);
    } else {
      dispatch({ type: 'SATURATION BLOCK CHANGE', payload: hsv });
      props.onChange && props.onChange(state);
    }
  };

  const onHexInputChange = (e: any) => {
    const value = e.target.value;
    if (isControlled) {
      onChange && onChange({ hex: value });
    } else {
      onChange &&
        onChange({
          hex: tinycolor(value).toHexString(),
          rgb: tinycolor(value).toRgb(),
          rgbString: tinycolor(value).toRgbString()
        });

      dispatch({ type: 'HEX CHANGE', payload: { hex: value } });
    }
  };

  const onRgbInputChange = (e: any) => {
    const rgbColor = e.target.dataset.rgbColor;

    if (isControlled) {
      const nextRgb = { ...props.color, [rgbColor]: e.target.value };
      onChange && onChange({ rgb: nextRgb });
    } else {
      dispatch({
        type: 'RGB CHANGE',
        payload: { [rgbColor]: e.target.value }
      });
      console.log({
        hex: state.hex,
        rgb: state.rgb,
        rgbString: state.rgbString
      });
      onChange &&
        onChange({
          hex: state.hex,
          rgb: state.rgb,
          rgbString: state.rgbString
        });
    }
  };

  let controlledHexInput = props.color;

  if (typeof controlledHexInput === 'string' && controlledHexInput.includes('#') === false) {
    controlledHexInput = tinycolor(props.color).toHexString();
  }

  return (
    <div ref={ref} className="App" style={{ width: '292px' }} {...other}>
      <div
        style={{
          width: '100%',
          paddingBottom: '75%',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '4px'
        }}
      >
        <Saturation
          style={{ width: '100%' }}
          onChange={onSaturationChange}
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
            backgroundColor: isControlled
              ? tinycolor(props.color).toRgbString()
              : tinycolor(state.rgb).toRgbString(),
            boxShadow: 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.19)'
          }}
        ></div>

        <div>
          <StyledHuePicker
            color={isControlled ? props.color : state.hex}
            onChange={onHuePickerChange}
          />

          <StyledAlphaPicker
            color={isControlled ? tinycolor(props.color).toHsl() : state.hsl}
            onChange={onAlphaPickerChange}
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
            id="hex-input"
            value={isControlled ? controlledHexInput : state.hex}
            defaultValue={isControlled ? tinycolor(props.color).toHexString() : state.hex}
            onChange={onHexInputChange}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '48px', fontSize: '14px' }}>
          <StyledRgbLabel htmlFor="red-input">R</StyledRgbLabel>
          <StyledRgbInput
            id="red-input"
            data-rgb-color="r"
            min="0"
            max="255"
            type="number"
            value={isControlled ? tinycolor(props.color).toRgb().r : state.rgb.r}
            onChange={onRgbInputChange}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '48px', fontSize: '14px' }}>
          <StyledRgbLabel htmlFor="green-input">G</StyledRgbLabel>
          <StyledRgbInput
            id="green-input"
            data-rgb-color="g"
            max="255"
            min="0"
            type="number"
            value={isControlled ? tinycolor(props.color).toRgb().g : state.rgb.g}
            onChange={onRgbInputChange}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '48px', fontSize: '14px' }}>
          <StyledRgbLabel htmlFor="blue-input">B</StyledRgbLabel>
          <StyledRgbInput
            id="blue-input"
            data-rgb-color="b"
            max="255"
            min="0"
            type="number"
            value={isControlled ? tinycolor(props.color).toRgb().b : state.rgb.b}
            onChange={onRgbInputChange}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '48px', fontSize: '14px' }}>
          <StyledRgbLabel htmlFor="alpha-input">A</StyledRgbLabel>
          <StyledRgbInput
            id="alpha-input"
            data-rgb-color="a"
            step=".1"
            max="1"
            min="0"
            type="number"
            value={isControlled ? tinycolor(props.color).getAlpha() : state.rgb.a}
            onChange={onRgbInputChange}
          />
        </div>
      </div>
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';

ColorPicker.propTypes = {
  onChange: PropTypes.func
};

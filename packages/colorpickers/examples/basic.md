```jsx
const { Well } = require('@zendeskgarden/react-notifications/src');
const { Toggle, Field, Input, Label } = require('@zendeskgarden/react-forms/src');

const BasicExample = () => {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const dialogRef = React.useRef();
  const colorPickerRef = React.useRef();
  React.useEffect(() => {
    if (showColorPicker) {
      dialogRef.current.focus();
    }
  }, [showColorPicker]);

  // 🤮
  React.useEffect(() => {
    const listener = e => {
      setTimeout(() => {
        if (e.target.contains(document.activeElement) === false) {
          setShowColorPicker(false);
        }
      });
    };

    if (showColorPicker) {
      const focusableDescendants = Array.from(dialogRef.current.querySelectorAll('*')).filter(
        e => e.tabIndex > -1
      );

      dialogRef.current.addEventListener('blur', listener);
      focusableDescendants.forEach(element => {
        element.addEventListener('blur', e => {
          setTimeout(() => {
            if (dialogRef.current.contains(document.activeElement) === false) {
              setShowColorPicker(false);
            }
          }, 0);
        });
      });
    }

    return () => {
      dialogRef.current && dialogRef.current.removeEventListener('blur', listener);
    };
  }, [showColorPicker]);

  const [controlledColor, setControlledColor] = React.useState({
    r: 180,
    g: 218,
    b: 85,
    a: 0.5
  });

  const orange = {
    r: 255,
    g: 165,
    b: 0
  };

  return (
    <>
      <button onClick={() => setShowColorPicker(!showColorPicker)}>
        Show Uncontrolled Color Picker
      </button>
      {showColorPicker ? (
        <div tabIndex={-1} style={{ width: '292px', position: 'absolute' }} ref={dialogRef}>
          <ColorPicker ref={colorPickerRef} defaultColor="#b4da55" onChange={console.log} />
        </div>
      ) : null}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <br />
      <span>Controlled Color Picker:</span>
      <br />
      <br />
      <button onClick={() => setControlledColor(orange)}>Set to Orange</button>
      <ColorPicker
        ref={colorPickerRef}
        color={controlledColor}
        onChange={color => {
          setControlledColor(color.rgb);
          console.log(color);
        }}
      />
      <br />
      <br />
      <hr />
      <br />
      <span>Uncontrolled Color Picker:</span>
      <br />
      <br />
      <ColorPicker ref={colorPickerRef} onChange={console.log} defaultColor="#b4da55" />
    </>
  );
};

<BasicExample />;
```

<!-- <button onClick={() => setShowColorPicker(!showColorPicker)}>Show Color Picker</button>
      {showColorPicker ? (
        <div tabIndex={-1} style={{ width: '292px', position: 'absolute' }} ref={dialogRef}>
          <ColorPicker ref={colorPickerRef} defaultColor="#b4da55" onChange={console.log} />
        </div>
      ) : null} -->

<!-- <ColorPicker
        ref={colorPickerRef}
        defaultColor="#b4da55"
        onChange={c => {
          console.log(c, '<-- state from uncontrolled');
        }}
      /> -->

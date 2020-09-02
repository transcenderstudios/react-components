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

  return (
    <>
      <button onClick={() => setShowColorPicker(!showColorPicker)}>Show Color Picker</button>
      {showColorPicker ? (
        <div tabIndex={-1} style={{ width: '292px', position: 'absolute' }} ref={dialogRef}>
          <ColorPicker ref={colorPickerRef} />
        </div>
      ) : null}
    </>
  );
};

<BasicExample />;
```

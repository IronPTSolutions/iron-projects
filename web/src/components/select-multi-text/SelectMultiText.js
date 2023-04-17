import React, { KeyboardEventHandler, useState, useEffect } from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({ label, value: label });

// Multi-select text input: https://react-select.com/creatable
function SelectMultiText({ value: propsValue, inputRef, className, onChange }) {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(propsValue.map(option => createOption(option)) || []);

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue('');
        event.preventDefault();
    }
  };

  useEffect(() => {
    async function fetchChange() {
      return await onChange(value);
    }
    fetchChange();
  }, [value])

  return (
    <CreatableSelect
      inputRef={inputRef}
      className={className}
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={onChange}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={value}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          border: 'none',
        }),
      }}
    />
  );
}

SelectMultiText.defaultProps = {
  onChange: () => {},
  className: '',
  value: []
}

export default SelectMultiText
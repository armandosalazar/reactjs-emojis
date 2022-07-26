import { useState } from 'react';

export default function EmojiSearch({ onSearch }) {
  const [value, setValue] = useState('');

  function handleChange(evt) {
    setValue(evt.target.value);
    onSearch(evt);
  }

  return <input onChange={handleChange} value={value} />;
}

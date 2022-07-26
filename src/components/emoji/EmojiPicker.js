import { forwardRef, useEffect, useRef, useState } from 'react';
import { data as emojiList } from './data';
import EmojiButton from './EmojiButton';
import EmojiSearch from './EmojiSearch';

function EmojiPicker(props, ref) {
  const [isOpen, setIsOpen] = useState(true);
  const [emojis, setEmojis] = useState(emojiList);

  const refEmojiPicker = useRef(null);

  useEffect(() => {
    window.addEventListener('click', (evt) => {
      if (!refEmojiPicker.current.contains(evt.target)) {
        setIsOpen(false);
        setEmojis(emojiList);
      }
    });
  }, []);

  function handleClickOpen() {
    setIsOpen(!isOpen);
  }

  function handleSearch(evt) {
    const search = evt.target.value.toLowerCase();
    if (!!search) {
      const emojis = emojiList.filter(
        (emoji) =>
          emoji.name.toLowerCase().includes(search) ||
          emoji.keywords.includes(search)
      );

      setEmojis(emojis);
    } else {
      setEmojis(emojiList);
    }
  }

  function handleOnClick(emoji) {
    const cursorPosition = ref.current.selectionStart;
    const text = ref.current.value;
    const prev = text.slice(0, cursorPosition);
    const next = text.slice(cursorPosition);
    ref.current.value = `${prev}${emoji.symbol}${next}`;
    ref.current.selectionStart = cursorPosition + emoji.symbol.length;
    ref.current.selectionEnd = cursorPosition + emoji.symbol.length;
    ref.current.focus();
  }

  return (
    <div ref={refEmojiPicker}>
      <button onClick={handleClickOpen}>😊</button>
      {isOpen ? (
        <div>
          <EmojiSearch onSearch={handleSearch} />
          <div>
            {emojis.map((emoji, index) => (
              <EmojiButton key={index} emoji={emoji} onClick={handleOnClick} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default forwardRef(EmojiPicker);

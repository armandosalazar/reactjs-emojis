import EmojiPicker from './EmojiPicker';
import { useRef } from 'react';
import styles from './EmojiPicker.module.scss';

export default function EmojiPickerInput() {
  const ref = useRef(null);

  return (
    // UseRef permite hacer referencia a un elemento del DOM.
    <div className={styles.container}>
      <input ref={ref} />
      <EmojiPicker ref={ref} />
    </div>
  );
}

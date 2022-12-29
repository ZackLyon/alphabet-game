import clsx from 'clsx';
import { TileProps } from '../views/LetterGame';

const styles = {
  li: 'flex items-center justify-center',
  button: 'flex border-4 border-solid rounded items-center justify-center text-[13vmin] aspect-square h-[15vmax] xl:h-[25vmin]',
  unclicked: 'text-emerald-400 border-emerald-400 bg-emerald-100',
  incorrect: 'text-slate-300/90 border-slate-300/90 bg-slate-100',
  correct: 'text-emerald-100 border-emerald-100 bg-emerald-400'
}

interface ClickableTileProps extends TileProps {
  onClick: () => void
}

const LetterTile: React.FC<ClickableTileProps> = ({ letter, isClicked, isCorrect, onClick}): JSX.Element => {

  const clickedStyle = () => isCorrect ? 'correct' : 'incorrect'
  const currentStyle = () => isClicked ? clickedStyle() : 'unclicked'

  return <li key={letter} className={styles.li}>
    <button
     onClick={onClick}
     className={clsx(styles.button, styles[currentStyle()], 'font-display')}
     disabled={isClicked}>
      {letter}
      
    </button>
  </li>
}

export default LetterTile
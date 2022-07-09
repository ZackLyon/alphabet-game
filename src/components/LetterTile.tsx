import clsx from 'clsx';
import { TileProps } from '../views/LetterGame';

const styles = {
  li: 'flex items-center justify-center',
  button: 'flex border-4 border-solid rounded items-center justify-center 2xl:w-1/3 lg:w-1/2 md:w-2/3 w-4/5 text-[30px] xs:text-[40px] md:text-[80px] xl:text-[100px] 2xl:text-[140px] aspect-square',
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
  console.log('current style ', currentStyle())


  return <li key={letter} className={styles.li}>
    <button
     onClick={onClick}
     className={clsx(styles.button, styles[currentStyle()])}>
      {letter}
    </button>
  </li>;
}

export default LetterTile
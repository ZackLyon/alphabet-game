import clsx from 'clsx'
import LetterTile from './LetterTile'

export const styles = {
  wrapper: 'grid grid-cols-3 gap-8 list-none pb-10 w-3/4 h-3/4',
}

interface TileListProps {
  tiles: TileProps[]
  handleClick: (tile: TileProps) => void
}

interface TileProps {
  letter: string
  isClicked?: boolean
  isCorrect?: boolean
}

 const LetterList: React.FC<TileListProps> =({tiles, handleClick}) => {

  return (
    <ul className= {clsx(styles.wrapper, '')}>
      {tiles.map(tile => <LetterTile {...tile} onClick={() => handleClick(tile)}/>
      )}
    </ul>
  )
}

export default LetterList
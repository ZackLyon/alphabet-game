import clsx from 'clsx'
import LetterTile from './LetterTile'

export const styles = {
  wrapper: 'grid grid-cols-3 gap-4 list-none 2xl:w-1/2 h-full p-4',
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
    <ul className= {clsx(styles.wrapper)}>
      {tiles.map(tile => <LetterTile key={tile.letter} {...tile} onClick={() => handleClick(tile)}/>
      )}
    </ul>
  )
}

export default LetterList
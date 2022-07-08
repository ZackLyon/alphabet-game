import clsx from 'clsx';
import { useState } from 'react';
import LetterList from '../components/LetterList';
import randomLetters from '../utils/randomLetters';


export interface TileProps {
  letter: string
  isClicked?: boolean
  isCorrect?: boolean
}

export default function LetterGame() {
  const createNewTiles = (newNumOfLetters?: number) => {
    const currentNumOfLetters = newNumOfLetters ? newNumOfLetters : numOfLetters
    const newLetters = randomLetters(currentNumOfLetters)
    const newCorrectLetter = newLetters[Math.floor(Math.random() * currentNumOfLetters)]
    const newTiles = newLetters.map(letter => ({letter, isClicked: false, isCorrect: letter === newCorrectLetter}))
    return newTiles
  }

  const [numOfLetters, setNumOfLetters] = useState(3)
  const initialLetters = createNewTiles(numOfLetters)
  const [tiles, setTiles] = useState<TileProps[]>(initialLetters)

  const styles = {
    button: 'bg-emerald-400 text-white p-4 mx-2 border-2 border-white rounded h-20 text-xl items-center justify-center flex font-bold'
  }


  const handleGameOver = () => {
    const inactiveTiles = tiles.map(tile => ({...tile, isClicked: true}))
    setTiles(inactiveTiles)
  }

  const handleReset = (newNumOfLetter?: number) => {
    const newTiles = createNewTiles(newNumOfLetter ? newNumOfLetter : numOfLetters)
    console.log('resetting ', newTiles)
    setTiles(newTiles)
  }

  const handleDifficulty = (isIncrement: boolean) => {
    const updatedNumOfLetters = isIncrement ? numOfLetters + 3 : numOfLetters - 3
    setNumOfLetters(updatedNumOfLetters)
    handleReset(updatedNumOfLetters)
  }

  const handleClick = (clickedTile: TileProps) => {
   
    if(clickedTile?.isCorrect) {
      handleGameOver()
      return
    }
    const updatedTiles = tiles.map(tile => tile.letter === clickedTile.letter ? {...clickedTile, isClicked: true} : tile)

    setTiles(updatedTiles)
  }

  return (
    <article className='w-full h-full'>
      <header className='flex justify-center items-center my-5'>
        <button onClick={() => handleDifficulty(true)} disabled={numOfLetters === 9} className={clsx(styles.button, 'aspect-square text-4xl')}>
          +
        </button>

        <span className={clsx(styles.button, 'aspect-square text-4xl')}>{numOfLetters}</span>
        <button onClick={() => handleDifficulty(false)} disabled={numOfLetters === 3} className={clsx(styles.button, 'aspect-square text-4xl')}>
          -
        </button>
        <button onClick={() => handleReset()} className={clsx(styles.button, 'flex justify-center items-center')}> RESET </button>
      </header>
      <main className='w-full h-full flex justify-center bg-white/10 pt-8'>
        <LetterList tiles={tiles} handleClick={handleClick}/>
      </main>
    </article>
  )
}

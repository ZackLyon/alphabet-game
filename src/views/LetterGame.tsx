import clsx from 'clsx';
import { useState } from 'react';
import LetterList from '../components/LetterList';
import randomLetters from '../utils/randomLetters';


export interface TileProps {
  letter: string
  isClicked?: boolean
  isCorrect?: boolean
}

const plusSign = String.fromCharCode(65291)
const minusSign = String.fromCharCode(65293)

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
    button: 'bg-emerald-400 text-white mx-2 border-2 border-white rounded xs:h-20 h-10 text-xl items-center justify-center flex font-bold',
    squareButton: 'aspect-square xs:w-20 w-10 text-xl xs:text-3xl lg:text-5xl',
    rectangleButton: 'p-4'
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
    <article className='w-full h-full flex flex-col'>
      <header className='flex justify-center items-center py-5 bg-black'>
        <button onClick={() => handleDifficulty(true)} disabled={numOfLetters === 9} className={clsx(styles.button, styles.squareButton)}>
          {plusSign}
        </button>

        <span className={clsx(styles.button, styles.squareButton)}>{numOfLetters}</span>
        <button onClick={() => handleDifficulty(false)} disabled={numOfLetters === 3} className={clsx(styles.button, styles.squareButton)}>
          {minusSign}
        </button>
        <button onClick={() => handleReset()} className={clsx(styles.button, styles.rectangleButton)}> RESET </button>
      </header>
      <section className='flex flex-grow justify-center items-center bg-red-100/30'>
        <LetterList tiles={tiles} handleClick={handleClick}/>
      </section>
    </article>
  )
}

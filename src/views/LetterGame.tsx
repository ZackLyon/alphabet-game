import clsx from 'clsx';
import { useState } from 'react';
import LetterList from '../components/LetterList';
import randomLetters from '../utils/randomLetters';
import {Howl} from 'howler';

export interface TileProps {
  letter: string
  isClicked?: boolean
  isCorrect?: boolean
}

export type capitalizationOptions = 'a' | 'A' | 'aA'

const styles = {
  button: 'bg-emerald-400 text-white mx-2 border-2 border-white rounded xs:h-20 h-10 text-xl items-center justify-center flex font-bold',
  squareButton: 'aspect-square xs:w-20 w-10 text-xl xs:text-3xl lg:text-5xl',
  rectangleButton: 'p-4'
}

const plusSign = String.fromCharCode(65291)
const minusSign = String.fromCharCode(65293)

export default function LetterGame() {


  const [tileCount, setTileCount] = useState(3)
  const [tiles, setTiles] = useState<TileProps[]>([])
  const [isFirstPlay, setIsFirstPlay] = useState(true)
  const [capitalization, setCapitalization] = useState<capitalizationOptions>('a')

  const onCapitalizationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch(capitalization) {
      case 'a':
        setCapitalization('A')
        break
      case 'A':
        setCapitalization('aA')
        break
      case 'aA':
        setCapitalization('a')
        break
    }
  }

  const createNewTiles = (newLetterCount?: number) => {
    const currentNumOfLetters = newLetterCount ? newLetterCount : tileCount
    const newLetters = randomLetters(currentNumOfLetters, capitalization)
    const newCorrectLetter = newLetters[Math.floor(Math.random() * currentNumOfLetters)]
    const newTiles = newLetters.map(letter => ({letter, isClicked: false, isCorrect: letter === newCorrectLetter}))
    return newTiles
  }

  const findCorrectLetter = (tiles: TileProps[]) => {
    return tiles.find(a => a.isCorrect === true)?.letter
  }

  const handleGameOver = () => {
    const inactiveTiles = tiles.map(tile => ({...tile, isClicked: true}))
    setTiles(inactiveTiles)
  }

  const handlePlay = (newLetterCount?: number) => {
    if(isFirstPlay) setIsFirstPlay(false)
    const newTiles = createNewTiles(newLetterCount ? newLetterCount : tileCount)
    setTiles(newTiles)
    const correctLetter = findCorrectLetter(newTiles)
    const newTrack = createAudio(correctLetter)
    newTrack?.play()
  }

  const handleDifficulty = (isIncrement: boolean) => {
    const updatedNumOfLetters = isIncrement ? tileCount + 3 : tileCount - 3
    setTileCount(updatedNumOfLetters)
  }

  const handleClick = (clickedTile: TileProps) => {
    if(clickedTile?.isCorrect) {
      const correctAnswerTrack = Math.round(Math.random()) ? clappingTrack : correctTrack 
      correctAnswerTrack?.play()
      handleGameOver()
      return
    }
    incorrectTrack?.play()
    const updatedTiles = tiles.map(tile => tile.letter === clickedTile.letter ? {...clickedTile, isClicked: true} : tile)

    setTiles(updatedTiles)
  }

  const createAudio = (filename: string | undefined) => {
    if(!filename) return
    const trackName = filename.length > 1 ? `${filename}.mp3` : `${filename.toUpperCase()}.mp3`
    let path = require("../assets/VO/" + trackName)
    const track = new Howl({src: [path]})
    return track
  }

  const clappingTrack = createAudio('Clapping')
  const correctTrack = createAudio('Correct')
  const incorrectTrack = createAudio('Incorrect')

  return (
    <article className='w-full h-full flex flex-col'>
      <header className='flex justify-center items-center py-5 bg-black'>
        <button onClick={() => handlePlay()} className={clsx(styles.button, styles.rectangleButton)}>{isFirstPlay ? 'PLAY' : 'REPLAY'}</button>
        <button onClick={() => handleDifficulty(false)} disabled={tileCount === 3} className={clsx(styles.button, styles.squareButton)}>
          {minusSign}
        </button>
        <span className={clsx(styles.button, styles.squareButton)}>{tileCount}</span>
        <button onClick={() => handleDifficulty(true)} disabled={tileCount === 9} className={clsx(styles.button, styles.squareButton)}>
          {plusSign}
        </button>
        <button className={clsx(styles.button, styles.squareButton)} onClick={onCapitalizationChange}>{capitalization}</button>
      </header>
      <section className='flex flex-grow justify-center items-center bg-red-100/30'>
        <LetterList tiles={tiles} handleClick={handleClick}/>
      </section>
    </article>
  )
}

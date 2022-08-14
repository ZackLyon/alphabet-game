
const uppercaseAlphabet = Array(26).fill(65).map((n, i) => String.fromCharCode(n + i))

export default function randomLetters(numOfLetters: number = 0, arr:string[] = []): string[] {
  if(typeof numOfLetters !== 'number' || numOfLetters > 26 || numOfLetters < 0) numOfLetters = 3

  if(numOfLetters === arr.length) return arr

  const newLetter = chooseLetter(arr.length === 0 ? uppercaseAlphabet : uppercaseAlphabet.filter(a => !arr.includes(a) && !arr.includes(a.toLowerCase())))

  return randomLetters(numOfLetters, [...arr, newLetter])
}

const chooseLetter = (possibleLetters: string[]) => {
  const randomLetter = possibleLetters[Math.floor(Math.random() * possibleLetters.length)]
  const randomlyLowercase = Math.round(Math.random())


  return randomlyLowercase ? randomLetter.toLowerCase() : randomLetter
}
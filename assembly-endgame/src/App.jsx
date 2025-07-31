import { languages } from './languages'
import { useState } from 'react'
import clsx from 'clsx';
import './index.css'

function App() {
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])

   
  const wrongGuessCount = 
  guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const isGameLost = wrongGuessCount >= languages.length -1
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const isGameOver = isGameLost || isGameWon

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const keyboardElements = alphabet.split("").map(letter => {

        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = currentWord.includes(letter)

        const className = clsx("keyboard-btn",{
          correct: isGuessed && isCorrect,
          incorrect: isGuessed && !isCorrect
        })

    return(
      <button 
      key={letter}
      disabled={isGameOver}
      onClick={() => addGussedLetters(letter)} 
      className={className}
      >
        {letter.toUpperCase()}
      </button>
    )
  })
  const guessedWordElements = currentWord.split("").map((letter, index) => {
    return (
       <span key={index}>
        {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
        </span>
    )
  })
  const languageElements  = languages.map((lang, index) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    const className = clsx("lang", {
      "lost": index < wrongGuessCount
    })
    return (
      <div style={styles} key={lang.name} className={className}>{lang.name}</div>
    )
  })

    function addGussedLetters(letter){
      setGuessedLetters(prevGuessed => {
        return prevGuessed.includes(letter) ? prevGuessed : [...prevGuessed, letter]
      })
    }

    const gameStatusClass = clsx("inial-status", {
      "game-status": isGameWon,
      "lost-status": isGameLost,
      
    })

    function restartGame() {
      setGuessedLetters([])
      // setCurrentWord()
    }

  return (
    <>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word in under 8 attempts to keep 
          the programming world safe from Assembly!
        </p>
      </header>
      <main>
         <section className={gameStatusClass}>
          {isGameWon && <h2>You win! <span>well done!🎉</span></h2>}
          {isGameLost && <h2>You lose! <span>Better start learning Assembly 😢</span></h2>}
        </section>
        <section className='lang-section'>
          {languageElements}
        </section>
        <section className='word'>
          {guessedWordElements}
        </section>
        <section className='keyboard'>
            {keyboardElements}
        </section>
        {isGameOver && <section className='start-game'>
          <button onClick={restartGame} className='restart-btn'>New Game</button>
        </section>}
      </main>
    </>
  )
}

export default App

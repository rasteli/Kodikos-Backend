export interface IPasswordProps {
  uppercase: boolean
  lowercase: boolean
  symbols: boolean
  numeric: boolean
}

let characters = ""
let passwordLength = 0

const numbers = "0123456789"
const specialSymbols = "!@#$%^&*()<>,.?/[]{}-=_+|/"
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz"

function setProps(condition: boolean, prop: string) {
  if (condition) {
    return (characters += prop)
  }
}

function getRandomInteger(min: number, max: number) {
  const random = Math.floor(Math.random() * (max - min + 1)) + min
  return random
}

function setPasswordCharacters() {
  let password = ""

  if (characters.length) {
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = getRandomInteger(0, characters.length - 1)

      password += characters[randomIndex]
    }

    characters = ""
    passwordLength = 0

    return password
  }
}

function setPasswordLength(length: number) {
  passwordLength = length
}

export function generatePassword(props: IPasswordProps, pwdLength: number) {
  const { uppercase, lowercase, symbols, numeric } = props

  setProps(numeric, numbers)
  setProps(symbols, specialSymbols)
  setProps(uppercase, uppercaseLetters)
  setProps(lowercase, lowercaseLetters)

  setPasswordLength(pwdLength)

  const password = setPasswordCharacters()
  return password
}

const RED = 31
const YELLOW = 33
const RESET = 0

function asciiEscape(value: number) {
  return `\x1b[${value}m`
}

function wrapTextInColor(color: number, text: string) {
  return `${asciiEscape(color)}${text}${asciiEscape(RESET)}`
}

function coloredText(color: number, text: string) {
  return text
    .split('\n')
    .map((line) => wrapTextInColor(color, line))
    .join('\n')
}

export function red(text: string) {
  return coloredText(RED, text)
}

export function yellow(text: string) {
  return coloredText(YELLOW, text)
}

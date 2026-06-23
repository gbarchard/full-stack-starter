import { red, yellow } from './colors'

function leadingZero(num: number) {
  if (num > 9) return num.toString()
  return `0${num}`
}

function formatDate(date: Date) {
  const month = leadingZero(date.getMonth() + 1)

  const day = leadingZero(date.getDate())
  const year = date.getFullYear()

  const hour = leadingZero(date.getHours())
  const minute = leadingZero(date.getMinutes())
  const second = leadingZero(date.getSeconds())

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

function makeLog(level: keyof typeof logger, text: unknown) {
  const now = new Date()
  const formattedDate = formatDate(now)
  return `${formattedDate} [${level.toUpperCase()}] ${text}`
}

export const logger = {
  error: (...data: unknown[]) => {
    console.error(...data.map((d) => red(makeLog('error', d))))
  },
  warn: (...data: unknown[]) => {
    console.warn(...data.map((d) => yellow(makeLog('warn', d))))
  },
  info: (...data: unknown[]) => {
    console.log(...data.map((d) => makeLog('info', d)))
  },
}

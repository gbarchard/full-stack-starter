import { Toast, ToastToggle } from 'flowbite-react'
import { Check, WarningTriangle, X } from '../../icons'

interface ToastProps {
  text: string
}

export function SuccessToast(props: ToastProps) {
  return (
    <Toast>
      <div className="mr-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <Check className="h-5 w-5" />
      </div>
      {props.text}
      <ToastToggle />
    </Toast>
  )
}

export function ErrorToast(props: ToastProps) {
  return (
    <Toast>
      <div className="mr-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <X />
      </div>
      {props.text}
      <ToastToggle />
    </Toast>
  )
}

export function WarningToast(props: ToastProps) {
  return (
    <Toast>
      <div className="mr-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
        <WarningTriangle />
      </div>
      {props.text}
      <ToastToggle />
    </Toast>
  )
}

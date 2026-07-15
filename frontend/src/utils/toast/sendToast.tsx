import toast from 'react-hot-toast'
import { ErrorToast, SuccessToast, WarningToast } from './TemplateToasts'

export function sendSuccessToast(text: string) {
  return toast.custom(<SuccessToast text={text} />)
}

export function sendErrorToast(text: string) {
  return toast.custom(<ErrorToast text={text} />)
}

export function sendWarningToast(text: string) {
  return toast.custom(<WarningToast text={text} />)
}

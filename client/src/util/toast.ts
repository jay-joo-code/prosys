import { toast } from 'react-toastify'

type IToastVariant = 'info' | 'success' | 'warning' | 'error'

interface IOptions {
  toastId: string
}

export const showToast = (variant: IToastVariant, msg: string, options?: IOptions) => {
  toast[variant](msg, options)
}

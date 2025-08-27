import toast from 'react-hot-toast'

export const GENERIC_ERROR_MESSAGE =
    'Something went wrong. Please try again later.'

export const notifyApiMessage = {
    success: (message: string) => {
        toast.success(message)
    },
    error: (message: string = GENERIC_ERROR_MESSAGE) => {
        toast.error(message)
    },
}

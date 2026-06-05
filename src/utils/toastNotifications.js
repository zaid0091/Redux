import { Bounce, toast, Zoom } from 'react-toastify'

export const showAddedToast = () => {
  toast.success('Added to collection!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Zoom,
  })
}

export const showRemovedToast = () => {
  toast.error('Removed from collection!', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    transition: Bounce,
  })
}

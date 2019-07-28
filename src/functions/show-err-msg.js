import { Dialog } from 'quasar'

const showErrorMessage = (errMsg) => {
  Dialog.create({
    title: 'Error',
    message: errMsg,
    position: 'standard'
  })
}

export {
  showErrorMessage
}
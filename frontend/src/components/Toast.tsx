interface ToastProp {
    message: string
    onDismiss: () => void
}

const Toast = ({message, onDismiss}: ToastProp) => {
    if(!message) return null
    return (
        <div className="toast" role="alert">
          <span className="toast-msg">{message}</span>
          <button
            className="toast-close"
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
          >×</button>
         </div>
    
  )
}

export default Toast

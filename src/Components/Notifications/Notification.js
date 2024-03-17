import "./NotificationStyles.css";

const Notification = ({ message, onClose, status = "success" }) => {
  return (
    <div className={`notification-container`}>
      <div className={`notification-content ${status}`}>
        <span className={`message`}>{message}</span>
        <button className={`closeButton`} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;

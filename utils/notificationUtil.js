import isBrowser from "./isBrowser";

const permissions = {
  default: "default",
  granted: "granted",
  denied: "denied"
}

const hasNotificationSupport = isBrowser && 'Notification' in window;

export function requestPermission() {
  if (hasNotificationSupport) {
    Notification.requestPermission();
  }
}

export function useNotifications() {
  if (hasNotificationSupport) {
    switch (Notification.permission) {
      case permissions.granted:
        return true;
      case permissions.denied:
        return false;
      case permissions.default:
      default:
        return null;
    }
  } else {
    return false;
  }
}
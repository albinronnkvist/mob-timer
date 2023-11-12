class BrowserNotificationHandler {
    static notificationSound;

    static setSelectedSound(soundFilePath) {
        if (typeof window !== "undefined") {
            BrowserNotificationHandler.notificationSound = new Audio(soundFilePath);
        }
    }

    static playSound() {
        if (BrowserNotificationHandler.notificationSound) {
            BrowserNotificationHandler.notificationSound.play().catch(error => {
                console.error('Error playing notification sound:', error);
            });
        }
    }

    static showNotification(title, body) {
        if (!("Notification" in window)) {
            console.log("This browser does not support system notifications.");
            return;
        }

        const displayNotification = () => {
            new Notification(title, {
                body: body
            });
            BrowserNotificationHandler.playSound();
        };

        if (Notification.permission === "granted") {
            displayNotification();
        }
        else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    displayNotification();
                }
            });
        }
    }
}
  
export default BrowserNotificationHandler;
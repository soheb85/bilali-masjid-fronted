export const registerPushSubscription = async () => {
    if (!("serviceWorker" in navigator)) {
      console.error("Service Workers are not supported in this browser.");
      return;
    }
  
    try {
      // 🟢 Register Service Worker
      const registration = await navigator.serviceWorker.register("/service-worker.js");
  
      console.log("Service Worker Registered:", registration);
  
      // 🟢 Get Existing Subscription
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log("Already Subscribed:", existingSubscription);
        return existingSubscription;
      }
  
      // 🟢 Subscribe for Push Notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.VAPID_PUBLIC_KEY
          ? Uint8Array.from(atob(process.env.VAPID_PUBLIC_KEY), c =>
              c.charCodeAt(0)
            )
          : undefined,
      });
  
      console.log("New Push Subscription:", subscription);
      return subscription;
    } catch (error) {
      console.error("Error registering push subscription:", error);
    }
  };
  
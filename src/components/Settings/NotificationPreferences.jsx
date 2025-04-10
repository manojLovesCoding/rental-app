function NotificationPreferences() {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input type="checkbox" id="email-notifications" className="mr-2" />
        <label htmlFor="email-notifications">Enable Email Notifications</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="sms-notifications" className="mr-2" />
        <label htmlFor="sms-notifications">Enable SMS Notifications</label>
      </div>
    </div>
  );
}

export default NotificationPreferences;

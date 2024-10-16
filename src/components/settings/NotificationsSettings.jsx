import React, { useState } from 'react';
import SwitcheableGroup from '../SwitcheableGroup';

const NotificationsSettings = ({ classFn }) => {
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(false);

  return (
    <div className="mt-10 divide-y divide-gray-200">
      <div className="space-y-1">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
      <p className="max-w-2xl text-sm text-gray-500">
        Manage your notification preferences.
      </p>
    </div>
    <div className="mt-6">
      <dl className="divide-y divide-gray-200">
        <SwitcheableGroup label="Email notifications" setter={setEmailNotificationsEnabled} getter={emailNotificationsEnabled} classFn={classFn} />
        <SwitcheableGroup label="Push notifications" setter={setPushNotificationsEnabled} getter={pushNotificationsEnabled} classFn={classFn} />
        <SwitcheableGroup label="SMS notifications" setter={setSmsNotificationsEnabled} getter={smsNotificationsEnabled} classFn={classFn} />
      </dl>
    </div>
  </div>
)}

export default NotificationsSettings;

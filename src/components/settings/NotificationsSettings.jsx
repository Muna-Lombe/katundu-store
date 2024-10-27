import React, { useState } from 'react';
import SwitcheableGroup from '../SwitcheableGroup';

const NotificationsSettings = ({updateNotificationsSettings, classFn }) => {
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
          <form id="notifications-update-form" name="notifications-update-form" onSubmit={(e) => updateNotificationsSettings(e)}>
            <span className="mt-4 w-full flex flex-shrink-0 justify-end">
              <button type="submit" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Update
              </button>
            </span>
            <SwitcheableGroup form={"notifications-update-form"} label="Email notifications" setter={setEmailNotificationsEnabled} getter={emailNotificationsEnabled} classFn={classFn} />
            <SwitcheableGroup form={"notifications-update-form"} label="Push notifications" setter={setPushNotificationsEnabled} getter={pushNotificationsEnabled} classFn={classFn} />
            <SwitcheableGroup form={"notifications-update-form"} label="SMS notifications" setter={setSmsNotificationsEnabled} getter={smsNotificationsEnabled} classFn={classFn} />
        </form>
      </dl>
    </div>
  </div>
)}

export default NotificationsSettings;

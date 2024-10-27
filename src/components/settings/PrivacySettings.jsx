import React, { useState } from 'react';
import SwitcheableGroup from '../SwitcheableGroup';

const PrivacySettings = ({updatePrivacySettings, data, classFn }) => {
  const [makeProfilePublic, setMakeProfilePublic] = useState(false);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [allowDataCollectionForPersonalizedAds, setAllowDataCollectionForPersonalizedAds] = useState(false);

  return (
    <div className="mt-10 divide-y divide-gray-200">
      <div className="space-y-1">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Privacy</h3>
      <p className="max-w-2xl text-sm text-gray-500">
        Manage your privacy settings.
      </p>
    </div>
    <div className="mt-6">
      <dl className="divide-y divide-gray-200">
        <form id="privacy-update-form" name="privacy-update-form" onSubmit={(e)=> updatePrivacySettings(e)}>
          <span className="mt-4 w-full flex flex-shrink-0 justify-end">
            <button type="submit" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              Update
            </button>
          </span>
          <SwitcheableGroup form={"privacy-update-form"} label="Make profile public" setter={setMakeProfilePublic} getter={makeProfilePublic} classFn={classFn} />
          <SwitcheableGroup form={"privacy-update-form"} label="Show online status" setter={setShowOnlineStatus} getter={showOnlineStatus} classFn={classFn} />
          <SwitcheableGroup form={"privacy-update-form"} label="Allow data collection for personalized ads" setter={setAllowDataCollectionForPersonalizedAds} getter={allowDataCollectionForPersonalizedAds} classFn={classFn} />
        </form>
      </dl>
    </div>
  </div>
)}

export default PrivacySettings;

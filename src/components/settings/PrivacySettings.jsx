import React, { useState } from 'react';
import SwitcheableGroup from '../SwitcheableGroup';

const PrivacySettings = ({ classFn }) => {
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
        <SwitcheableGroup label="Make profile public" setter={setMakeProfilePublic} getter={makeProfilePublic} classFn={classFn} />
        <SwitcheableGroup label="Show online status" setter={setShowOnlineStatus} getter={showOnlineStatus} classFn={classFn} />
        <SwitcheableGroup label="Allow data collection for personalized ads" setter={setAllowDataCollectionForPersonalizedAds} getter={allowDataCollectionForPersonalizedAds} classFn={classFn} />
      </dl>
    </div>
  </div>
)}

export default PrivacySettings;

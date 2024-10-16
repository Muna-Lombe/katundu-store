import React, { useState } from 'react';
import SwitcheableGroup from '../SwitcheableGroup';

const AccountSettings = ({classFn}) => {

  const [language, setLanguage] = useState("English");
  const [dateFormat, setDateFormat] = useState("DD-MM-YYYY");
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] = useState(true);

  return (
  <div className="mt-10 divide-y divide-gray-200">
    <div className="space-y-1">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Account</h3>
      <p className="max-w-2xl text-sm text-gray-500">
        Manage how information is displayed on your account.
      </p>
    </div>
    <div className="mt-6">
      <dl className="divide-y divide-gray-200">
        {/* Account fields */}

        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Language</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span className="flex-grow">English</span>
            <span className="ml-4 flex-shrink-0">
              <button
                type="button"
                className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Update
              </button>
            </span>
          </dd>
        </div>
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
          <dt className="text-sm font-medium text-gray-500">Date format</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span className="flex-grow">DD-MM-YYYY</span>
            <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
              <button
                type="button"
                className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Update
              </button>
              <span className="text-gray-300" aria-hidden="true">
                |
              </span>
              <button
                type="button"
                className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Remove
              </button>
            </span>
          </dd>
        </div>

        <SwitcheableGroup label="Automatic timezone" setter={setAutomaticTimezoneEnabled} getter={automaticTimezoneEnabled} classFn={classFn} />
        <SwitcheableGroup label="Auto-update applicant data" setter={setAutoUpdateApplicantDataEnabled} getter={autoUpdateApplicantDataEnabled} classFn={classFn} />


      </dl>
    </div>
  </div>
)}

export default AccountSettings;

import React, { useState } from 'react';
import SwitcheableGroup from '../SwitcheableGroup';
import ToggleVisibleIco from '../icons/ToggleVisibleIco.jsx';
import useValidatePasswordComplexity from '../../hooks/useValidatePasswordComplexity';
import PasswordComplexity from '../PasswordComplexity';

const SecuritySettings = ({updateSecuritySettings, data, classFn }) => {
  const [twoFactorAuthenticationEnabled, setTwoFactorAuthenticationEnabled] = useState(false);
  const { pwComplexity, validatePasswordComplexity } = useValidatePasswordComplexity()
  return (
  <div className="mt-10 divide-y divide-gray-200">
    <div className="space-y-1">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Security</h3>
      <p className="max-w-2xl text-sm text-gray-500">
        Manage your security settings.
      </p>
    </div>
    <div className="mt-6">
      <dl className="divide-y divide-gray-200">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Password</dt>
          <dd className="mt-1 flex flex-col text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            
            <form id="password-update-form" name="password-update-form" className=" w-full flex flex-row justify-between items-center" action="#" onSubmit={(e) => updateSecuritySettings(e)}>

              <div className="viewable-password-field w-full flex flex-col gap-1 items-center">
                <PasswordComplexity pwComplexity={pwComplexity}/>
                <div className="password-field h-[36px] relative flex flex-row flex-nowrap w-full max-w-[60%] rounded-md border-0 p-0.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6">
                  <input form="password-update-form"
                    id="update-password"
                    name="update-password"
                    type="text"
                    // autoComplete="current-password"
                    required
                    className="w-full px-2 "
                    placeholder="••••••••"
                    onChange={(e) => validatePasswordComplexity(e.target.value)}
                  />
                  <ToggleVisibleIco targetComponentId={"update-password"} />

                </div>

              </div>

              <span className="ml-4 flex-shrink-0">
                <button type="submit" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Update
                </button>
              </span>
            </form>
          </dd>
        </div>
        <SwitcheableGroup label="Two-factor authentication" setter={setTwoFactorAuthenticationEnabled} getter={twoFactorAuthenticationEnabled} classFn={classFn} />
      </dl>
    </div>
    </div>
  )
}

export default SecuritySettings;

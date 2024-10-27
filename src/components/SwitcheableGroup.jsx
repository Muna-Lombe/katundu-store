import { Label, Switch, SwitchGroup } from '@headlessui/react'
import React from 'react'

const SwitcheableGroup = ({ form,label, setter, getter, classFn }) => {
  return (
    <SwitchGroup as="div" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
      <Label as="dt" className="text-sm font-medium text-gray-500" passive>
        {label}
      </Label>
      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        <Switch
          form={form}
          checked={getter}
          onChange={setter}
          className={classFn(
            getter ? 'bg-orange-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-auto'
          )}
        >
          <span
            aria-hidden="true"
            className={classFn(
              getter ? 'translate-x-5' : 'translate-x-0',
              'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
          />
        </Switch>
      </dd>
    </SwitchGroup>
  )
}

export default SwitcheableGroup
import React from 'react';

const ProfileSettings = () => (
  <div className="mt-10 divide-y divide-gray-200">
    <div className="space-y-1">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
      <p className="max-w-2xl text-sm text-gray-500">
        This information will be displayed publicly so be careful what you share.
      </p>
    </div>
    <div className="mt-6">
      <dl className="divide-y divide-gray-200">
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Name</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span className="flex-grow">Chelsea Hagon</span>
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
          <dt className="text-sm font-medium text-gray-500">Photo</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span className="flex-grow">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </span>
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
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <form id="email-update-form" name="email-update-form" className=" w-full flex flex-row justify-between items-center" action="#" onSubmit={(e) => "handleSignin(e)"}>
              <div className="text w-full max-w-[60%]">
                <input form="email-update-form"
                  id="email-address"
                  name="email"
                  pattern="\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-orange-600 indent-2 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>


              <span className="ml-4 flex-shrink-0">
                <button type="button" className="bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                  Update
                </button>
              </span>
            </form>
          </dd>
        </div>
        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
          <dt className="text-sm font-medium text-gray-500">Job title</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span className="flex-grow">Human Resources Manager</span>
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


      </dl>
    </div>
  </div>
)

export default ProfileSettings;

import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ArrowDown as ChevronUpIcon } from '../../components/icons';
// import { ChevronUpIcon } from '@heroicons/react/solid';


const faqs = [
  {
    question: "How do I track my order?",
    answer: "You can track your order by going to the 'My Orders' section and clicking on the specific order. There you'll find real-time updates on your order status."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Please check the product page for specific return information. Refunds are typically processed within 5-7 business days."
  },
  {
    question: "How can I change my account password?",
    answer: "To change your password, go to the 'Settings' page, scroll down to the 'Security' section, and click on 'Change Password'. Follow the prompts to set your new password."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination. You can see specific shipping information during checkout."
  },
];

const Help = () => {
  const [newQuestion, setNewQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New question submitted:', newQuestion);
    // Here you would typically send this to your backend
    setNewQuestion('');
    alert('Your question has been submitted. We will get back to you soon!');
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Help Center</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-orange-900 bg-orange-100 rounded-lg hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'transform rotate-180' : ''
                      } w-5 h-5 text-orange-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {faq.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Ask a New Question</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newQuestion" className="block text-sm font-medium text-gray-700">
              Your Question
            </label>
            <textarea
              id="newQuestion"
              name="newQuestion"
              rows={3}
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default Help;

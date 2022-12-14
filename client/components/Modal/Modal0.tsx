import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

export default function Modal0({Submit}) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center w-[50%] mt-6">
        <Input
          type="text"
          placeholder="Create a post"
          onClick={openModal}
          className="
          w-full h-10 rounded-sm border border-gray-300 focus:outline-none dark:focus:border-gray-500 focus:ring-1
          dark:dark:focus:ring-gray-500 bg-white

          "
        />
        <Button
          onClick={openModal}
          className="ml-2 w-36"
          >Create Post</Button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white
                 p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800
                 ">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                    Post
                                  </Dialog.Title>
                                  <form method='POST' onSubmit={Submit}>
                                      
                  <div className="mt-2">
                    <textarea
                      className="
                      w-full h-full p-2 border border-gray-300 rounded-md resize-none overflow-scroll-x  caret-blue-500 
                      focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm  text-black 
                       dark:text-white dark:bg-gray-800
                      "
                                              placeholder="What's on your mind?"
                                              name='post'
                      />
                  </div>

                       <div className="mt-4">
                                          <Button
                                              type='submit'
                        onClick={closeModal}
                                          >
                                              Post
                                          </Button>
                                          
                  </div>
                          </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

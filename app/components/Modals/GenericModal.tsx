import { Fragment, ReactNode } from 'react';

import { Dialog, Transition } from '@headlessui/react';

export const GenericModal = ({
  isOpen,
  setIsOpen,
  children,
  overflowHidden,
  transitionType = 'bottom-up',
}: {
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  children: ReactNode;
  overflowHidden?: boolean;
  transitionType?: 'bottom-up';
}) => {
  let customEnterFrom = '';
  let customEnterTo = '';
  let customLeaveFrom = '';
  let customLeaveTo = '';
  const customEnter = '';
  const customLeave = '';

  switch (transitionType) {
    case 'bottom-up':
      customEnterFrom = 'opacity-0 translate-y-20';
      customEnterTo = 'opacity-100 translate-y-0';
      customLeaveFrom = 'opacity-100 translate-y-0';
      customLeaveTo = 'opacity-0 translate-y-20';
      break;

    default:
      break;
  }
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed inset-0 z-[9999] ${
          overflowHidden ? 'overflow-y-hidden' : 'overflow-y-auto'
        } `}
        onClose={setIsOpen}
      >
        <div className="flex items-center justify-center min-h-screen px-4 py-4 text-center md:items-end sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-900 dark:bg-slate-300 bg-opacity-25 dark:bg-opacity-25" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter={customEnter ?? 'ease-out duration-300'}
            enterFrom={customEnterFrom ?? 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
            enterTo={customEnterTo ?? 'opacity-100 translate-y-0 sm:scale-100'}
            leave={customLeave ?? 'ease-in duration-200'}
            leaveFrom={customLeaveFrom ?? 'opacity-100 translate-y-0 sm:scale-100'}
            leaveTo={customLeaveTo ?? 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}
          >
            {children}
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

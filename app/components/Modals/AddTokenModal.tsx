import { useState } from 'react';
import { GenericModal } from './GenericModal';
import { X } from 'phosphor-react';
import Link from 'next/link';
import { Input } from '../input/Input';
import Button from '../input/Button';
import { useAuth } from '@/app/hooks/useAuth';

export const AddTokenModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
}) => {
  const { token, addToken, clearToken } = useAuth();
  const [input, setInput] = useState(token);

  const handleClear = () => {
    clearToken();
    setIsOpen();
  };

  const handleSubmit = () => {
    if (input) {
      addToken(input);
      setIsOpen();
    } else {
      console.log('Please add key before submitting');
    }
  };

  return (
    <>
      <GenericModal isOpen={isOpen} setIsOpen={setIsOpen} transitionType="bottom-up" overflowHidden>
        <div className="relative inline-block  text-left align-bottom transition-all transform rounded-lg  overflow-hidden text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900  max-h-[90vh] h-80  sm:align-middle px-4 w-[30vw]">
          <div className="absolute top-5 right-5 cursor-pointer w-5 h-5">
            <button onClick={setIsOpen}>
              <X color="#141414" size={20} />
            </button>
          </div>
          <div className="flex flex-col">
            <span className="text-md font-medium mt-20 mb-4 ">Add API Token :</span>
            {/* <span className='text-gray-600 text-xs'>{token}</span> */}
            <Input
              placeholder="Enter your key"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              defaultValue={token}
            />
            <div className="mt-2 text-sm">
              <span className="">{"Don't have your API key? You can find it "}</span>
              <Link
                className="text-blue-600"
                target="_blank"
                href="https://platform.openai.com/account/api-keys"
              >
                here
              </Link>
              .
            </div>
          </div>
          <div className="absolute bottom-0 border-t left-0 py-2 px-4 w-full flex justify-end gap-2 text-sm">
            <Button className="" onClick={handleClear}>
              Clear
            </Button>
            <Button className="bg-green-500 text-white" onClick={handleSubmit}>
              Add Token
            </Button>
          </div>
        </div>
      </GenericModal>
    </>
  );
};

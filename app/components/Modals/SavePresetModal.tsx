import { useState } from 'react';
import { GenericModal } from './GenericModal';
import { X } from 'phosphor-react';

import { toast } from 'react-hot-toast';
import { Input } from '../input/Input';
import Button from '../input/Button';
import { useOpenAI } from '@/app/hooks/useOpenAI';

export const SavePresetModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
}) => {
  const { savePreset } = useOpenAI();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!!name) {
      savePreset(name, description);
      setName('');
      setDescription('');
      setIsOpen();

      toast.success('Preset saved successfully');
    } else {
      toast.error('Name is missing');
    }
  };

  return (
    <>
      <GenericModal isOpen={isOpen} setIsOpen={setIsOpen} transitionType="bottom-up" overflowHidden>
        <div className="relative inline-block  text-left align-bottom transition-all transform rounded-lg  text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 overflow-hidden max-h-[90vh] h-96  sm:align-middle px-4 w-[30vw]">
          <div className="absolute top-5 right-5 cursor-pointer w-5 h-5">
            <button onClick={setIsOpen}>
              <X color="#141414" size={20} />
            </button>
          </div>
          <div className="flex flex-col">
            <span className="text-md  font-medium mt-20">Name </span>
            <Input
              className="mt-2"
              placeholder="Name this preset"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="text-md font-medium mt-10">
              <span className=" ">Description</span>
              <span className="ml-2 text-md font-light text-gray-600">(Optional)</span>
            </div>
            <Input
              className="mt-2"
              placeholder="Enter your key"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="absolute bottom-0 border-t left-0 py-2 px-4 w-full flex justify-end gap-2 text-sm">
            <Button className="bg-green-500 text-white" onClick={handleSubmit}>
              Save Preset
            </Button>
          </div>
        </div>
      </GenericModal>
    </>
  );
};

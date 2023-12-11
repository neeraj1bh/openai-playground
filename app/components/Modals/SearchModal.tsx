import { useEffect, useState } from 'react';
import { GenericModal } from './GenericModal';
import { FloppyDisk, X } from 'phosphor-react';
import { useOpenAI } from '../../hooks/useOpenAI';
import { IPreset } from '../../utils/types';
import { toast } from 'react-hot-toast';

export const SearchModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: () => void }) => {
  const { presets, applyPreset } = useOpenAI();
  const [input, setInput] = useState('');
  const [filteredPresets, setFilteredPresets] = useState(presets);
  const [allPresets, setAllPresets] = useState(presets);

  useEffect(() => {
    if (input) {
      const filtered = allPresets.filter((set) => {
        const presetString = (set.name + ' ' + set.description).toLowerCase();
        console.log({ presetString });

        return presetString.includes(input.toLowerCase());
      });

      setFilteredPresets(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    setAllPresets(presets);
  }, [presets]);

  const handleSubmit = (preset: IPreset) => {
    applyPreset(preset);
    toast.success('Preset applied successfully');
    setIsOpen();
  };

  return (
    <>
      <GenericModal isOpen={isOpen} setIsOpen={setIsOpen} transitionType="bottom-up" overflowHidden>
        <div className="relative inline-block text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900  text-left align-bottom transition-all transform rounded-lg  overflow-hidden max-h-[90vh] h-[80vh]  sm:align-middle  w-[40vw]">
          <div className="absolute top-5 right-5 cursor-pointer w-5 h-5">
            <button onClick={setIsOpen}>
              <X size={20} />
            </button>
          </div>
          <div className="w-full">
            <input
              className="border-b-2 bg-white dark:bg-slate-900  font-light outline-none text-3xl py-4 px-4 w-full "
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              placeholder="Search your presets..."
            />
          </div>
          <div className="relative h-full max-h-[89%] min-h-[89%]">
            <div className="flex h-full overflow-y-scroll flex-col">
              {(input ? filteredPresets : allPresets).map((preset) => {
                return (
                  <div
                    key={preset.name}
                    onClick={() => {
                      handleSubmit(preset);
                    }}
                    className="flex items-center dark:border-gray-400 border-b center w-full p-4"
                  >
                    <FloppyDisk className="rounded shrink-0 bg-green-500 text-white" size={40} />
                    <div className="ml-4 flex flex-col">
                      <span className="">{preset.name}</span>
                      <span className="mt-1 font-light text-sm h-5 w-96 overflow-hidden truncate ">
                        {preset.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </GenericModal>
    </>
  );
};

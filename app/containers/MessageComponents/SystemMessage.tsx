import { SavePresetModal } from '@/app/components/Modals/SavePresetModal';
import { useOpenAI } from '@/app/hooks/useOpenAI';
import { Export, FloppyDisk } from 'phosphor-react';
import { useState } from 'react';
import { Tooltip } from 'react-tippy';

const SystemMessage = () => {
  const { updateSystemMessage, systemMessage, exportMessages } = useOpenAI();

  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);

  return (
    <div>
      <div className="ml-2 mt-1 flex justify-between items-center text-md font-light ">
        {/* @ts-ignore */}
        <Tooltip
          animation="fade"
          style={{ textAlign: 'left' }}
          duration={0}
          title={
            'The system message helps set the behavior of the assistant. For example, you can modify the personality of the assistant or provide specific instructions about how it should behave throughout the conversation.'
          }
          position="right"
          trigger="mouseenter"
        >
          <span>System message :</span>
        </Tooltip>
        <div className="flex gap-2 mr-1 cursor-pointer items-center">
          {/* @ts-ignore */}
          <Tooltip
            animation="fade"
            style={{ textAlign: 'left' }}
            duration={0}
            title={'Save Settings'}
            position="top"
            trigger="mouseenter"
          >
            <FloppyDisk
              className="mr-1"
              size={24}
              onClick={() => setIsPresetModalOpen((prev) => !prev)}
            />
          </Tooltip>

          {/* @ts-ignore */}
          <Tooltip
            animation="fade"
            style={{ textAlign: 'left' }}
            duration={0}
            title={'Export Messages'}
            position="top"
            trigger="mouseenter"
          >
            <Export className="mr-1" size={24} onClick={exportMessages} />
          </Tooltip>

          {/* <span>Save</> */}
        </div>
      </div>
      <textarea
        className="text-sm bg-transparent border border-gray-400 focus:border-gray-500 border-1 font-mono mt-3 flex-1 w-full resize-none focus:outline-none rounded-md p-3 min-h-[10vh]"
        value={systemMessage.content}
        onChange={(e) => updateSystemMessage(e.target.value)}
      />
      <SavePresetModal
        isOpen={isPresetModalOpen}
        setIsOpen={() => {
          setIsPresetModalOpen((prev) => !prev);
        }}
      />
    </div>
  );
};

export default SystemMessage;

import { useOpenAI } from '@/app/hooks/useOpenAI';
import { Tooltip } from 'react-tippy';

const SystemMessage = () => {
  const { updateSystemMessage, systemMessage } = useOpenAI();

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
      </div>
      <textarea
        className="text-sm bg-transparent border border-gray-400 focus:border-gray-500 border-1 font-mono mt-3 flex-1 w-full resize-none focus:outline-none rounded-md p-3 min-h-[10vh]"
        value={systemMessage.content}
        onChange={(e) => updateSystemMessage(e.target.value)}
      />
    </div>
  );
};

export default SystemMessage;

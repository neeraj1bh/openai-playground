import React, { useEffect } from 'react';
import { useOpenAI } from '@/app/hooks/useOpenAI';
import PlaygroundMessage from './PlaygroundMessage';
import Button from '@/app/components/input/Button';

type Props = {};

export default function PlaygroundMessages({}: Props) {
  const { messages, loading, submit, addMessage } = useOpenAI();
  const messageContainer = React.useRef<HTMLDivElement>(null);
  const [prevMessageLength, setPrevMessageLength] = React.useState(0);
  const [scrolling, setScrolling] = React.useState(false);
  console.log({ messages });

  useEffect(() => {
    if (messages.length != prevMessageLength) {
      setPrevMessageLength(messages.length);
    }

    if (messageContainer.current && (!scrolling || messages.length != prevMessageLength)) {
      messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
    }
  }, [messages, prevMessageLength, scrolling]);

  return (
    <div className="flex  h-[60vh] pb-4 shadow-lg bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30 overflow-y-auto p-4 rounded-md flex-col md:grow">
      <div
        className=" flex mb-4 flex-col gap-4 overflow-y-auto no-scrollbar "
        ref={messageContainer}
      >
        {messages.map((message) => (
          <PlaygroundMessage key={message.id} message={message} />
        ))}
        <Button
          className="w-40  text-white border bg-blue-400"
          onClick={() => addMessage('', 'user')}
        >
          Add Message
        </Button>
      </div>

      <button
        className={`w-full mt-auto rounded  p-2 text-white ${
          loading ? 'bg-gray-500 cursor-wait' : ' bg-green-500 hover:bg-green-600'
        }`}
        onClick={submit}
      >
        {loading ? 'Loading' : 'Generate'}
      </button>
    </div>
  );
}

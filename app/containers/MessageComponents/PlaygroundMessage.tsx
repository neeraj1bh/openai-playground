import React from 'react';
import { IMessage, useOpenAI } from '@/app/hooks/useOpenAI';
import { Trash } from 'phosphor-react';

type Props = {
  message: IMessage;
};

const PlaygroundMessage = ({ message: { id, role, content } }: Props) => {
  const [focus, setFocus] = React.useState(false);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const { updateMessageContent, removeMessage, toggleMessageRole } = useOpenAI();

  const resize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '40px';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === content || id === undefined) return;

    updateMessageContent(id, e.target.value);
    resize();
  };

  const handleRemove = () => {
    if (id === undefined) return;

    removeMessage(id);
  };

  const handleToggleRole = () => {
    if (id === undefined) return;

    toggleMessageRole(id);
  };

  React.useEffect(() => {
    resize();
  }, [content]);

  return (
    <div
      className={`group text-sm rounded-md s flex cursor-pointer flex-row items-center p-4 transition-all dark:hover:bg-gray-900 hover:bg-gray-100 ${
        focus && 'bg-gray-100 dark:bg-gray-900'
      }`}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <div className="basis-3/12 ">
        <button
          className={`select-none rounded p-2 text-sm font-semibold  transition-all group-hover:bg-gray-100 dark:group-hover:bg-gray-900  ${
            focus && 'bg-gray-100 dark:bg-gray-900'
          }`}
          onClick={handleToggleRole}
        >
          {role.toUpperCase()}
        </button>
      </div>
      <div className="basis-8/12 items-center">
        <textarea
          className="text-md w-full h-14 items-center resize-none rounded bg-transparent p-4 focus:border-transparent  focus:outline-none focus:ring-1 focus:ring-blue-600"
          value={content}
          onChange={handleContentChange}
          placeholder={`Enter ${role} message here`}
          ref={textAreaRef}
        />
      </div>

      <div className="flex basis-1/12 justify-center">
        <button
          className={`group-hover:text-gray-600 dark:group-hover:text-gray-300 text-transparent transition-all focus:outline-none `}
          onClick={handleRemove}
        >
          <Trash className="hover:text-red-500" size={20} />
        </button>
      </div>
    </div>
  );
};

export default PlaygroundMessage;

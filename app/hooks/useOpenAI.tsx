import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import useAsyncEffect from 'use-async-effect';
import { OpenAIConfig, OpenAIModel } from '../utils/types';

export const defaultConfig = {
  model: 'gpt-3.5-turbo',
  messages: [],
  temperature: 0.5,
  max_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0.6,
};

export type IMessage = {
  id?: number;
  role: 'system' | 'assistant' | 'user';
  content: string;
};

const defaultContext = {
  messages: [],
  config: defaultConfig as OpenAIConfig,
  addMessage: () => {},
  removeMessage: (id: number) => {},
  toggleMessageRole: (id: number) => {},
  updateMessageContent: (id: number, content: string) => {},
  submit: () => {},
  loading: true,
  error: '',
};

const OpenAIContext = createContext<{
  messages: IMessage[];
  addMessage: (content?: string, role?: 'user' | 'assistant') => void;
  removeMessage: (id: number) => void;
  toggleMessageRole: (id: number) => void;
  updateMessageContent: (id: number, content: string) => void;
  submit: () => void;
  loading: boolean;
}>(defaultContext);

export default function OpenAIProvider({ children }: PropsWithChildren) {
  console.log(process.env.NEXT_PUBLIC_API_KEY);

  const [loading, setLoading] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';
  const [config] = useState<OpenAIConfig>(defaultConfig);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [_, setModels] = useState<OpenAIModel[]>([]);

  const fetchModels = async () => {
    return await fetch('/api/openai/models', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
    });
  };

  useAsyncEffect(async () => {
    const data = await (await fetchModels()).json();
    setModels(data.chatModels || []);
  }, [apiKey]);

  const removeMessage = (id: number) => {
    setMessages((prev) => {
      return [...prev.filter((message) => message.id !== id)];
    });
  };

  const toggleMessageRole = (id: number) => {
    setMessages((prev) => {
      const index = prev.findIndex((message) => message.id === id);
      if (index === -1) return prev;
      const message = prev[index];
      return [
        ...prev.slice(0, index),
        {
          ...message,
          role: message.role === 'user' ? 'assistant' : 'user',
        },
        ...prev.slice(index + 1),
      ];
    });
  };

  const updateMessageContent = (id: number, content: string) => {
    setMessages((prev) => {
      const index = prev.findIndex((message) => message.id === id);
      if (index === -1) return prev;
      const message = prev[index];
      return [
        ...prev.slice(0, index),
        {
          ...message,
          content,
        },
        ...prev.slice(index + 1),
      ];
    });
  };

  const submit = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const answer = await fetch('/api/openai/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          ...config,
          messages: [
            /**
             * hardcoded system message
             */
            {
              role: 'system',
              content: 'You are a helpful AI nuclear scientist',
            },
            ...messages,
          ].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      const resp = await answer.json();

      console.log({ resp });

      if (resp?.error) {
        let errMessage =
          resp?.message ?? 'Failed to fetch response, check your API key and try again.';
        if (resp.status === '429') {
          errMessage =
            "Whoops! We're navigating a sea of requests. Please wait a couple minutes before you try again.";
        }
        throw new Error(errMessage);
      }

      const newMessage = resp.data.choices[0].message;

      setMessages((prev) => {
        return [...prev, { id: prev.length, content: newMessage.content, role: newMessage.role }];
      });
    } catch (error: any) {}

    setLoading(false);
  }, [loading, config, apiKey, messages]);

  const addMessage = useCallback((content: string = '', role: 'user' | 'assistant' = 'user') => {
    setMessages((prev) => {
      const messages = [
        ...prev,
        {
          id: prev.length,
          role,
          content: content || '',
        } as IMessage,
      ];

      return messages;
    });
  }, []);

  const value = useMemo(
    () => ({
      messages,
      addMessage,
      removeMessage,
      toggleMessageRole,
      updateMessageContent,
      submit,
      loading,
      config,
    }),
    [
      messages,
      addMessage,
      removeMessage,
      toggleMessageRole,
      updateMessageContent,
      submit,
      loading,
      config,
    ],
  );

  return <OpenAIContext.Provider value={value}>{children}</OpenAIContext.Provider>;
}

export const useOpenAI = () => useContext(OpenAIContext);

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useAsyncEffect from 'use-async-effect';
import { OpenAIConfig, OpenAIModel, TokenUsage } from '../utils/types';
import { OpenAIChatModels } from '../utils/constants';

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

export type SystemMessage = {
  role: 'system';
  content: string;
};

const defaultContext = {
  systemMessage: {
    role: 'system',
    content: 'You are a helpful AI chatbot.',
  } as SystemMessage,
  messages: [],
  config: defaultConfig as OpenAIConfig,
  updateSystemMessage: (content: string) => {},
  addMessage: () => {},
  removeMessage: (id: number) => {},
  toggleMessageRole: (id: number) => {},
  updateMessageContent: (id: number, content: string) => {},
  updateConfig: (newConfig: Partial<OpenAIConfig>) => {},
  submit: () => {},
  models: [],
  loading: true,
  error: '',
  tokenUsage: 0.0,
  individualTokenUsage: [],
};

const OpenAIContext = createContext<{
  systemMessage: SystemMessage;
  messages: IMessage[];
  config: OpenAIConfig;
  updateSystemMessage: (content: string) => void;
  addMessage: (content?: string, role?: 'user' | 'assistant') => void;
  removeMessage: (id: number) => void;
  toggleMessageRole: (id: number) => void;
  models: OpenAIModel[];
  updateMessageContent: (id: number, content: string) => void;
  updateConfig: (newConfig: Partial<OpenAIConfig>) => void;
  submit: () => void;
  loading: boolean;
  tokenUsage: number;
  individualTokenUsage: TokenUsage[];
}>(defaultContext);

export default function OpenAIProvider({ children }: PropsWithChildren) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || '';

  const [loading, setLoading] = useState(false);

  const [systemMessage, setSystemMessage] = useState<SystemMessage>(defaultContext.systemMessage);
  const [config, setConfig] = useState<OpenAIConfig>(defaultConfig);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [tokenUsage, setTokenUsage] = useState<number>(0.0);
  const [individualTokenUsage, setIndividualTokenUsage] = useState<TokenUsage[]>([]);
  const [models, setModels] = useState<OpenAIModel[]>([]);

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
    if (!apiKey) {
      return setModels(Object.values(OpenAIChatModels));
    }

    const data = await (await fetchModels()).json();
    setModels(data.chatModels || []);
  }, [apiKey]);

  const reconcile = () => {
    if (localStorage.individualTokenUsage) {
      setIndividualTokenUsage(JSON.parse(localStorage.individualTokenUsage));
    } else {
      localStorage.setItem('individualTokenUsage', JSON.stringify([]));
    }
    if (localStorage.tokenUsage) {
      setTokenUsage(Number(localStorage.tokenUsage));
    } else {
      localStorage.setItem('tokenUsage', '0.0');
    }
  };

  useEffect(() => {
    reconcile();
  }, []);

  const updateSystemMessage = (content: string) => {
    setSystemMessage({
      role: 'system',
      content,
    });
  };

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

  const updateConfig = (newConfig: Partial<OpenAIConfig>) => {
    setConfig((prev) => {
      return {
        ...prev,
        ...newConfig,
      };
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

  const updateTokenUsage = useCallback(
    (
      model: keyof typeof OpenAIChatModels,
      usage: { completion_tokens: number; prompt_tokens: number; total_tokens: number },
    ) => {
      const { inputCost, outputCost } = OpenAIChatModels[model];

      const total =
        inputCost * Number(usage.prompt_tokens) + outputCost * Number(usage.completion_tokens);

      const itemExists = individualTokenUsage.find((item) => item.name === model);

      let updatedUsage = [];

      if (itemExists) {
        updatedUsage = individualTokenUsage.map((item) => {
          if (item.name === model) {
            return { ...item, usage: total + item.usage };
          }
          return item;
        });
      } else {
        updatedUsage = [...individualTokenUsage, { name: model, usage: total }];
      }

      localStorage.setItem('individualTokenUsage', JSON.stringify(updatedUsage));
      setIndividualTokenUsage(updatedUsage);

      setTokenUsage((prev) => {
        const newUsage = prev + total;
        localStorage.setItem('tokenUsage', JSON.stringify(newUsage));
        return newUsage;
      });
    },
    [individualTokenUsage],
  );

  const submit = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const currentConfig = { ...config };

    try {
      const answer = await fetch('/api/openai/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          ...config,
          messages: [systemMessage, ...messages].map(({ role, content }) => ({
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

      updateTokenUsage(currentConfig.model, resp.data.usage);
    } catch (error: any) {}

    setLoading(false);
  }, [loading, config, apiKey, systemMessage, messages, updateTokenUsage]);

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
      systemMessage,
      messages,
      config,
      loading,
      updateSystemMessage,
      addMessage,
      removeMessage,
      toggleMessageRole,
      models,
      updateMessageContent,
      updateConfig,
      submit,
      individualTokenUsage,
      tokenUsage,
    }),
    [
      systemMessage,
      messages,
      config,
      loading,
      addMessage,
      models,
      submit,
      individualTokenUsage,
      tokenUsage,
    ],
  );

  return <OpenAIContext.Provider value={value}>{children}</OpenAIContext.Provider>;
}

export const useOpenAI = () => useContext(OpenAIContext);
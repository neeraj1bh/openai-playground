import Dropdown from '@/app/components/input/DropDown';
import Slider from '@/app/components/input/Slider';
import { useOpenAI } from '@/app/hooks/useOpenAI';
import { OpenAIChatModels } from '@/app/utils/constants';
import { OpenAIConfig } from '@/app/utils/types';

type Props = {};

export default function Sidebar({}: Props) {
  const { config, updateConfig, models, tokenUsage } = useOpenAI();

  const handleUpdateConfig = <T extends keyof OpenAIConfig>(
    id: T,
    value: OpenAIConfig[T] | undefined,
  ) => {
    updateConfig({
      [id]: value,
    });
  };

  return (
    <div className="flex md:max-w-[25%] min-w-[200px] w-full flex-col items-stretch gap-y-8 mx-auto px-4 py-2 shadow-lg rounded-md bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30">
      <Dropdown
        tooltipContent="Choose a model which will generate the completion."
        label="Model"
        options={!models.length ? [] : (models.map(({ id }) => ({ label: id, value: id })) as any)}
        value={{ label: config.model, value: config.model }}
        onChange={(option) => handleUpdateConfig('model', option)}
        id={'#model'}
      />
      <Slider
        tooltipContent="Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive."
        label="temperature"
        range={[0, 1]}
        step={0.01}
        value={config.temperature as number}
        onChange={(value: OpenAIConfig['temperature']) => handleUpdateConfig('temperature', value)}
      />
      <Slider
        tooltipContent="The maximum number of tokens to generate. Requests can use up to 2,048 or 4,000 tokens shared between prompt and completion. The exact limit varies by model. (One token is roughly 4 characters for normal English text)"
        label="maximum length"
        range={[0, OpenAIChatModels[config.model].maxLimit || 8192]}
        step={1}
        value={config.max_tokens as number}
        onChange={(value: OpenAIConfig['max_tokens']) => handleUpdateConfig('max_tokens', value)}
      />
      <Slider
        tooltipContent="Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered."
        label="top p"
        range={[0, 1]}
        step={0.01}
        value={config.top_p as number}
        onChange={(value: OpenAIConfig['top_p']) => handleUpdateConfig('top_p', value)}
      />
      <Slider
        tooltipContent="How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim"
        label="frequency penalty"
        range={[0, 1]}
        step={0.01}
        value={config.frequency_penalty as number}
        onChange={(value: OpenAIConfig['frequency_penalty']) =>
          handleUpdateConfig('frequency_penalty', value)
        }
      />
      <Slider
        tooltipContent="How much to penalize new tokens based on whether they appear in the text so far. Increases the model's likelihood to talk about new topics."
        label="presence penalty"
        range={[0, 1]}
        step={0.01}
        value={config.presence_penalty as number}
        onChange={(value: OpenAIConfig['presence_penalty']) =>
          handleUpdateConfig('presence_penalty', value)
        }
      />
      <div className="w-full ">
        <p className="text-sm font-normal text-center text-green-700 w-full mx-auto">
          TOKEN USAGE: ${tokenUsage}
        </p>
      </div>
    </div>
  );
}

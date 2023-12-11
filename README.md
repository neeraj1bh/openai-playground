# OpenAI Playground

### Live Demo

[Click here to see it live](https://openai.nb9t7.com/)

<img alt="OpenAI playground example" src="https://github.com/neeraj1bh/openai-playground/assets/55753068/44143085-4190-4491-bfce-0237c008fa65">

## Installation and usage

```bash
git clone https://github.com/neeraj1bh/openai-playground
cd openai-playground
yarn
yarn dev
```

```
Add your OpenAI API token while using
```

## Features

- Users can generate completions using the model of their choice.
- Tracking token usage for all models individually, so user can track their cost of usage.
- Ability to closely control the variables used for completion.
- Export your messages sent during the session as a JSON.
- Ability to save and search through user presets.

## Choices and Reasons

- Data export because all good services should have a data export, just in case you want to use that data elsewhere or use another service 🥲
- I chose to show token usage cost because it was something I found myself looking at often when trying to call the API or see remaining credits. Also, this seems like an app that would have more analytics down the line.
- I created a dark mode because it's always better to have that choice than not.
- I added tooltips for all the config settings so that a new user has something to go on when they are working with models for the first time.
- The saving and searching of presets was done so that you can later use a setting that gave you good results.
- I stored data locally to save the presets and usage until the time I add login and can store it in a DB.

## Future improvements

- User login.
- Tracking token usage per session.
- Website tour for onboarding users.
- Advanced search for preset.

## External Libraries and Resources

- [OpenAI API](https://platform.openai.com/docs/api-reference)
- [TailwindCSS](https://www.npmjs.com/package/tailwindcss)
- [ChartJS](https://www.chartjs.org/)
- [Next.js](https://github.com/vercel/next.js/)

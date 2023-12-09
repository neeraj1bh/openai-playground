const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  // check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // run tests
  '**/*.(ts|tsx)': () => 'yarn test',

  // lint and format TypeScript and JavaScript files
  '**/*.{js,jsx,ts,tsx}': (filenames) => [
    buildEslintCommand(filenames),
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `yarn prettier --write ${filenames.join(' ')}`,
};

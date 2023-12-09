import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockRouter } from '@/app/testing/next/mock-router';
import OpenAIProvider from '@/app/hooks/useOpenAI';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

const AllTheProviders = ({ children }: { children: any }) => {
  return (
    <RouterContext.Provider value={mockRouter}>
      <OpenAIProvider>{children}</OpenAIProvider>
    </RouterContext.Provider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

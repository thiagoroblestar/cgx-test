import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from "@/pages/index";

jest.mock('axios');
jest.mock('next/router', () => require('next-router-mock'));

const queryClient = new QueryClient();

describe("Home", () => {
  it("renders about button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const heading = screen.getByText('About');

    expect(heading).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Login from "@/pages/login";

jest.mock('axios');
jest.mock('next/router', () => require('next-router-mock'));

const queryClient = new QueryClient();

describe("Login", () => {
  it("renders submit button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );

    const heading = screen.getByText('Submit');

    expect(heading).toBeInTheDocument();
  });
});

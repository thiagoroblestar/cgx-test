import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Profile from "@/pages/profile";

jest.mock('axios');
jest.mock('next/router', () => require('next-router-mock'));

const queryClient = new QueryClient();

describe("Profile", () => {
  it("renders update button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Profile />
      </QueryClientProvider>
    );

    const heading = screen.getByText('Update');

    expect(heading).toBeInTheDocument();
  });
});

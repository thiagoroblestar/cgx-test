import Button from "@/components/Button";
import Container from "@/components/Container";
import QuoteDialog from "@/components/QuoteDialog";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Profile() {
  const [requestQuote, setRequestQuote] = useState(false);
  const [quote, setQuote] = useState('');

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await api.get(`/profile?token=${token}`);
      return res.data;
    }
  });

  const profile = data?.data;

  return (
    <Container>
      <div className="py-6">
        <div className="flex gap-10">
          <div>
           <img className="inline-block h-24 w-24 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </div>
          <div>
            <h3 className="text-3xl mb-3">Welcome, {profile?.fullname || ''}!</h3>
            <Button
              onClick={() => setRequestQuote(true)}
            >
              Update
            </Button>
          </div>
        </div>
        <p className="mt-10">{quote}</p>
      </div>
      <QuoteDialog
        open={requestQuote}
        onClose={() => setRequestQuote(false)}
        onComplete={(data) => setQuote(data)}
      />
    </Container>
  );
}

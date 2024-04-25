import Container from "@/components/Container";
import api from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ['info'],
    queryFn: async () => {
      const res = await api.get('/info');
      return res.data;
    }
  });

  const info = data?.data?.info || '';

  return (
    <Container>
      <div>
        <p className="text-3xl mt-6" dangerouslySetInnerHTML={{ __html: info }}></p>
      </div>
    </Container>
  );
}

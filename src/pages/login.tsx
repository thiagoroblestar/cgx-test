import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import api from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

type SignInBody = {
    email: string;
    password: string;
}

export default function SignIn() {
    const { push } = useRouter();
    const { mutate } = useMutation({
        mutationFn: async (body: SignInBody) => {
            const res = await api.post('/login', body);
            return res.data;
        },
        onSuccess:(res: any) => {
            const token = res?.data?.token;
            localStorage.setItem('token', token);
            push('/profile');
        }
    });

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutate({ email, password });
    };

    return (
        <Container>
            <div className="py-4">
                <form onSubmit={handleSubmit}>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        label="Email address"
                        infoText="We'll never share your email with anyone else."
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        label="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </Container>
    );
}

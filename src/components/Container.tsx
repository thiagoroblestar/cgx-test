import React, { useEffect, useState } from 'react';
import Button from './Button';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useMutation } from '@tanstack/react-query';
import api from '@/utils/api';

interface ContainerProps {
    children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
    const { push } = useRouter();

    const [isAuth, setIsAuth] = useState(false);

    const { mutate } = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            const res = await api.delete(`/logout?token=${token}`);
            return res.data;
        },
        onSuccess: (res: any) => {
            localStorage.removeItem('token');
            push('/login');
        }
    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
        }
    }, []);

    return (
        <main className='px-12 py-6'>
            <nav className='flex gap-2'>
                <Link href="/">
                    <Button variant='outlined'>
                        About
                    </Button>
                </Link>
                {
                    isAuth ? (
                        <>
                            <Link href="/profile">
                                <Button variant='outlined'>
                                    Profile
                                </Button>
                            </Link>
                            <Button variant='outlined' onClick={() => mutate()}>
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button variant='outlined'>
                                Sign in
                            </Button>
                        </Link>
                    )
                }
            </nav>
            {children}
        </main>
    );
};

export default Container;

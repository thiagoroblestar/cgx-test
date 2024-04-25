import React, { useEffect, useState } from "react";
import Button from "./Button";
import api from "@/utils/api";

interface QuoteDialogProps {
    open?: boolean;
    onClose: () => void;
    onComplete: (data: string) => void;
}

const QuoteDialog: React.FC<QuoteDialogProps> = ({ open, onClose, onComplete }) => {
    const [author, setAuthor] = useState('');
    const [quote, setQuote] = useState('');
    const [abortController, setAbortController] = useState<AbortController | null>(null);

    const getData = async () => {
        const controller = new AbortController();
        setAbortController(controller);
        
        try {
            const token = localStorage.getItem('token');
            const resAuthor = await api.get(`/author?token=${token}`, { signal: controller.signal });
            const authorData = resAuthor.data.data;
            setAuthor(authorData.name);

            const resQuote = await api.get(`/quote?token=${token}&authorId=${authorData.authorId}`, { signal: controller.signal });
            const quoteData = resQuote.data.data;
            setQuote(quoteData.quote);

            onComplete(authorData.name + ' ' + quoteData.quote);
            onClose();
        } catch (error) {
            onClose();
        }
    }

    useEffect(() => {
        if (open) {
            setAuthor('');
            setQuote('');
            getData();
        }

        return () => {  // Cleanup abortController when component is unmounted or open changes
            abortController?.abort();
        };
    }, [open]);

    const handleCancel = () => {
        abortController?.abort();
    }

    if (!open) {
        return null;
    }

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-6 py-6">
                            <h3 className="text-3xl">Requesting the quote</h3>
                            <div className="my-3">
                                <p>Step 1: Requesting author... {author ? 'Completed' : ''}</p>
                                {author && <p>Step 2: Requesting quote... {quote ? 'Completed' : ''}</p>}
                            </div>
                            <Button onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuoteDialog;

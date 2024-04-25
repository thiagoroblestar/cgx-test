import type { NextApiRequest, NextApiResponse } from 'next';
import delay from '@/utils/delay';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await delay(5000);

    const authors = [
        {
            "authorId": 1,
            "name": "Walt Disney"
        },
        {
            "authorId": 2,
            "name": "Mark Twain"
        },
        {
            "authorId": 3,
            "name": "Albert Einstein"
        }
    ];

    const randomIndex = Math.floor(Math.random() * authors.length);
    const randomAuthor = authors[randomIndex];

    res.status(200).json({ success: true, data: randomAuthor });
}

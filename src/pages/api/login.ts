import type { NextApiRequest, NextApiResponse } from 'next';

type LoginRequest = {
   email: string;
   password: string;
};

type LoginResponse = {
   success: boolean;
   data?: {
      token: string;
   };
   error?: string;
};

export default function handler(
   req: NextApiRequest,
   res: NextApiResponse<LoginResponse>
) {
   if (req.method === 'POST') {
      const { email, password } = req.body as LoginRequest;

      if (email && password) {
         const token = 'fb566635a66295da0c8ad3f467c32dcf'; // This should be generated dynamically
         res.status(200).json({ success: true, data: { token } });
      } else {
         res.status(400).json({ success: false, error: 'Invalid request' });
      }
   } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}

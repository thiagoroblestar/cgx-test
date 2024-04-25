import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    res.status(200).json({
        "success": true,
        "data": {
            "info": "Some information about the <b>company</b>."
        }
    });
}
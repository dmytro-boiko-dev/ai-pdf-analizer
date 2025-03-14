import * as dotenv from 'dotenv';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './router';
import type { AppRouter } from './router';


dotenv.config();

export function createServer() {
    const app = express();

    app.use(express.json({ limit: '10mb' }));

    // @ts-ignore
    app.use(
        '/trpc',
        createExpressMiddleware<AppRouter>({
            router: appRouter,
            createContext: () => ({}),
        })
    );

    return app;
}


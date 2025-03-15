import express from 'express';
import {createExpressMiddleware} from '@trpc/server/adapters/express';
import {router} from './trpc';
import pdfAnalysisRouter from './routes/pdfAnalysis';

// @ts-ignore
const appRouter = router({
    pdf: pdfAnalysisRouter,
});

export type AppRouter = typeof appRouter;
const app = express();

app.use('/trpc', createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
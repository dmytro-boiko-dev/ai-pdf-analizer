import * as dotenv from 'dotenv';
dotenv.config();

import {createServer} from './server';

const PORT = process.env.PORT || 3000;
const app = createServer();

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

import api from './api';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3001;

api.listen(PORT, () => {
  console.log(`Running server on port: ${PORT}`);
});

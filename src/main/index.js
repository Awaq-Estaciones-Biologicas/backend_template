import app from '~/app.js';
import { environment } from '~/configs/environment.js';
import { logInfo } from './helpers/logManager.js';

const PORT = environment.PORT || 3000;
app.listen(PORT, () => {
  logInfo(`Server is running on port ${PORT}.`);
});

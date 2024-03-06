import { serverHTTP } from './http';
import './websocket';

serverHTTP.listen(3003, () => console.log('Server runing on http://localhost:3003/'));

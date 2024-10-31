import { WorkerFunc } from 'types/funcs';
import { expose } from 'comlink';

const method: WorkerFunc = (method, params) => {
  try {
    const result = '';

    return {
      result,
      status: true,
      message: 'Successful',
    };
  } catch (error) {
    return {
      result: null,
      status: false,
      message: error,
    };
  }
};

expose(method);

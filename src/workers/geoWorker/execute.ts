import { WorkerFunc } from 'types/funcs';
import { expose } from 'comlink';
import METHOD_NAMES from './methodNames';
import { getData, setData } from './methods';

const METHODS = {
  [METHOD_NAMES.SET_DATA]: setData,
  [METHOD_NAMES.GET_DATA]: getData,
};

const method: WorkerFunc = (method, params) => {
  try {
    const methodFunc = METHODS[method];
    const result = methodFunc(params);

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

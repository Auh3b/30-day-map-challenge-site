import Day1Layer from './Day1Layer';
import Day2Layer from './Day2Layer';

const getLayers = () => {
  return [Day1Layer(), Day2Layer()];
};

export default getLayers;

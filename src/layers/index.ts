import Day1Layer from './Day1Layer';
import Day2Layer from './Day2Layer';
import Day3Layer from './Day3Layer';
import Day4Layer from './Day4Layer';

const getLayers = () => {
  return [Day1Layer(), Day2Layer(), Day3Layer(), Day4Layer()];
};

export default getLayers;

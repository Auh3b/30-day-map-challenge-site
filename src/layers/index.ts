import Day1Layer from './Day1Layer';
import Day2Layer from './Day2Layer';
import Day3Layer from './Day3Layer';
import Day4Layer from './Day4Layer';
import Day5Layer from './Day5Layer';
import Day6Layer from './Day6Layer';
import Day7Layer from './Day7Layer';

const getLayers = () => {
  return [
    Day1Layer(),
    Day2Layer(),
    Day3Layer(),
    Day4Layer(),
    Day5Layer(),
    Day6Layer(),
    Day7Layer(),
  ];
};

export default getLayers;

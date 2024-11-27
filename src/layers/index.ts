import Day10Layer from './Day10Layer';
import Day11Layer from './Day11Layer';
import Day16Layer from './Day16Layer';
import Day18Layer from './Day18Layer';
import Day1Layer from './Day1Layer';
import Day2Layer from './Day2Layer';
import Day3Layer from './Day3Layer';
import Day4Layer from './Day4Layer';
import Day5Layer from './Day5Layer';
import Day6Layer from './Day6Layer';
import Day7Layer from './Day7Layer';
import Day8Layer from './Day8Layer';
import Day9Layer from './Day9Layer';

const getLayers = () => {
  return [
    Day1Layer(),
    Day2Layer(),
    Day3Layer(),
    Day4Layer(),
    Day5Layer(),
    Day6Layer(),
    Day7Layer(),
    Day8Layer(),
    Day9Layer(),
    Day10Layer(),
    Day11Layer(),
    Day16Layer(),
    Day18Layer(),
  ];
};

export default getLayers;

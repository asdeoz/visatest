import calculator from './calculator';

const main = () => {

  console.log('Starting main');

  calculator((error, data, response) => {
    console.log("Calculation done.");
  });

};

main();

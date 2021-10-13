const generatePokeId = () => {
    let max = 898;
    let min = 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
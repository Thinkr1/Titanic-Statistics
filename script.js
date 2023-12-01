// fetch("titanic.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const totalPassengers = data.length;
//     const classes = [1, 2, 3];
//     classes.forEach((classNum) => {
//       const classCount = data.filter(
//         (passenger) => passenger.Class === classNum
//       ).length;
//       const classPercentage = (classCount / totalPassengers) * 100;
//       document.getElementById(
//         "byclass"
//       ).innerHTML += `Class ${classNum} Percentage: ${classPercentage}%<br>`;
//     });
//   });

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

fetch("./titanic.json")
  .then((response) => response.json())
  .then((data) => {

    // SURVIVED

    const classes = [1, 2, 3];
    classes.forEach((classNum) => {
      const filteredPassengers = data.filter(
        (passenger) => passenger.Class === classNum
      );
      const survivedInClass = filteredPassengers.filter(
        (passenger) => passenger.Survived === 1
      ).length;
      const classPercentage = round(
        (survivedInClass / filteredPassengers.length) * 100,
        1
      );
      document.getElementById(
        `class${classNum}p`
      ).innerHTML = `${classPercentage}%`;
      document.getElementById(
        `class${classNum}t`
      ).innerHTML = `Survived in class #${classNum}`;

      // FARES

      const fares = filteredPassengers.map((passenger) => passenger.Fare);
      const averageFare = round(
        fares.reduce((a, b) => a + b, 0) / fares.length,
        2
      );
      const todayPounds = round((averageFare * 114.29), 1);
      document.getElementById(
        `class${classNum}f`
      ).innerHTML = `${averageFare}£ (${todayPounds}£ today)`;
      document.getElementById(
        `class${classNum}d`
      ).innerHTML = `Average fare in class #${classNum}`;
    });
  });

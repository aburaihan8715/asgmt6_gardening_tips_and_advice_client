const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const data = [{ numberOfPosts: 1, month: 2 }];

// Create userData by mapping through months
const userData = months.map((name, index) => {
  const found = data.find((d) => d.month === index + 1);
  return {
    name,
    user: found ? found.numberOfUsers : 0, // Default to 0 if no data exists
  };
});

console.log(userData);

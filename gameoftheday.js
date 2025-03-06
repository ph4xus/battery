fetch('/list.json')
  .then(response => response.json())
  .then(data => {
    const games = data.length;
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % games;
    console.log("Day of Year:", dayOfYear, "Index:", index);
  })
  .catch(error => console.error('Error:', error));

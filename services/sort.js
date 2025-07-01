// Sorting service to handle sorting logic
function sortData(data) {
    return data.sort((a, b) => {
       return a.createdAt < b.createdAt ? 1 : -1;
      
    });
  }
  
  module.exports = { sortData };
  
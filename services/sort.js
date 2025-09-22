// Sorting service to handle sorting logic
function sortData(jobData,pageNu) {
    const pageStart= (pageNu-1)*12
    const jobs= jobData.slice(pageStart,pageStart+12);
    return jobs;
  }
  
  export { sortData };
  
const filterById = (id) => {
  return (el) => el.id.includes(id);
};

const filterByYear = (year) => (e) => year == e.data.ano;

const genericFilter = (type, value) => (el) =>
  el.data[type.toLowerCase()].toLowerCase().includes(value.toLocaleLowerCase());

export const filterGifts = (filterType, filterValue) => {
  if (filterType == "ID") return filterById(filterValue);
  if (filterType == "Ano") return filterByYear(filterValue);
  return genericFilter(filterType, filterValue);
};

export const filterData = (data: any[], searchTerm: string) => {
  return data.filter((item: any) => {
    return (
      (item.name &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.client?.name &&
        item.client?.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
};

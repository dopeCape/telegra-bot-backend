function contains(list, item) {
  let x = false;
  list.forEach((i) => {
    if (i == item) {
      x = true;
    }
  });
  return x;
}

function remove(list, item) {
  let newList = list.filter((i) => {
    return i != item;
  });
  return newList;
}

export { contains, remove };

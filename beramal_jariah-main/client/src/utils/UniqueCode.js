function UniqueCode() {
  const first = Math.floor(Math.random() * 10);
  const second = Math.floor(Math.random() * 10);
  const third = Math.floor(Math.random() * 10);

  return `${first}${second}${third}`;
}

export default UniqueCode;

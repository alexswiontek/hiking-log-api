const sorting = type => {
  const [field, value] = type.split('_');

  return { [field]: value };
};

module.exports = sorting;

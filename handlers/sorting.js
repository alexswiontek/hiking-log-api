const sorting = type => {
  const [field, value] = type.split('_');

  if (!field || !value) {
    return {
      created: 'desc',
    };
  }

  return { [field]: value };
};

module.exports = sorting;

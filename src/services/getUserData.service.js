const getUserData = (req, res) => {
  const data = [
    { id: 1, name: "Azar", role: "boyfriend" },
    { id: 2, name: "Nishi", role: "girlfriend" },
    { id: 2, name: "Nishi", role: "girlfriend" },
  ];
  res.json(data);
};

module.exports = getUserData;

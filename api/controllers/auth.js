const { getUser, addUser, removeUser } = require('../storage/user');

exports.login = (req, res) => {
  const {name} = req.body;
  if(getUser(decodeURIComponent(name))) {
    return res.status().send({status: 'error', message: 'user already exists'});
  }
  addUser(decodeURIComponent(name));
  return res.send({status: 'success', message: 'User loged In'})
}

exports.logout = async (req, res) => {
  try {
    const {name} = req.params;
    const user = getUser(decodeURIComponent(name));
    if(!user) {
      return res.send({status: 'error', message: 'user aleady out'});
    }
    removeUser(decodeURIComponent(name));
    return res.send({status: 'success', message: 'User loged In'})
  } catch(err) {
    res.status(500).send({status: 'error', message: 'Server error'});
  }
}
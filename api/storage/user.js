const users = [];

exports.tokenize = (name) => {
  const normalized = name.trim().toLowerCase().replace(/[ _\-]+/, '');
  return normalized;
}

exports.getUser = (name) => {
  const token = this.tokenize(name);
  return users.find(user => user.token === token);
}

exports.addUser = (name) => {
  const token = this.tokenize(name)
  const user = users.find(user => user.token === token);
  if(!user) {
    users.push({token, name});
  } 
  return users;
}

exports.removeUser = (name) => {
  const token = this.tokenize(name);
  const idx = users.findIndex(user => user.token === token);
  users.splice(idx, 1);
  return users;
}

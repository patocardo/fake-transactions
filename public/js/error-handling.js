function getHTMLErrorMessage(resp) {
  if(['error', 'partial'].indexOf(resp.status) === -1) return '';
  if(resp.logs) console.error(resp.logs);
  const errMess = (resp.messages.length)
  ? '<ul><li>' + resp.messages.map(function(msg) {
    return msg.split('|').join('</li><li>');
  }).join('</li><li>') + '</li></ul>'
  : 'Error en servidor';
  return errMess;
}
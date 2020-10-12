function toastResult(mode, body) {
  if(mode === 'success') {
    $('#toast-title').text('¡Felicitaciones!');
    $('#toast-icon').attr('src', '/assets/check.svg');
    $('.toast-body').html('<p>Su registro se cargó con éxito en el sistema</p><hr>' +
      '<p> Por favor, <strong> ' + body + '</strong>' +
      '<p>Ingrese <a href="/users/login">a la pantalla de Ingreso</a> y opere el sistema</p>');
  } else {
    $('#toast-title').text('Error');
    $('#toast-icon').attr('src', '/assets/alert-octagon.svg');
    $('.toast-body').html('<p>Hubo problemas para cargar su registro en el sistema</p><hr>' +
      '<div>' + body + '</div>');
  }
  $('.toast').toast('show');
}
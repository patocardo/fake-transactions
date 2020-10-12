function insider(userName) {
  var name = encodeURIComponent(userName);
  // balance
  $('#balance-tab, #balanceReload').on('click', function() {
    $.ajax('/transactions-balance/' + name).then(function(response) {
      var lastT = resp.data.lastTransaction.length ? DateTime.fromISO(resp.data.lastTransaction) : ''
      $('#balanceTotal').html(resp.data.sum)
      $('#balanceCompleted').html(resp.data.completed)
      $('#balanceStarted').html(resp.data.inQueue)
      $('#balanceLast').html(lastT)
    }).catch(function(err) {
      toastResult('error', err.message);
    });
  });

  // history
  function modalDetails(id) {
    $.ajax('/transactions/' + this.id).then(function(resp) {
      var dateTime = resp.data.date ? luxon.DateTime.fromISO(resp.data.date) : '';
      $('#singleId').html(resp.data.id);
      $('#singleType').html(type);
      $('#singleAmount').html(resp.data.amount);
      $('#singleDate').html(dateTime);
      $('#singleState').html(resp.data.state);
      $('#historyModal').modal('show');
    }).catch(function(err) {
      toastResult('error', err.message);
    });
  }
  $('#history-tab, #historyReload').on('click', function() {
    $.ajax('/transactions/' + name).then(function(response) {
      $('#historyTable tbody').html(response.data.map(function(record) {
        return '<tr><td>' + record.type + '</td>' +
          '<td>' + record.amount + '</td>' +
          '<td><button class="btn btn-link history-detail" id="' + record.id + '">detail</button></td></tr>';
      }).join("\n"));
      $('.history-detail').on('click', function() {
        modalDetail(this.id);
      })

    }).catch(function(err) {
      toastResult('error', err.message);
    });
  });

  $('#postTransaction').on('submit', function() {
    $('#commitForm').trigger('reset');
    $.ajax({
      url: '/transactions',
      method: 'post',
      data: {
        name,
        type: $('input[name="commitType"]:checked').val(),
        amount: $('#commitAmount').val()
      }
    }).then(function(resp) {
      toastResult('success', 'Your Transaction was commited');
      $('#commitForm').trigger('reset');
    }).catch(function(err) {
      toastResult('error', err.message);
      $('#commitForm').trigger('reset');
    });
  })
}
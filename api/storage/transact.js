
const { v4 } = require('uuid') ;

// all atransactions array
const transactions = [];

// general queue object
const Queue = {
  waiting: [],
  /**
   * add the id and the subscriber callback to the end of the queue
   */
  addTransaction: (id, callback) => {
    Queue.waiting.push({id, callback});
    if(Queue.waiting.length === 1) {
      Queue.init();
    }
    return true;
  },
  /**
   * process the transaction and runs the callback that allows the subsriber continue
   */
  processTransaction: async(id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const transaction = transactions.find(trs => trs.id === id);
        if(!transaction) reject({error: 'transaction does not exists'})
        transaction.state = 'Completed';
        transaction.effectiveDate = new Date();
        const idx = Queue.waiting(op => op.id === id);
        const operation = Queue.waiting.splice(idx, 1);
        operation.callback(true);
        resolve(operation.id);
      }, 1500);
    })
  },
  init: async () => {
    while(Queue.waiting.length) {
      await processTransaction(Queue.waiting[0].id);
    };
    return true;
  }
};

/**
 * get all transactions of given user
 * @param {string} userToken 
 */
exports.getTransactions = (userToken) => {
  return transactions.filter(transaction => {
    return transaction.userToken === userToken;
  }).map(({id, type, amount, state, effectiveDate}) => ({
    id, type, amount, state, date: effectiveDate ? effectiveDate.toISOString() : ''
  }));
}

/**
 * get single transaction
 * @param {string} userToken 
 * @param {string} id 
 */
exports.getTransactionById = (userToken, id) => {
  const transaction = transactions.filter(transaction => {
    return transaction.userToken === userToken && transaction.id === id;
  });
  if(!transaction) return null;
  const {type, amount, effectiveDate} = transaction;
  return {type, amount, date: effectiveDate ? effectiveDate.toISOString() : ''}; 
}

/**
 * generate transaction and put it on the queue
 * @param {string} userToken 
 * @param {string} type 
 * @param {number} amount 
 */
exports.transact = async (userToken, type, amount) => {
  const currentAmount = this.getTansactions(username).reduce((sum, transaction) => {
    const amount = transaction.amount * (transaction.type === 'credit' ? 1 : -1);
    return sum + amount;
  }, 0);
  if(type === 'debit' && currentAmount < amount) {
    return {status: 'error', message: 'insufficient funds'};
  }
  const transaction = {
    id: v4(),
    userToken,
    type,
    amount,
    state: 'started',
    effectiveDate: null
  }
  transactions.push(transaction);
  return new Promise((resolve, reject) => {
    try {
      Queue.addTransaction(transaction.id, () => {
        resolve(transaction);
      })
    } catch(err) {
      reject(err);
    }
  });
}

/**
 * get a small report of user's current balance
 * @param {string} userToken 
 */
exports.getBalance = (userToken) => {
  return this.getTransactions(userToken).reduce((reducer, transaction) => {
    if(transaction.status === 'started') {
      reducer.inQueue++;
      return reducer;
    }
    if(reducer.last < transaction.effectiveDate) {
      reducer.last = transaction.effectiveDate;
    }
    reducer.completed ++;
    const amount = transaction.amount * (transaction.type === 'credit' ? 1 : -1);
    reducer.sum += amount;
    return reducer;
  }, {
    inQueue: 0,
    completed: 0,
    last: null,
    sum: 0
  })
}

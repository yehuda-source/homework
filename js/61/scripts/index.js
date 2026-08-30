//a
function bankAccount(startingBalance){ return {
    balance: startingBalance,
   performTransaction(amount){
    this.balance += amount;
   }
}
}
const acc1 = bankAccount(0);
acc1.performTransaction(100)
console.log(acc1.balance);
acc1.performTransaction(-10);
console.log(acc1.balance);

//b
function Transaction(amount){
    this.balance += amount;
}
const acc2 = bankAccount(0);
Transaction.call(acc2, 300);
console.log(acc2.balance);

//c
const depositFifty = Transaction.bind(acc2, 50);
depositFifty();
console.log(acc2.balance);
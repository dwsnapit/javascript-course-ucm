function isPrime(num) {
  var prime = true;
  for (var i = 2; i < num; i++) {
    if (num % i === 0) {
      prime = false;
    }
  }
  alert(prime);
}

self.onmessage = function(event) {
    const result = event.data * 2; // Exemplo de operação
    self.postMessage(result);
  };
  
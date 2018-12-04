class Client {
  on(event, handler) {
    this[event] = this[event] ? [...this[event], handler] : [handler];
  }
  emit(event) {
    const args = Array.prototype.slice.call(arguments, 1);
    this[event].forEach((handler) => handler(...args));
  }
}

const events = new Client();

events.on('app', (a, b) => console.log(a, b));
events.emit('app', 'app', 'bpp');
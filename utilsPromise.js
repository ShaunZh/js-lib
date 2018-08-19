class utilsPromise {
  constructor() {
    this.handlers = [];
    this.oncatch = null;
  }
  then(onSuccess, onError) {
    this.handler.push({
      resolve: onSuccess,
      reject: onError
    })
    return this;
  }
  catch (onfail) {
    this.oncatch = onfail;
    return this;
  }
  resolve(result) {
    this.complete('resolve', result);
  }
  reject(result) {
    this.complete('reject', result);
  }
  complete(type, result) {
    if (type === 'reject' && this.oncatch) {
      this.handlers = [];
      this.oncatch(result);
    } else if (type === 'resolve') {
      let handler = this.handlers.shift();
      if (handler[type]) handler[type](result);
    }
  }
}

export default utilsPromise;
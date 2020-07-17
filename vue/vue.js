const Observer = function(data) {
  for (let key in data) {
    defineReactive(data, key);
  }
}

const defineReactive = function(obj, key) {
  const dep = new Dep();
  let val = obj[key];
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('in get');
      dep.depend();
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      dep.notify();
    }
  });
}

const observe = function(data) {
  return new Observer(data);
}

const Vue = function(options) {
  console.log(JSON.stringify(options),"options");
  const self = this;
  if (options && typeof options.data === 'function') {
    this._data = options.data.apply(this);
  }

  this.mount = function() {
    console.log(self.render,"mount-self.render")
    new Watcher(self, self.render);
  }

  this.render = function() {
    with(self) {
      _data.text;
    }
  }

  observe(this._data);  
}

const Watcher = function(vm, fn) {
  const self = this;
  this.vm = vm;
  Dep.target = this;
  
  this.addDep = function(dep) {
    dep.addSub(self);
    
  }

  this.update = function() {
    console.log('in watcher update');
    fn();
  }

  this.value = fn();
  Dep.target = null;
}

const Dep = function() {
  const self = this;
  this.target = null;
  this.subs = [];
  this.depend = function() {
    if (Dep.target) {
      Dep.target.addDep(self);
    }
  }

  this.addSub = function(watcher) {
    
    self.subs.push(watcher);
  }

  this.notify = function() {
    for (let i = 0; i < self.subs.length; i += 1) {
      self.subs[i].update();
    }
  }
}

const vue = new Vue({
  data() {
    return {
      text: 'hello world'
    };
  }
})

vue.mount(); // in get
vue._data.text = '123'; // in watcher update /n in get





// 作者：JserWang
// 链接：https://juejin.im/post/5adf0085518825673123da9a
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
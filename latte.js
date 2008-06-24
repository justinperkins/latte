var Latte = Class.create({
  initialize: function(klass){
    var args = $A(arguments), options = {};
    if (typeof args[1] == 'string') options.expectations = $A([args[1]]);
    else options = args[1];
    this.options = Object.extend({
      expectations:$([])
    }, options || {});
    this.klass = klass;
    this.expects(this.options.expectations);
  },
  teardown: function(){
    this.invocations.each(function(invocation){
      this.klass.prototype[invocation.key] = invocation.unwrapped;
    }.bind(this));
  },
  expects: function(expectations){
    if (!this.invocations) this.invocations = $H();

    if (typeof expectations == 'string') expectations = $A([expectations]);
    expectations.each(function(toInvoke){
      this.invocations.set(toInvoke, { invoked:false, unwrapped:Prototype.emptyFunction });
      this._wrap(toInvoke);
    }.bind(this));
  },
  wasInvoked: function(method){ return this.invocations.get(method).invoked; },
  notInvoked: function(method){ return !this.wasInvoked(method); },
  reset: function(method){ this.invocations.get(method).invoked = false; },
  _wrap: function(method){
    this.invocations.get(method).unwrapped = this.klass.prototype[method];
    this.klass.prototype[method] = this.klass.prototype[method].wrap(function(){
      var args = $A(arguments), latte = args.shift(), toInvoke = args.shift(), proceed = args.shift();
      latte.invocations.get(toInvoke).invoked = true;
      proceed.apply(this, args);
    }.curry(this, method));
  },
});
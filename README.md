# Latte: A mocking library for JavaScript

Latte is a really simple class to aid in detecting whether methods are invoked or not when you call other methods on a given object.

Download the repo and run example.html to see it in action, written for UnitTest (scriptaculous testing library).

Say you have a class:

    var Barista = Class.create({
      initialize:function(){},
      makeCoffee:function(){
        this.askForSugar();
      },
      askForSugar: function(){}
    })

And you want to verify that when you call the `Barista#makeCoffee` method, the `Barista#askForSugar` method should be called.

You include [latte.js](http://github.com/justinperkins/latte/blob/master/latte.js) in your page and then you write something like this:

    var mock = new Latte(Barista, 'askForSugar');
    var b = new Barista();
    console.log('Barista#askForSugar not invoked yet, right?' + mock.notInvoked('askForSugar'));
    b.makeCoffee();
    console.log('Barista#askForSugar was invoked now, right? ' + mock.wasInvoked('askForSugar'));

Written to depend on [prototype](http://prototypejs.org)

The name Latte is a homage to [Mocha](http://mocha.rubyforge.org/), a really great mocking and stubbing library for Ruby.

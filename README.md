# `StructureJS`

A class based utility library for building modular and scalable web platform applications. Features opt-in classes and utilities which provide a solid foundation and toolset to build your next project.

## Documentation
* [Overview Video](http://www.codebelt.com/javascript/StructureJS_web.mp4)
* [YUI Docs](http://codebelt.github.io/StructureJS/docs/)

## Install
    $ bower install --save structurejs

## IDE Snippets
* [Webstorm JS](https://github.com/ccheney/StructureJS/tree/master/ide-snippets/webstorm/js)
* [Webstorm TS](https://github.com/ccheney/StructureJS/tree/master/ide-snippets/webstorm/ts)
* [Sublime](https://github.com/ccheney/StructureJS/tree/master/ide-snippets/sublimetext)
* [Atom](https://github.com/ccheney/StructureJS/tree/master/ide-snippets/atom)

## Boilerplate
[StructureJS-Boilerplate](https://github.com/codeBelt/StructureJS-Boilerplate)

## Examples
* Event Bubbling [Demo](http://codebelt.github.io/StructureJS/examples/EventBubbling/src/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/EventBubbling)
* Movie Collection [Demo](http://codebelt.github.io/StructureJS/examples/MovieCollection/src/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/MovieCollection)
* Single Page Application [Demo](http://codebelt.github.io/StructureJS/examples/SinglePageWebsite/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/SinglePageWebsite)
* TodoMVC [Demo](http://codebelt.github.io/StructureJS/examples/TodoMVC/web/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/TodoMVC)
* Simon Game [Demo](http://codebelt.github.io/StructureJS/examples/SimonGame/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/SimonGame)

## Core Classes

### `Stage`

A base application class for your project. `Stage` allows you to set DOM references for your application to control.

```js
var App = (function () {

	var _super = Extend (App, DOMElement);

	function App () {
		_super.call(this);

        this._fooBarView = null;
	}

	App.prototype.create = function () {
		_super.prototype.create.call(this);

		// single instance of a component
        var $fooBar = this.$element.find('#js-fooBar');
		this._fooBarView = new FooBarView($fooBar);
		this.addChild(this._fooBarView);

		// multiple instances of a component
		this.createComponents([
			{ selector: '.js-foo', componentClass: FooView },
			{ selector: '.js-bar', componentClass: BarView }
		]);
	};

	return App;
}
```

[Example `Stage` Class](https://github.com/codeBelt/StructureJS/blob/master/examples/MovieCollection/src/assets/scripts/MovieCollectionApp.js)

[Read more about `Stage`](http://codebelt.github.io/StructureJS/docs/classes/Stage.html)

### `DOMElement`

A base view class for objects that control the DOM. Your View classes will extend this `DOMElement` class.

```js
var ExampleView = (function () {

	var _super = Extend (ExampleView, DOMElement);

	function ExampleView () {
		_super.call(this);
	}

    ExampleView.prototype.create = function () {
		_super.prototype.create.call(this);
	};

	return ExampleView;
}
```

`DOMElement` provides helper methods and adds the following lifecycle to your class, these methods get called in this order:
* `create()`
* `enable()`
* `layout()`

```js
var ExampleView = (function () {

	var _super = Extend (ExampleView, DOMElement);

	function ExampleView () {
		_super.call(this);
        // setup properties here
	}

	MenuView.prototype.create = function () {
		_super.prototype.create.call(this);
        // Create or setup objects in this parent class.
	};

	MenuView.prototype.enable = function () {
		if (this.isEnabled === true) { return this; }
        // Enable the child objects and/or add any event listeners.
		return _super.prototype.enable.call(this);
	};

    MenuView.prototype.disable = function () {
        if (this.isEnabled === false) { return this; }
        // Disable the child objects and/or remove any event listeners.
        return _super.prototype.disable.call(this);
	};

	MenuView.prototype.layout = function () {
        // Layout or update the objects in this parent class.
		return this;
	};

    MenuView.prototype.destroy = function () {
        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.
        _super.prototype.destroy.call(this);
	};

	return ExampleView;
}
```

[Example `DOMElement` View](https://github.com/codeBelt/StructureJS/blob/master/examples/MovieCollection/src/assets/scripts/view/ListView.js)

[Read more about `DOMElement`](http://codebelt.github.io/StructureJS/docs/classes/DOMElement.html)

### `EventDispatcher`

A base event bus class for managing prioritized queues of event listeners and dispatched events.

```js
this.dispatchEvent('change');

// Send data object with the event:
this.dispatchEvent('change', { some: 'data' });

// Example with an event object
// (event type, bubbling set to true, cancelable set to true and passing data)
var event = new BaseEvent(BaseEvent.CHANGE, true, true, { some: 'data' });
this.dispatchEvent(event);

// Dispatching an inline event object
this.dispatchEvent(new BaseEvent(BaseEvent.CHANGE));
```

[Read more about `EventDispatcher`](http://codebelt.github.io/StructureJS/docs/classes/EventDispatcher.html)

[Read more about `BaseEvent`](http://codebelt.github.io/StructureJS/docs/classes/BaseEvent.html)



### `EventBroker`

A pub/sub static class for dispatching and listening for events.

```js
EventBroker.addEventListener('change', this._handlerMethod, this);

// Using a constant event type
EventBroker.addEventListener(BaseEvent.CHANGE, this._handlerMethod, this);

// Event passed to the method will always be a BaseEvent object.
ClassName.prototype._handlerMethod = function (event) {
     console.log(event);
}
```

[Read more about `EventBroker`](http://codebelt.github.io/StructureJS/docs/classes/EventBroker.html)

[Read more about `BaseEvent`](http://codebelt.github.io/StructureJS/docs/classes/BaseEvent.html)


### `Router`

A static class for managing route patterns for single page applications.

* {required}
* :optional:
* \* (all)

```js
// A route listener with an event handler
Router.add('/games/{gameName}/:level:/', this._onRouteHandler, this);
Router.start();

// The above route would match the string below:
// '/games/asteroids/2/'

// The Call back receives a RouterEvent object.
ExampleClass.prototype._onRouteHandler = function (routerEvent) {
    console.log(routerEvent.params);
}
```
[Example `Router`](https://github.com/codeBelt/StructureJS/blob/master/examples/SinglePageWebsite/assets/scripts/view/RootView.js)

[Read more about `Router`](http://codebelt.github.io/StructureJS/docs/classes/Router.html)

[Read more about `Route`](http://codebelt.github.io/StructureJS/docs/classes/Route.html)

[Read more about `RouteEvent`](http://codebelt.github.io/StructureJS/docs/classes/RouterEvent.html)

### `jQueryEventListener`

Similar to the `.on()` & `.off()` jQuery methods, this plugin allows you to bind your function calls and assign them to a property on the class avoiding something like setupHandlers or bindAll methods.

* eventType
* delegation (optional)
* eventHandler
* scope

```js
Class.prototype.enable = function () {
    this._$element.addEventListener('click', this._onClickHandler, this);
    // event delegation
    this._$element.addEventListener('click', 'button', this._onClickHandler, this);
};

Class.prototype.disable = function () {
    this._$element.removeEventListener('click', this._onClickHandler, this);
    this._$element.removeEventListener('click', 'button', this._onClickHandler, this);
};

Class.prototype._onClickHandler = function (event) {
    console.log('click', event);
};
```

[Read more about `jQueryEventListener`](https://github.com/codeBelt/jquery-eventListener)

## Release History

 * 2015-05-12 v0.7.1 DOMElement have createComponents return the list of children it created. Fix small bugs. Update comments. Add some unit tests.
 
 * 2015-04-26 v0.7.0 Breaking changes: Rename createChildren to create. Rename layoutChildren to layout. Create DisplayObject class and have DisplayObjectContainer extend it. Add Canvas specific classes. Rename namespace StructureTS to StructureJS in TypeScript files. Change namespace from structurejs to StructureJS in JavaScript classes. Rename folder src to js.

 * 2015-04-15 v0.6.17 Previous version before I started doing this release history.

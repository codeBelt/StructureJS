# `StructureJS`
[![Dependency Status](https://david-dm.org/codeBelt/StructureJS.svg)](https://david-dm.org/codeBelt/StructureJS)
[![devDependency Status](https://david-dm.org/codeBelt/StructureJS/dev-status.svg)](https://david-dm.org/codeBelt/StructureJS#info=devDependencies)

A class based utility library for building modular and scalable web platform applications. Features opt-in classes and utilities which provide a solid foundation and toolset to build your next project.

## Documentation
* [Overview Video](http://www.codebelt.com/javascript/StructureJS_web.mp4)
* [YUI Docs](http://codebelt.github.io/StructureJS/docs/)

## Install
    $ bower install --save structurejs

## Core Classes

### `Stage`

A base application class for your project. `Stage` allows you to set DOM references for your application to control.

```js
var App = (function () {

	var _super = Extend (App, DOMElement);

	function App () {
		_super.call(this);
	}

	App.prototype.create = function () {
		_super.prototype.create.call(this);

		// instance
		this._fooBarView = new FooBarView('#js-fooBar');
		this.addChild(this._fooBarView);

		// instances
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

	return ExampleView;
}
```

`DOMElement` provides helper methods and adds the following lifecycle to your class:
* `create()`
* `enable()`
* `layout()`

```js
var ExampleView = (function () {

	var _super = Extend (ExampleView, DOMElement);

	function ExampleView () {
		_super.call(this);
	}

	MenuView.prototype.create = function () {
		_super.prototype.create.call(this);
	};

	MenuView.prototype.enable = function () {
		if (this.isEnabled) { return; }

		return _super.prototype.enable.call(this);
	};

	MenuView.prototype.layout = function () {
		return this;
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
EventBroker.addEventListener('change', this.handlerMethod, this);

// Using a constant event type
EventBroker.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);

// Event passed to the method will always be a BaseEvent object.
ClassName.prototype.handlerMethod = function (event) {
     console.log(event.data);
}
```

[Read more about `EventBroker`](http://codebelt.github.io/StructureJS/docs/classes/DOMElement.html)

[Read more about `BaseEvent`](http://codebelt.github.io/StructureJS/docs/classes/BaseEvent.html)


### `Router`

A static class for managing route patterns for single page applications.

* {required}
* :optional:
* \* (all)

```js
// A route listener with an event handler
Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);
Router.start();

// The above route would match the string below:
// '/games/asteroids/2/'
```
[Example `Router`](https://github.com/codeBelt/StructureJS/blob/master/examples/SinglePageWebsite/assets/scripts/view/RootView.js)

[Read more about `Router`](http://codebelt.github.io/StructureJS/docs/classes/Router.html)

[Read more about `Route`](http://codebelt.github.io/StructureJS/docs/classes/Route.html)

[Read more about `RouteEvent`](http://codebelt.github.io/StructureJS/docs/classes/RouterEvent.html)

### `jQueryEventListener`

A jQuery plugin that allows you to bind your function calls and assign them to a property on the class avoiding something like setupHandlers or bindAll methods.

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

Class.prototype._onClickHandler = function () {
    console.log('click');
};
```

[Read more about `jQueryEventListener`](https://github.com/codeBelt/jquery-eventListener)

## Release History

 * 2015-04-26 v0.7.0 Breaking changes: Rename createChildren to create. Rename layoutChildren to layout. Create DisplayObject class and have DisplayObjectContainer extend it. Add Canvas specific classes. Rename namespace StructureTS to StructureJS in TypeScript files. Change namespace from structurejs to StructureJS in JavaScript classes. Rename folder src to js.

 * 2015-04-15 v0.6.17 Previous version before I started doing this release history.

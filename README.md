# `StructureJS`

A class based utility library for building modular and scalable web platform applications. Features opt-in classes and utilities which provide a solid foundation and tool set to build your next project.

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

	App.prototype.createChildren = function () {
		_super.prototype.createChildren.call(this);

		this.createComponents([
			{ selector: '.js-foo', componentClass: FooView },
			{ selector: '.js-bar', componentClass: BarView }
		]);
	};

	return App;
}
```

[Example `Stage` Class](https://github.com/codeBelt/StructureJS/blob/master/examples/MovieCollection/src/assets/scripts/MovieCollectionApp.js)

[Read more about `DOMElement`](http://codebelt.github.io/StructureJS/docs/classes/DOMElement.html)

### `DOMElement`

A base view class for all objects that can be placed into the DOM. All of your View classes will extend the `DOMelement` class.

```js
var ExampleView = (function () {

	var _super = Extend (ExampleView, DOMElement);

	function ExampleView () {
		_super.call(this);
	}

	return ExampleView;
}
```

`DOMElement` provides several helper methods and adds the following lifecycle to your class:
* `create()`
* `layout()`
* `enable()`

```js
var ExampleView = (function () {

	var _super = Extend (ExampleView, DOMElement);

	function ExampleView () {
		_super.call(this);
	}

	MenuView.prototype.create = function () {
		_super.prototype.create.call(this);
	};

	MenuView.prototype.layout = function () {
	};

	MenuView.prototype.enable = function () {
		return _super.prototype.enable.call(this);
	};

	return ExampleView;
}
```

[Example `DOMElement` View](https://github.com/codeBelt/StructureJS/blob/master/examples/MovieCollection/src/assets/scripts/view/ListView.js)

[Read more about `DOMElement`](http://codebelt.github.io/StructureJS/docs/classes/DOMElement.html)

* ___Stage___
	* The Stage class is what your main application class will extend. This class extends the DOMElement class and the only difference you will notice is it has an appendTo method. This allows us to use an id name, class name or tag name to have a reference point where your code will control DOM elements with in the referenced area.

* ___EventDispatcher___
	* The EventDispatcher class is the base class for all classes that need to dispatch events. For example if you wanted to create a Controller class, you would extend EventDispatcher. The DOMElement class extends EventDispatcher which allows events to bubble throughout the display list.

* ___EventBroker___
	* EventBroker is a simple publish and subscribe static class that you can use to fire and receive notifications. Loosely coupled event handling, the subscriber does not have to know the publisher. Both of them only need to know the event type. Basically the EventBroker class is a static version of the EventDispatcher class.

* ___BaseEvent___
	* Whenever you want to create a Event Class you should extend BaseEvent.


* ___ValueObject___
	* Value Object (VO) is a design pattern used to transfer data between software application subsystems.

* ___Extend___
	* The Extend class is a utility class that will allow you easily to extend other classes.

* ___Router___
    * The Router class is a hash routing class.


* ___eventListener jQuery Plugin___
	* There are two methods to the plugin ```addEventListener``` and ```removeEventListener```. These two methods allow you to pass in the scope of the class so you do not need to bind your function call(s) and assign them to a property on the class.
	* To learn more about the eventListener jQuery plugin check out [https://github.com/codeBelt/jquery-eventListener](https://github.com/codeBelt/jquery-eventListener)
	*

#### Editor/IDE Snippets:
[WebStorm](//github.com/codeBelt/StructureJS/tree/master/ide-snippets/webstorm)
[Sublime Text](//github.com/codeBelt/StructureJS/tree/master/ide-snippets/sublimetext)
[Atom](//github.com/codeBelt/StructureJS/tree/master/ide-snippets/atom)

####Examples:
[Event Bubbling Example](http://codebelt.github.io/StructureJS/examples/EventBubbling/src/)

[SinglePageWebsite with the Router class](http://codebelt.github.io/StructureJS/examples/SinglePageWebsite/)

##Add StructureJS to Your Project

If you are using RequireJS all you have to do is:

Add the path to the **config.js** file:

```
require.config({
    paths: {
        ...
        structurejs: '../vendor/structurejs/src',
        ...
    },
    shim: {...}
});
```

Example if you wanted to import the **EventBroker** class to use:

```
var EventBroker = require('structurejs/event/EventBroker');
```

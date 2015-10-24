# `StructureJS`

A class based utility library for building modular and scalable web platform applications. Features opt-in classes and utilities which provide a solid foundation and toolset to build your next project.

## Documentation
* [Documentation](http://codebelt.github.io/StructureJS/docs/)
* [Overview Video](http://www.codebelt.com/javascript/StructureJS_web.mp4)

## Install
    $ bower install --save structurejs

## IDE Snippets
* [Webstorm JS](https://github.com/codebelt/StructureJS/tree/master/ide-snippets/webstorm/js)
* [Webstorm TS](https://github.com/codebelt/StructureJS/tree/master/ide-snippets/webstorm/ts)
* [Sublime](https://github.com/codebelt/StructureJS/tree/master/ide-snippets/sublimetext)
* [Atom](https://github.com/codebelt/StructureJS/tree/master/ide-snippets/atom)

## Boilerplate
[StructureJS Boilerplate (RequireJS)](https://github.com/codeBelt/StructureJS-Boilerplate/tree/requirejs)

[StructureJS Boilerplate (Browserify)](https://github.com/codeBelt/StructureJS-Boilerplate/tree/browserify)

[StructureJS Boilerplate (TypeScript)](https://github.com/codeBelt/StructureJS-Boilerplate/tree/typescript-commonjs)

[StructureJS Boilerplate (Babel ES6)](https://github.com/codeBelt/StructureJS-Boilerplate/tree/babel)

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
import FooView from 'views/FooView';
import BarView from 'views/BarView';
import FooBarView from 'views/FooBarView';

class App extends Stage {

    _fooBarView = null;

    constructor() {
        super()
    }

    create() {
        super.create();

        // single instance of a component
        let $fooBar = this.$element.find('#js-fooBar');
		this._fooBarView = new FooBarView($fooBar);
		this.addChild(this._fooBarView);

		// multiple instances of a component
		this.createComponents([
			{ selector: '.js-foo', component: FooView },
			{ selector: '.js-bar', component: BarView }
		]);
    }

}

export default App;
```

[Example `Stage` Class](https://github.com/codeBelt/StructureJS/blob/master/examples/MovieCollection/src/assets/scripts/MovieCollectionApp.js)

[Read more about `Stage`](http://codebelt.github.io/StructureJS/docs/classes/Stage.html)

### `DOMElement`

A base view class for objects that control the DOM. Your View classes will extend this `DOMElement` class.

```js
class ExampleView extends DOMElement {

    constructor() {
        super();
    }

    create() {
        super.create();
    }

}

export default ExampleView;
```

`DOMElement` provides helper methods and adds the following lifecycle to your class, these methods get called in this order:
* `create()`
* `enable()`
* `layout()`

```js
class ExampleView extends DOMElement {

    constructor() {
        super();
    }

    create() {
        super.create();
        // Create or setup objects in this parent class.
    }

    enable() {
        if (this.isEnabled === true) { return this; }
        // Enable the child objects and/or add any event listeners.
        return super.enable();
    }

    disable() {
        if (this.isEnabled === false) { return this; }
        // Disable the child objects and/or remove any event listeners.
        return super.disable();
    }

    layout() {
        // Layout or update the objects in this parent class.
        return this;
    }
    
    destroy() {
        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.
        super.destroy();
    }

}

export default ExampleView;
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
// (event type, bubbling set to true, cancelable set to true, and passing data)
let event = new BaseEvent(BaseEvent.CHANGE, true, true, { some: 'data' });
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
_handlerMethod(event) {
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
_onRouteHandler(routerEvent) {
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
enable() {
    if (this.isEnabled === true) { return this; }

    this._$element.addEventListener('click', this._onClickHandler, this);
    this._$element.addEventListener('click', 'button', this._onClickHandler, this); // event delegation

    return super.enable();
}

disable() {
    if (this.isEnabled === false) { return this; }

    this._$element.removeEventListener('click', this._onClickHandler, this);
    this._$element.removeEventListener('click', 'button', this._onClickHandler, this);

    return super.disable();
}

_onClickHandler(event) {
    console.log('click', event);
}
```

[Read more about `jQueryEventListener`](https://github.com/codeBelt/jquery-eventListener)

## Release History

 * 2015-10-24 v0.9.0 Remove unnecessary classes. DisplayObject - rename update to renderCanvas. Util - add applyMixins static method. Updated BulkLoader and created BulkLoaderEvent. Update interface files.

 * 2015-10-03 v0.8.0 Rename ValueObject to BaseModel and update all classes using it. Added addEventListenerOnce to EventDispatcher and EventBroker. Fixed Collection assign it a type in the constructor causes issues if data was already that type.

 * 2015-09-04 v0.7.9 Remove Util.getClassName, Util.getFunctionName and add Util.getName. Fix issue with getQualifiedClassName now working when code was uglified (Now need to have mangle set as false). Remove jQuery dependency from TemplateFactory. Change private methods and properties to protected.

 * 2015-08-22 v0.7.8 Fix issue with disable not being called when the destroy method is called on a DisplayObject. Add import for DisplayObjectContainer on CanvasElement. Allow ComponentFactory.create to be called multiple times with the same selector names and not overwrite active components. Update addClientSideId and add removeClientSideId. Add BulkLoader, ImageLoader ...

 * 2015-07-20 v0.7.7 Fixed ValueObject - Allow data passed in that is an array to get assigned to the property even if it is not of type of an array. Fix for phone number validation.

 * 2015-06-23 v0.7.6 DOMElement createComponents rename componentClass to component.

 * 2015-06-18 v0.7.5 Add groupBy method on Collection. Change ValidationUtil.isPostalCode to be case insensitive.

 * 2015-06-10 v0.7.4 Add pluck method to Collection. Move removeChild destroy functionality from DisplayObjectContainer to DOMElement.

 * 2015-05-26 v0.7.3 Corrects string replacement on getBreakpoint

 * 2015-05-21 v0.7.2 Add showHours flag to NumberUtil.convertToHHMMSS to display as 00:05:23 or 05:23

 * 2015-05-12 v0.7.1 DOMElement have createComponents return the list of children it created. Fix small bugs. Update comments. Add some unit tests.

 * 2015-04-26 v0.7.0 Breaking changes: Rename createChildren to create. Rename layoutChildren to layout. Create DisplayObject class and have DisplayObjectContainer extend it. Add Canvas specific classes. Rename namespace StructureTS to StructureJS in TypeScript files. Change namespace from structurejs to StructureJS in JavaScript classes. Rename folder src to js.

 * 2015-04-15 v0.6.17 Previous version before I started doing this release history.

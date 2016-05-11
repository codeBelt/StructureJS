# `StructureJS`

A class based utility library for building modular and scalable web platform applications. Features opt-in classes and utilities which provide a solid foundation and toolset to build your next project.

## Documentation
* [Documentation](http://codebelt.github.io/StructureJS/docs/)

## Install

With [Node.js](http://nodejs.org):

    $ npm install structure-js

With [Bower](http://bower.io):

    $ bower install structurejs
    
## IDE Snippets
* [Webstorm JS](https://github.com/codebelt/StructureJS/tree/master/ide-snippets/webstorm/js)
* [Webstorm TS](https://github.com/codebelt/StructureJS/tree/master/ide-snippets/webstorm/ts)
* [Sublime](https://github.com/codebelt/StructureJS/tree/master/ide-snippets/sublimetext)
* [Atom](https://github.com/codebelt/StructureJS/tree/master/ide-snippets/atom)

## Boilerplate
[StructureJS Boilerplate (Babel - ES6)](https://github.com/codeBelt/StructureJS-Boilerplate/tree/babel)

[StructureJS Boilerplate (TypeScript - ES6 Modules)](https://github.com/codeBelt/StructureJS-Boilerplate/tree/typescript-es6)

[StructureJS Boilerplate (TypeScript - CommonJS Modules)](https://github.com/codeBelt/StructureJS-Boilerplate/tree/typescript-commonjs)

[StructureJS Boilerplate (Browserify - ES5)](https://github.com/codeBelt/StructureJS-Boilerplate/tree/browserify)

[StructureJS Boilerplate (RequireJS - ES5)](https://github.com/codeBelt/StructureJS-Boilerplate/tree/requirejs)



## Examples
* Event Bubbling [Demo](http://codebelt.github.io/StructureJS/examples/EventBubbling/web/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/EventBubbling)
* Movie Collection [Demo](http://codebelt.github.io/StructureJS/examples/MovieCollection/web/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/MovieCollection)
* Single Page Application [Demo](http://codebelt.github.io/StructureJS/examples/SinglePageWebsite/web/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/SinglePageWebsite)
* TodoMVC [Demo](http://codebelt.github.io/StructureJS/examples/TodoMVC/web/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/TodoMVC)
* Simon Game [Demo](http://codebelt.github.io/StructureJS/examples/SimonGame/web/) [Code](https://github.com/codeBelt/StructureJS/tree/master/examples/SimonGame)

## Core Classes

### `DOMElement`

All view classes will extend the `DOMElement` class. Here is an example how you would setup your main applicaiton class.

```js
import FooView from './views/FooView';
import BarView from './views/BarView';
import ExampleView from './views/ExampleView';

class App extends DOMElement {

    _exampleView = null;

    constructor() {
        super()
    }

    create() {
        super.create();

        // single instance of a component
        const $exampleView = this.$element.find('#js-ExampleView');
        
		this._exampleView = new ExampleView($exampleView);
		this.addChild(this._exampleView);

		// multiple instances of a component
		this.createComponents([
			{ selector: '.js-FooView', component: FooView },
			{ selector: '.js-BarView', component: BarView }
		]);
    }

}

export default App;
```

To start the application you would use ```appendTo``` method on the main application class to attach it to the DOM. Only use ```appendTo``` once per application. After that you will use the ```addChild``` methed for child views like in the above example. Example of using ```appendTo```:


```js
const app = new App();
app.appendTo('body');
```


`DOMElement` provides helper methods and adds the following lifecycle to your class, these methods get called in this order:
* `create()`
* `enable()`
* `layout()`

```js
class ExampleView extends DOMElement {

    constructor($element) {
        super($element);
    }

    create() {
        super.create();
        // Create or setup child objects in this parent class.
    }

    enable() {
        if (this.isEnabled === true) { return; }
        // Add any event listeners and/or enable the child objects.
        super.enable();
    }

    disable() {
        if (this.isEnabled === false) { return; }
        // Remove any event listeners and/or disable the child objects.
        super.disable();
    }

    layout() {
        // Layout or update the objects in this parent class.
    }
    
    destroy() {
        this.disable();
        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.
        super.destroy();
    }

}

export default ExampleView;
```

[Example `DOMElement` View](https://github.com/codeBelt/StructureJS/blob/master/examples/MovieCollection/src/assets/scripts/views/ListView.js)

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
    if (this.isEnabled === true) { return; }

    this.$element.addEventListener('click', this._onClickHandler, this);
    this.$element.addEventListener('click', 'button', this._onClickHandler, this); // event delegation

    super.enable();
}

disable() {
    if (this.isEnabled === false) { return; }

    this.$element.removeEventListener('click', this._onClickHandler, this);
    this.$element.removeEventListener('click', 'button', this._onClickHandler, this);

    super.disable();
}

_onClickHandler(event) {
    console.log('click', event);
}
```

[Read more about `jQueryEventListener`](https://github.com/codeBelt/jquery-eventListener)

## Release History

 * 2016-05-11 v0.12.3 Remove jquery import and make it global for the eventListener plugin..
 
 * 2016-05-11 v0.12.2 Allow passing of arguments to the layout method. Fix Router.getCurrentRoute being null right after callback.
 
 * 2016-04-23 v0.12.0 Deprecated Stage class and the appendTo method. Copied the appendTo method to the DOMElement class.
 
 * 2016-02-29 v0.11.1 Update Router.buildRoute to turn an object passed in to query string.
 
 * 2016-02-06 v0.11.0 Prevent Collection.add from allowing null and undefined. Remove onEnabled and onDisabled methods.
 
 * 2016-01-22 v0.10.5 Change examples and IDE snippets back to the show the enable and disable way rather than the onEnabled or onDisabled way.
 
 * 2016-01-19 v0.10.4 Add maxConnections to BulkLoader to set the maximum number of simultaneous connections.
 
 * 2016-01-06 v0.10.3 Add onEnabled and onDisabled methods. Removed enable and disable methods from Examples and IDE Snippets.
 
 * 2015-12-30 v0.10.2 Publishing to NPM https://www.npmjs.com/package/structure-js
 
 * 2015-12-30 v0.10.1 EventDispatcher - Fix currentTarget when event is bubbling. Update IDE Snippets.
 
 * 2015-12-21 v0.10.0 Change TypeScript from CommonJS to ES6 modules.
 
 * 2015-12-20 v0.9.3 Add third optional parameter to EventBroker so you can pass the scope of the object that dispatched the event. Update EventDispatcher to always update the currentTarget property. Add EventBroker.waitFor, EventBroker.waitForOnce, EventBroker.removeWaitFor. Collection.get() remove clamping if index is out of bounds.
 
 * 2015-12-05 v0.9.2 Allow a custom indicator with StringUtil.truncate(). Update ide-snippets. Made the start method private in NetworkMonitor.
 
 * 2015-11-25 v0.9.1 Add Router.getCurrentRoute, Add Util.unique, Fix BrowserUtil.getBrowser and make public. Update docs to ES6/Typescript. Rename all private and protected method to have an underscore in front.
 
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

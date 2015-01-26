---
layout: module
title: Localized Event Dispatching with EventDispatcher
---

**EventDispatcher** is a publish and subscribe class that your classes can extend to dispatch and receive events. This class is different than the <a href="https://js.nerderylabs.com/blog/global-event-dispatcher-with-eventbroker/" target="_blank">EventBroker</a> class because you are adding event listeners directly on the classes you create and the listener does know who is dispatching the event.

**EventDispatcher** supports event bubbling and event delegation within a class structure. I will talk more about this when I post about the **<a href="http://codebelt.github.io/StructureJS/docs/classes/DOMElement.html" target="_blank">DOMElement</a>** class.

#####How to extend EventDispatcher and dispatch an event:

```
// Imports
var EventDispatcher = require('structurejs/event/EventDispatcher');

function ClassName() {
    EventDispatcher.call(this);
}

ClassName.prototype = new EventDispatcher();
ClassName.prototype.constructor = ClassName;

ClassName.prototype.init = function() {
    this.dispatchEvent('test'); // Example of dispatching an event.
    this.dispatchEvent('test', {some: 'data'}); // Example of dispatching an event with data.
};
```

#####Adding event listeners:

```
// Creating a class and adding an event listener to it:
this._className = new ClassName();
this._className.addEventListener('test', this.handlerMethod, this);
this._className.init(); // We dispatch an event.

// The event passed to the method will always be a BaseEvent object.
AnotherClass.prototype.handlerMethod = function (baseEvent) {
    console.log(baseEvent.target + ' sent the event.');
    console.log(baseEvent.type, baseEvent.data);
};
```

#####Remove event listeners:

```
this._className.removeEventListener('test', this.handlerMethod, this);
```

#####Has event listeners:

```
this._className.hasEventListener('change', this.handlerMethod, this);
// Returns true or false
```

#####Get a list of added listeners:

```
 this._className.getEventListeners();
 // [ClassName] is listen for 'BaseEvent.change' event.
```

#####Dispatching an event with event bubbling:
Event bubbling works with the **DOMElement** class which I will talk about later. For now want to show how you would set it up. You will need to create a **<a href='http://codebelt.github.io/StructureJS/docs/classes/BaseEvent.html' target='_blank'>BaseEvent</a>** object and then dispatch it.
```
// BaseEvent( type,  [bubbles=false],  [cancelable=false],  [data=null] )
var event = new BaseEvent('change', true, true, {some: 'data'});
this.dispatchEvent(event);
```

**Here is another example of how to extend the class and <a href="https://js.nerderylabs.com/blog/how-to-write-javascript-classes/" target="_blank">How I Write JavaScript Classes</a>:**

```
// Imports
var Extend = require('structurejs/util/Extend');
var EventDispatcher = require('structurejs/event/EventDispatcher');

var ClassName = (function () {

    var _super = Extend(ClassName, EventDispatcher);

    function ClassName() {
        _super.call(this);
    }

    ClassName.prototype.init = function() {
        this.dispatchEvent('test')
    };

    return ClassName;
})();
```

#####EventBus Pattern
You can create an **EventDispatcher** object and pass it around to other classes.

```
 var eventDispatcher = new EventDispatcher();
 eventDispatcher.addEventListener('change', this.handlerMethod, this);
 eventDispatcher.dispatchEvent('change');
```

**Checkout the full docs for <a href='http://codebelt.github.io/StructureJS/docs/classes/EventDispatcher.html' target='_blank'>EventDispatcher</a>**.

The **EventDispatcher** class is a module of a JavaScript/TypeScript library called StructureJS. Take a look at it here: <a href='https://github.com/codeBelt/StructureJS' target='_blank'>StructureJS</a>.

##Add EventDispatcher to Your Project

If you are using the Client-Side Boilerplate all you have to do is:

```
bower install structurejs
```

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

Import the **EventDispatcher** class into the class you want to use it in:

```
var EventDispatcher = require('structurejs/event/EventDispatcher');
```

<div class="row" style="margin-top:40px;">
    <div class="col-sm-12">
        <a href="global-event-dispatching-with-eventBroker.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i>Previous</a>
    </div>
</div>
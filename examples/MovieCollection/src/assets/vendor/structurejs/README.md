#StructureJS

A workflow and several core class to help structure and build JavaScript applications.

####WebStorm & Sublime Text Templates/Snippets:
[WebStorm & Sublime Text Templates/Snippets](https://github.com/codeBelt/StructureJS/tree/master/ide-snippets)

####Examples:
[Event Bubbling Example](http://codebelt.github.io/StructureJS/examples/EventBubbling/src/)

[SinglePageWebsite with the Router class](http://codebelt.github.io/StructureJS/examples/SinglePageWebsite/)

####Documentation:
[Docs](http://codebelt.github.io/StructureJS/docs/)

####Video:
[StructureJS Overview](http://www.codebelt.com/javascript/StructureJS_web.mp4)


###Core Classes
* ___DOMElement___
	* All your view classes will extend the DOMElement class and all your views will have the following lifecycle: createChilderen, layoutChildren, enable, disable and distroy. The DOMElement has several convenient methods (addChild, addChildAt, removeChild, getChild, etc.) to provide a structured base for your view classes. Within your views you will be able to listen and dispatch class based events. This is because DOMElement extends the EventDispacter class and your views will support event bubbling, stopPropagation and stopImmediatePropagation.		
	
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
	
##Add StructureJS to Your Project

If you are using RequireJS all you have to do is:

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

Example if you wanted to import the **EventBroker** class to use:

```
var EventBroker = require('structurejs/event/EventBroker');
```

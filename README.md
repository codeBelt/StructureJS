##StructureJS (ReadMe In Progress)

#####WebStorm & Sublime Text Templates/Snippets
[https://gist.github.com/codeBelt/9166803](https://gist.github.com/codeBelt/9166803)

####Core Classes
* ___DOMElement___
	* All your view classes will extend the DOMElement class and all your views will have the following lifecycle: createChilderen, layoutChildren, enable, disable and distroy. The DOMElement has several convenient methods (addChild, addChildAt, removeChild, getChild, etc.) to provide a structured base for your view classes. Within your views you will be able to listen and dispatch class based events. This is because DOMElement extends the EventDispacter class and your views will support event bubbling, stopPropagation and stopImmediatePropagation.
	
* ___Stage___
	* The Stage class is what your main application class will extend. This class extends the DOMElement class and the only difference you will notice is it has an appendTo method. This allows us to use an id name, class name or tag name where we would 
	
* ___EventDispatcher___
	* The EventDispatcher class is the base class for all classes that need to dispatch events. For example if you wanted to create a Controller class you would extend EventDispatcher. The DOMElement class extends EventDispatcher which allows events to bubble throughout the display list. 
	
* ___EventBroker___
	* EventBroker is a simple publish and subscribe static class that you can use to fire and receive notifications. Loosely coupled event handling, the subscriber does not have to know the publisher. Both of them only need to know the event type. Basically the EventBroker class is a static version of the EventDispatcher class.
	
```
// Dispatching an event globally.
var event = new BaseEvent(BaseEvent.CHANGE);
EventBroker.dispatchEvent(event);


// Listening for a global event.
EventBroker.addEventListener(BaseEvent.CHANGE, this.handlerMethod, this);

ExampleView.prototype.handlerMethod(event) {
    console.log("Hey");
}
```

* ___BaseEvent___
	* DOMElement extends EventDispatcher
	
```
//BaseEvent(type:string, bubbles:boolean=false, cancelable:boolean=false, data:*=null)
var event = new BaseEvent(BaseEvent.CHANGE, true, false, {data: "any data type"});
this.dispatchEvent(event);
```

* ___ValueObject___
	* Value Object (VO) is a design pattern used to transfer data between software application subsystems.
	
___eventListener jQuery Plugin___ - 



Core Class:

DOMElement

All your view will extend DOMElement.Now let me show how our views should work. All of our views with have createChilderen, layoutChildren, enable, disable and distroy.  Where you can do addChild, addChildAt, removeChild and there are serval other convenient methods. This allows us to have event bubbling. One thing I should not is the DOMElement extends EventDispatcher. This allows us to listen and dispatch event with in our views. More on EventDispatcher later. Lets create a view. The eventListener plugin….

If we look at the markup you will notice all view have a CID and that gets added to the html element. This can help with debugging and/or be useful in the way an object need to be retrieved. Just a not all the core classes get a CID.

So we saw how our views show work. Now lets briefly talk about the EventDispacther class and the BaseObject. First the EventDispacther can be used to create your Controller or Model classes that need to dispatch events. 

When ever you want to create a Event Class you should extend BaseEvent .

Lastly lets talk about the ValueObject class and when you would like to extend it.


```
define(function (require, exports, module) {
    'use strict';

    // Imports
    var Extend = require('nerdery/util/Extend');
    var DOMElement = require('nerdery/display/DOMElement');

    /**
     * YUIDoc_comment
     *
     * @class ExampleView
     * @extends DOMElement
     * @constructor
     **/
    var ExampleView = (function () {

        var _super = Extend(ExampleView, DOMElement);

        function ExampleView() {
            _super.call(this);

            /**
             * @overridden DOMElement.CLASS_NAME
             */
            this.CLASS_NAME = 'ExampleView';

        }

        /**
         * @overridden DOMElement.createChildren
         */
        ExampleView.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);

            // Create and add your child objects to this parent class.
        }

        /**
         * @overridden DOMElement.layoutChildren
         */
        ExampleView.prototype.layoutChildren = function () {
            // Layout or update the child objects in this parent class.

            return this;
        }

        /**
         * @overridden DOMElement.enable
         */
        ExampleView.prototype.enable = function () {
            if (this.isEnabled === true) return this;

            // Enable the child objects and add any event listeners.

            return _super.prototype.enable.call(this);
        }

        /**
         * @overridden DOMElement.disable
         */
        ExampleView.prototype.disable = function () {
            if (this.isEnabled === false) return this;

            // Disable the child objects and remove any event listeners.

            return _super.prototype.disable.call(this);
        }

        /**
         * @overridden DOMElement.destroy
         */
        ExampleView.prototype.destroy = function () {
            _super.prototype.destroy.call(this);

            // Destroy the child objects and references in this parent class to prevent memory leaks.
        }

        return ExampleView;
    })();

    module.exports = ExampleView;

});
```

```
	<script>
    	window.onload = function(event) {
			var app = new MainClass();
			app.appendTo('body');
		}
	</script>
```
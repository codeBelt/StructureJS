##StructureJS

A workflow and several core class to help structure and build JavaScript applications.

#####WebStorm & Sublime Text Templates/Snippets:
[WebStorm & Sublime Text Templates/Snippets](https://gist.github.com/codeBelt/9166803)

#####Example:
[Examples](http://codebelt.github.io/StructureJS/src/)

#####Documentation:
[Docs](http://codebelt.github.io/StructureJS/docs/)

#####Video:
[StructureJS Overview](http://www.codebelt.com/javascript/StructureJS_web.mp4)


####Core Classes
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
	* The Extend class is a utiliy class that will allow you easily to extend other classes.
	
* ___Router___
    * The Router class is a hash routing class.
	
	
* ___eventListener jQuery Plugin___
	* There are two methods to the plugin ```addEventListener``` and ```removeEventListener```. These two methods allow you to pass in the scope of the class so you do not need to bind your function call(s) and assign them to a property on the class. 
	* To learn more about the eventListener jQuery plugin check out [https://github.com/codeBelt/jquery-eventListener](https://github.com/codeBelt/jquery-eventListener)
	
###Router
___Methods:___

**Router.add( routePattern, callback, callbackScope );**

* **routePatter** The string pattern you want to have match, which can be any of the following combinations. When a match is found the callback will be executed and an ```RouteEvent``` sent as a parameter.
      
   	* **:optional:** The two colons means a part of the hash url is optional for the match. The text between can be anything you want it to be.
   	
		```
		Router.add('/contact/:name:/', this.method, this);
		
		// www.site.com/#/contact/
   		// www.site.com/#/contact/heather/
   		// www.site.com/#/contact/john/
		```
  	 		
   	* **{required}** The two curly brackets means a part of the hash url is required for the match. The text between can be anything you want it to be.
   	
		```
		Router.add('/product/{productName}/', this.method, this);
		
   		// www.site.com/#/product/shoes/
   		// www.site.com/#/product/jackets/
		```
  	 		
   	* **\*** The asterix character means it will match all or part of part the hash url.
   	
		```
		Router.add('*', this.method, this);
		
   		// www.site.com/#/anything/
   		// www.site.com/#/matches/any/hash/url/
   		// www.site.com/#/really/it/matches/any/and/all/hash/urls/
		```
   	* **?** The question mark character means it will match a query string for the hash url.
   	
		```
		Router.add('?', this.method, this);
		
   		// www.site.com/#/?one=1&two=2&three=3
   		// www.site.com/#?one=1&two=2&three=3
		```
   	* **''** The empty string means it will match when there are no hash url.
   	
		```
		Router.add('', this.method, this);
		Router.add('/', this.method, this);
		
   		// www.site.com/
   		// www.site.com/#/
		```
		
   	* Other possible combinations
   	
		```
		Router.add('/games/{gameName}/:level:/', this.method1, this);
		Router.add('/{category}/blog/', this.method2, this);
		Router.add('/home/?', this.method3, this);
		Router.add('/about/*', this.method4, this);
		```
		
 * **callback** The function that should be executed when a request matches the Route pattern. 
 * **callbackScope** The the scope of th callback function that should be executed.      
      	

**Router.remove( routePattern, callback, callbackScope );**

* **routePatter** Must be the same string pattern you pasted into the ```Router.add``` method.
* **callback** Must be the same function you pasted into the ```Router.add``` method.
* **callbackScope** Must be the same scope off the callback pattern you pasted into the ```Router.add``` method.

```
Router.add('/games/{gameName}/:level:/', this.onRouteHandler, this);

Router.remove('/games/{gameName}/:level:/', this.onRouteHandler, this);
```

**Router.start();**

The ```Router.start``` method is ment to trigger or check the hash url on page load. Either you can call this method after you add all your routers or after all data is loaded. It is recommend you only call this once per page or application instantiation. 

```
// Example of adding routes and calling the start method.

Router.add('/games/{gameName}/:level:/', this.method1, this);
Router.add('/{category}/blog/', this.method2, this);

Router.start();
```

**Router.addDefault( callback, callbackScope );**

The ```Router.addDefault``` method is ment to trigger a callback function if there are no route matches are found.

```
Router.addDefault(this.noRoutesFoundHandler, this);
```

**Router.navigateTo( route, silent );**

The ```Router.navigateTo``` method allows you to change the hash url and to trigger a route that matches the string value. The second parameter is **silent** and is ```false``` by default. This allows you to update the hash url without causing a route callback to be executed. 

```
// This will update the hash url and triiger the mathcing route.
Router.navigateTo('/games/matching/2/');

// This will update the hash url but will not triiger the mathcing route.
Router.navigateTo('/games/matching/2/', true);
```

**Router.removeDefault();**

The ```Router.removeDefault``` method will remove the default callback that was added by the ```Router.addDefault``` method.

```
Router.removeDefault();
```

**Router.enable();**

The ```Router.enable``` method will allow the Router class to listen for the hashchange event. By defualt the Router class is enalbed.

```
Router.enable();
```

**Router.disable();**

The ```Router.disable``` method will stop the Router class from listening for the hashchange event.

```
Router.disable();
```

**Router.destroy();**

The ```Router.destroy``` method will null out all references in the Router class.

```
Router.destroy();
```
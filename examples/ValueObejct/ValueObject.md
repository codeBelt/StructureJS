**ValueObject** 


https://js.nerderylabs.com/best-practices/model-objects-in-javascript/
https://js.nerderylabs.com/best-practices/collection-objects-in-javascript/






is a static class that I wrote which you can use to create deep linking or single page applications. Here is an example of a <a href="http://codebelt.github.io/StructureJS/examples/SinglePageWebsite/" target="_blank">single page website</a>. You can download the example files <a href="https://github.com/codeBelt/StructureJS/tree/master/examples/SinglePageWebsite" target="_black">here</a>.

To add a route:

```
Router.add(routePattern, callback, callbackScope);
```

Do the following if you need a function called when the site url is:

 **www.site.com/#/about/**
```
ClassName.prototype.enable = function () {
    ...
    Router.add('/about/', this.onAboutRoute, this);
};

// The onAboutRoute method triggers and receives a RouteEvent object.
ClassName.prototype.onAboutRoute = function (routeEvent) {
    console.log(routeEvent);
}
```
When a route triggers a **<a href="http://codebelt.github.io/StructureJS/docs/classes/RouteEvent.html" target="_blank">RouteEvent</a>** gets passed to the handler.

To make routes flexible I have implemented three conventions. The route pattern can contain any of the following combinations: `{}` or `::` or `*`

Here are some route pattern examples:
```
Router.add('/games/{gameName}/:level:/', this.method1, this);
Router.add('/{category}/blog/', this.method2, this);
Router.add('/about/*', this.method3, this);

Router.start();
```
The **Router.start()** method triggers or checks the hash url on page load.



##Route Patterns Explained:

**/:optional:/** The two colons **::** means a part of the hash url is optional for the match. The text between can be anything you want.
```
Router.add('/contact/:name:/', this.method, this);

// Will match one of the following:
// www.site.com/#/contact/
// www.site.com/#/contact/heather/
// www.site.com/#/contact/john/
```
**/{required}/** The two curly brackets **{}** indicates this part of the hash is required. The text between can be anything you want.
```
Router.add('/product/{productName}/', this.method, this);

// Will match one of the following:
// www.site.com/#/product/shoes/
// www.site.com/#/product/jackets/
// But will not match
// www.site.com/#/product/
```

**\*** The asterisk character means it will match all or part of the hash url.
```
Router.add('*', this.method, this);

// Will match one of the following:
// www.site.com/#/anything/
// www.site.com/#/matches/any/hash/url/
// www.site.com/#/really/it/matches/any/and/all/hash/urls/

Router.add('/products/*', this.method, this);
// Will match one of the following:
// www.site.com/#/products/one/two/three/
// www.site.com/#/products/one/two/three/four/five/six/
```

**''** The empty string will match when there are no hash url's.
```
Router.add('', this.method, this);
Router.add('/', this.method, this);

// Will match one of the following:
// www.site.com/
// www.site.com/#/
```

##Other Useful Things

**If you add a query string to your hash url Router will parse that string automatically and pass it as an object within the RouteEvent:**
```
// www.site.com/#/contact?name=robert&email=email@email.com&message=Robert is so cool

Router.add('contact', this.method, this);

ClassName.prototype.method = function (routeEvent) {
    console.log(routeEvent.query);
}

// You would log out the following object:
{
    email: 'email@email.com',
    message: 'Robert is so cool.',
    name: 'robert'
}
```

**Programmatically trigger a route:**
```
// This will update the hash url and trigger the matching route.
Router.navigateTo('/games/asteroids/2/');

// This will update the hash url but will not trigger the matching route.
Router.navigateTo('/games/asteroids/2/', true);

// This will not update the hash url but will trigger the matching route.
Router.navigateTo('/games/asteroids/2/', true, true);
```

**Router.useDeepLinking:**

If you set ```Router.useDeepLinking = false;``` and use the ```Router.navigateTo``` method the hash url will not change. This can be useful if you're making an application but don't want the user to know how to jump to other sections directly. Check out the <a href="http://codebelt.github.io/StructureJS/examples/SinglePageWebsite/" target="_blank">single page website</a> for an example and click on the footer links to see what I am talking about.

**Checkout the full docs for <a href='http://codebelt.github.io/StructureJS/docs/classes/Router.html' target='_blank'>Router</a>**.

The **Router** class is a module of a JavaScript/TypeScript library called StructureJS. Take a look at it here: <a href='https://github.com/codeBelt/StructureJS' target='_blank'>StructureJS</a>.

##Add Router to Your Project

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

Import the **Router** class into the class you want to use it in:

```
var Router = require('structurejs/controller/Router');
```

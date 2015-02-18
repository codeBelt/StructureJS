---
layout: module
title: Global Event Dispatching with EventBroker
---

**EventBroker** is a static publish and subscribe class I wrote that you can use to dispatch and receive events. The listener does not know who dispatched the event but both of them need to know the event type.

#####Dispatch event:

```
EventBroker.dispatchEvent('change');
```

#####Dispatch event with data:

```
var data = {some: 'data'}
EventBroker.dispatchEvent('change', data);
```

#####Add event listener:
```
EventBroker.addEventListener('change', this.handlerMethod, this);
```

```
ClassName.prototype.enable = function () {
    EventBroker.addEventListener('change', this.handlerMethod, this);
};

// The event passed to the method will always be a BaseEvent object.
ClassName.prototype.handlerMethod = function (baseEvent) {
     console.log(baseEvent.type, baseEvent.data);
}
```
Your handler method will always receive a **<a href="./docs/classes/BaseEvent.html" target="_blank">BaseEvent</a>** object.

#####Remove event listener:

```
EventBroker.removeEventListener('change', this.handlerMethod, this);
```

#####Has event listener:

```
EventBroker.hasEventListener('change', this.handlerMethod, this);
// Returns true or false
```

#####Get a list of added listeners:

```
 EventBroker.getEventListeners();
 // [ClassName] is listen for 'BaseEvent.change' event.
```

**Checkout the full docs for <a href='./docs/classes/EventBroker.html' target='_blank'>EventBroker</a>**.

The **EventBroker** class is a module of a JavaScript/TypeScript library called StructureJS. Take a look at it here: <a href='https://github.com/codeBelt/StructureJS' target='_blank'>StructureJS</a>.

<div class="row" style="margin-top:40px;">
    <div class="col-sm-12">
        <a href="single-page-application-with-router.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i>Previous</a>
        <a href="localized-event-dispatching-with-eventdispatcher.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
    </div>
</div>
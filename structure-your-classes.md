---
layout: module
title: How To Structure Your Classes
---

Here is the recommended way to create JavaScript classes and how to use the Extend class to inherit other classes.

 The following is a condensed example of the current format I use to structure my classes in JavaScript.

```
var BaseView = (function () {

    function BaseView() {
    }

    BaseView.prototype.create = function () {
    };

    BaseView.prototype.layout = function () {
    };

    return BaseView;
})();
```

##Inheritance
Below is an example of how to use theextend the class above.

```
var AnotherView = (function () {

    var _super = Extend(AnotherView, BaseView);

    function AnotherView() {
        _super.call(this);
    }

    AnotherView.prototype.create = function () {
        _super.prototype.create.call(this);
    };

    AnotherView.prototype.layout = function () {
    };

    return AnotherView;
})();
```

The format is constant with the the **BaseView** above but now we have this `_super` thing in our class. What `_super` allows you to do is call the functions/methods on the class you extended.

If you look at **Extend** in `var _super = Extend(AnotherView, BaseView);` it is a helper function that allows you to extend other classes easily. It will take the first class (AnotherView) and extend it with the second class (BaseView).

<div class="row" style="margin-top:40px;">
    <div class="col-sm-12">
        <a href="add-structurejs.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i>Previous</a>
        <a href="single-page-application-with-router.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
    </div>
</div>
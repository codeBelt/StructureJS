---
layout: module
title: Add StructureJS to Your Project
---

##Download
If you want to download the latest [Click Here](https://github.com/codeBelt/StructureJS)

##Globally
```
bower install structurejs
```

```
<script src="bower_components/structurejs/src/util/Extend.js"></script>
```

Example if you wanted to import the **Extend** and **Router** classes to use:

```
var EventBroker = window.structurejs.Extend;
var Router = window.structurejs.Router;
```

##RequireJS

```
bower install structurejs
```

Add the path to the **config.js** file:

```
require.config({
    paths: {
        ...
        structurejs: '../bower_components/structurejs/src',
        ...
    },
    shim: {...}
});
```

Example if you wanted to import the **EventBroker** class to use:

```
var EventBroker = require('structurejs/event/EventBroker');
```

##Browserify
If you are using RequireJS all you have to do is:

```
bower install structurejs
```

Example if you wanted to import the **Router** class to use:

```
var Router = require('../bower_components/structurejs/src/controller/Router');
```

<!--
> You can pick and chose what modules you want to included included into your project. StructureJS doesn't have minified.
-->


<div class="row" style="margin-top:40px;">
    <div class="col-sm-12">
        <a href="/" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i>Home</a>
        <a href="structure-your-classes.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
    </div>
</div>
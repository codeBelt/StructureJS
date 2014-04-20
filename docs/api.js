YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "BaseEvent",
        "BaseObject",
        "DOMElement",
        "DisplayObjectContainer",
        "EventBroker",
        "EventDispatcher",
        "Stage",
        "StringUtil",
        "TemplateFactory",
        "Timer",
        "TimerEvent",
        "Util",
        "ValueObject"
    ],
    "modules": [
        "StructureJS",
        "core",
        "event",
        "model",
        "util",
        "view"
    ],
    "allModules": [
        {
            "displayName": "core",
            "name": "core",
            "description": "The {{#crossLink \"BaseObject\"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all  classes."
        },
        {
            "displayName": "event",
            "name": "event",
            "description": "<p>The {{#crossLink \"BaseEvent\"}}{{/crossLink}} class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.</p>\n\n<p>The properties of the {{#crossLink \"BaseEvent\"}}{{/crossLink}} class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.\nFor many events, such as the events represented by the Event class constants, this basic information is sufficient. Other events, however, may require more\ndetailed information.</p>"
        },
        {
            "displayName": "model",
            "name": "model",
            "description": "Value Object (VO) is a design pattern used to transfer data between software application subsystems."
        },
        {
            "displayName": "StructureJS",
            "name": "StructureJS"
        },
        {
            "displayName": "util",
            "name": "util",
            "description": "The StringUtil..."
        },
        {
            "displayName": "view",
            "name": "view",
            "description": "The {{#crossLink \"DOMElement\"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM."
        }
    ]
} };
});
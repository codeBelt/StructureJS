YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "BaseEvent",
        "BaseObject",
        "BrowserUtil",
        "BulkLoader",
        "Collection",
        "ComponentFactory",
        "DOMElement",
        "DataStoreAbstract",
        "DateUtil",
        "DisplayObjectContainer",
        "EventBroker",
        "EventDispatcher",
        "JsonDataStore",
        "LoaderEvent",
        "LocalStorageController",
        "LocalStorageEvent",
        "MathUtil",
        "MerchantUtil",
        "MobileUtil",
        "NumberUtil",
        "ObjectManager",
        "Route",
        "RouteEvent",
        "Router",
        "Stage",
        "StringUtil",
        "TemplateFactory",
        "Timer",
        "TimerEvent",
        "URLContentType",
        "URLLoader",
        "URLLoaderDataFormat",
        "URLRequest",
        "URLRequestMethod",
        "Util",
        "ValidationUtil",
        "ValueObject"
    ],
    "modules": [
        "StructureJS",
        "StructureTS",
        "controller",
        "core",
        "event",
        "model",
        "net",
        "util",
        "view"
    ],
    "allModules": [
        {
            "displayName": "controller",
            "name": "controller",
            "description": "The LocalStorageController..."
        },
        {
            "displayName": "core",
            "name": "core",
            "description": "The {{#crossLink \"BaseObject\"}}{{/crossLink}} class is an abstract class that provides common properties and functionality for all StructureJS classes."
        },
        {
            "displayName": "event",
            "name": "event",
            "description": "The {{#crossLink \"BaseEvent\"}}{{/crossLink}} class is used as the base class for the creation of Event objects, which are passed as parameters to event listeners when an event occurs.\n\nThe properties of the {{#crossLink \"BaseEvent\"}}{{/crossLink}} class carry basic information about an event, such as the event's type or whether the event's default behavior can be canceled.\n\nFor many events, such as the events represented by the Event class constants, this basic information is sufficient. Other events, however, may require more\ndetailed information."
        },
        {
            "displayName": "model",
            "name": "model",
            "description": "The DataStoreAbstract..."
        },
        {
            "displayName": "net",
            "name": "net",
            "description": "The URLContentType..."
        },
        {
            "displayName": "StructureJS",
            "name": "StructureJS"
        },
        {
            "displayName": "StructureTS",
            "name": "StructureTS"
        },
        {
            "displayName": "util",
            "name": "util",
            "description": "The BrowserUtil..."
        },
        {
            "displayName": "view",
            "name": "view",
            "description": "The {{#crossLink \"DOMElement\"}}{{/crossLink}} class is the base view class for all objects that can be placed into the HTML DOM."
        }
    ]
} };
});
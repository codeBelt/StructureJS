'use strict';

// For NPM https://www.npmjs.com/package/structure-js

module.exports = {

    // Core
    BaseObject: require('./js/BaseObject').default,
    ObjectManager: require('./js/ObjectManager').default,

    // Services
    ApplicationCacheService: require('./js/service/ApplicationCacheService').default,
    LocalStorageService: require('./js/service/LocalStorageService').default,
    Router: require('./js/service/Router').default,

    // Display
    DisplayObject: require('./js/display/DisplayObject').default,
    DisplayObjectContainer: require('./js/display/DisplayObjectContainer').default,

    // Event
    ApplicationCacheEvent: require('./js/event/ApplicationCacheEvent').default,
    BaseEvent: require('./js/event/BaseEvent').default,
    EventBroker: require('./js/event/EventBroker').default,
    EventDispatcher: require('./js/event/EventDispatcher').default,
    LocalStorageEvent: require('./js/event/LocalStorageEvent').default,
    NetworkMonitorEvent: require('./js/event/NetworkMonitorEvent').default,
    RouterEvent: require('./js/event/RouterEvent').default,
    TimerEvent: require('./js/event/TimerEvent').default,
    NavigatorEvents: require('./js/event/native/NavigatorEvents').default,

    // GEOM
    Point: require('./js/geom/Point').default,

    // Model
    BaseModel: require('./js/model/BaseModel').default,
    Collection: require('./js/model/Collection').default,
    Route: require('./js/model/Route').default,

    // NET
    NetworkMonitor: require('./js/net/NetworkMonitor').default,

    // UTIL
    ComponentFactory: require('./js/util/ComponentFactory').default,
    DateUtil: require('./js/util/DateUtil').default,
    MathUtil: require('./js/util/MathUtil').default,
    MerchantUtil: require('./js/util/MerchantUtil').default,
    NumberUtil: require('./js/util/NumberUtil').default,
    StringUtil: require('./js/util/StringUtil').default,
    TemplateFactory: require('./js/util/TemplateFactory').default,
    Timer: require('./js/util/Timer').default,
    Util: require('./js/util/Util').default,
    ValidationUtil: require('./js/util/ValidationUtil').default

};

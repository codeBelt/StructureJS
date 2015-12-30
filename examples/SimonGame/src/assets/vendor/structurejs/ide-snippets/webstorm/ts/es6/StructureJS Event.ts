import BaseEvent from '../vendor/structurejs/ts/event/BaseEvent';

/**
 * TODO: YUIDoc_comment
 *
 * @class ${NAME}
 * @extends BaseEvent
 * @constructor
 **/
class ${NAME} extends BaseEvent {

    /**
     * This is an example of an event type.
     * Go ahead and rename or remove this.
     *
     * @event EXAMPLE
     * @type {string}
     * @static
     */
    static EXAMPLE:string = '${NAME}.example';

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null) {
        super(type, bubbles, cancelable, data);
    }

}

export default ${NAME};
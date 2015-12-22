import BaseEvent from '../vendor/structurejs/ts/event/BaseEvent';

/**
 * TODO: YUIDoc_comment
 *
 * @class ${NAME}
 * @extends BaseEvent
 * @constructor
 **/
class ${NAME} extends BaseEvent {

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null) {
        super(type, bubbles, cancelable, data);
    }

}

export default ${NAME};
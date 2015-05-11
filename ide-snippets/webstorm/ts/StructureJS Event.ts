///<reference path='replace/path/structurejs/ts/event/BaseEvent.ts'/>

module ${Namespace} {

    import BaseEvent = StructureJS.BaseEvent;

    /**
     * TODO: YUIDoc_comment
     *
     * @class ${NAME}
     * @extends BaseEvent
     * @module ${Namespace}
     * @constructor
     **/
    export class ${NAME} extends BaseEvent {

        constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null) {
            super(type, bubbles, cancelable, data);
        }

    }
}
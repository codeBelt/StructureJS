import BaseModel = require('BaseModel');

class StatusModel extends BaseModel
{
    /**
     * TODO: YUIDoc_comment
     *
     * @property ERROR
     * @type {string}
     * @public
     */
    public static ERROR:string = 'error';

    /**
     * TODO: YUIDoc_comment
     *
     * @property SUCCESS
     * @type {string}
     * @public
     */
    public static SUCCESS:string = 'success';

    public status:string = null;
    public message:string = null;
    public code:number = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @class StatusModel
     * @param [data] {any} Provide a way to update the  Base Model upon initialization.
     * @extends BaseModel
     * @module StructureJS
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     */
    constructor(data:any = null)
    {
        super();

        if (data)
        {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    public update(data:any):void
    {
        super.update(data);

        // Override any values after the default super update method has set the values.
    }

}

export = StatusModel;
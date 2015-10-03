import BaseModel = require('BaseModel');

class LanguageConfigModel extends BaseModel
{
    public id:string;
    public lang:string;
    public text:string;
    public path:string;

    /**
     * TODO: YUIDoc_comment
     *
     * @class LanguageConfigModel
     * @param [data] {any} Provide a way to update the  Base Model upon initialization.
     * @constructor
     * @author Robert S. (www.codeBelt.com)
     * @module StructureJS
     * @version 0.1.0
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
    public update(data:any):any
    {
        super.update(data);

        // Override any values after the default super update method has set the values.

        return this;
    }

}

export = LanguageConfigModel;
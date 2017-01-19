import IDataStore from '../interface/IDataStore';
import EventDispatcher from '../event/EventDispatcher';
/**
 * The ImageLoader...
 *
 * @class ImageLoader
 * @extends EventDispatcher
 * @module StructureJS
 * @submodule util
 * @constructor
 * @author Robert S. (www.codeBelt.com)
 */
declare class ImageLoader extends EventDispatcher implements IDataStore {
    protected _image: HTMLImageElement;
    data: any;
    src: string;
    complete: boolean;
    constructor(path: string);
    protected _init(): void;
    load(): void;
    protected _onImageLoad(): void;
}
export default ImageLoader;

import DisplayObject from './DisplayObject';
declare class Bitmap extends DisplayObject {
    protected _image: HTMLImageElement;
    ready: boolean;
    constructor(image: HTMLImageElement);
    create(): void;
    layout(): void;
}
export default Bitmap;

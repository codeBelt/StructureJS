import DisplayObject from './DisplayObject';
declare class TextField extends DisplayObject {
    text: string;
    style: string;
    font: string;
    size: string;
    color: string;
    lineHeight: number;
    constructor();
    create(): void;
    layout(): void;
    protected _wrapTextByWidth(context: any, text: any, x: any, y: any, maxWidth: any, lineHeight: any): void;
    protected _wrapTextOnLineBreak(context: any, text: any, x: any, y: any, lineHeight: any): void;
}
export default TextField;

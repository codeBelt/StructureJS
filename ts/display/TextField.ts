///<reference path='DisplayObject.ts'/>
///<reference path='../util/NumberUtil.ts'/>

module StructureJS {

    export class TextField extends DisplayObject {

        public text:string = '';
        public style:string = 'normal';
        public font:string = 'Verdana';
        public size:string = '14px';
        public color:string = '#000000';
        public lineHeight:number = 14;

        constructor() {
            super();
        }

        public create():void {
            super.create();
        }

        public layout():void {
            this.ctx.translate(this.parent.x, this.parent.y);
            this.ctx.translate(this.x, this.y);
            this.ctx.font = [this.style, this.size, this.font].join(' ');
            this.ctx.fillStyle = this.color;
            this.ctx.textBaseline = 'top';//http://www.ckollars.org/canvas-text-centering.html

            if (this.text.indexOf('\n') !== -1) {
                this.wrapTextOnLineBreak(this.ctx, this.text, 0, 0, this.lineHeight);
            }
            else if (this.width > 0) {
                this.wrapTextByWidth(this.ctx, this.text, 0, 0, this.width, this.lineHeight);
            }
            else {
                this.ctx.fillText(this.text, 0, 0);
            }
        }

        protected wrapTextByWidth(context, text, x, y, maxWidth, lineHeight):void {
            var wordList:Array<string> = text.split(' ');
            var line:string = '';
            var testLine:string;
            var metrics:{width: number};
            var testWidth:number;
            var length:number = wordList.length;

            for (var i:number = 0; i < length; i++) {
                testLine = line + wordList[i] + ' ';
                metrics = context.measureText(testLine);
                testWidth = metrics.width;

                if (testWidth > maxWidth && i > 0) {
                    context.fillText(line, x, y);
                    line = wordList[i] + ' ';
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }

            context.fillText(line, x, y);
        }

        protected wrapTextOnLineBreak(context, text, x, y, lineHeight):void {
            var wordList:Array<string> = text.split('\n');
            var length:number = wordList.length;

            for (var i:number = 0; i < length; i++) {
                context.fillText(wordList[i], x, y);

                y += lineHeight;
            }
        }

    }
}
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGlassCard]'
})
export class GlassCardDirective {

  @Input() hex:string = "#FFFFFF";

  element!:ElementRef;
  constructor(private render:Renderer2, private elementRef:ElementRef) {}

  ngOnChanges(){
    this.element = this.elementRef.nativeElement;
    const colors:number[] = this.getRGB();
    this.render.setStyle(this.element , 'background', `rgba(${colors[0]},${colors[1]},${colors[2]},0.1)`);
    this.render.setStyle(this.element, 'box-shadow','0 0 4px 0 rgba(0,0,0,30%)');
    this.render.setStyle(this.element, 'border', '1px transparent');
    this.render.setStyle(this.element, 'backdrop-filter', 'blur(30px)');
    this.render.setStyle(this.element, '-webkit-backdrop-filter', 'blur(30px)');
    this.render.setStyle(this.element,'border-radius','8px');
    this.render.setStyle(this.element, 'padding','2rem');
  }

  getRGB():number[]{
    const r:number = parseInt(this.hex.substring(1,3),16);
    const g:number = parseInt(this.hex.substring(3,5),16);
    const b:number = parseInt(this.hex.substring(5,7),16);
    return [r,g,b];
  }

}

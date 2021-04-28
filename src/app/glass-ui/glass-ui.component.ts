import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { faCopy, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-glass-ui',
  templateUrl: './glass-ui.component.html',
  styleUrls: ['./glass-ui.component.scss']
})
export class GlassUIComponent implements AfterViewInit {

  faCopy = faCopy;
  faCheckCircle = faCheckCircle;
  title = 'playground';
  heightinput: number = 20;
  widthinput: number = 25;
  blurinput: number = 16;
  borderinput:number = 0;
  borderradius: number = 12;
  colorinput: string = "#FFFFFF";
  opacityinput: number = 10;
  addBackgroundActive: boolean = false;
  bgImages: string[] = [
    "assets/pawel-czerwinski-JEV7CrJTUNE-unsplash.jpg",
    "assets/pawel-czerwinski-yn97LNy0bao-unsplash.jpg",
    "assets/pawel-czerwinski-UF4SrDnu8ns-unsplash.jpg",
  ];
  cssCodeActive: boolean = false;
  cssCode!: string;
  copied: boolean = false;
  colorHover: string = "rgba(255,255,255,0.3)";
  colorNonHover: string = "rgba(255,255,255,0.1)";
  hover: boolean = false;

  glass!: ElementRef;

  @ViewChild('glassbox') glassbox!: ElementRef;
  @ViewChild('wrapperDiv') wrapperDiv!: ElementRef;
  @ViewChild('actionButton') actionButton!: ElementRef;
  @ViewChild('codeactions') codeActions !: ElementRef;

  constructor(private renderer: Renderer2, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.glass = this.glassbox.nativeElement;
  }

  changeHeight(): void {
    this.renderer.setStyle(this.glass, 'height', `${this.heightinput}em`);
  }

  changeWidth(): void {
    this.renderer.setStyle(this.glass, 'width', `${this.widthinput}em`);
    this.renderer.setStyle(this.actionButton.nativeElement, 'width', `${this.widthinput}em`);
  }

  changeBlur(): void {
    this.renderer.setStyle(this.glass, 'backdrop-filter', `blur(${this.blurinput}px)`);
    this.renderer.setStyle(this.actionButton.nativeElement, 'backdrop-filter', `blur(${this.blurinput}px)`);
    this.generateCSS();
  }

  changeBorder() : void{
    if(this.borderinput === 0){
      this.renderer.setStyle(this.glass, 'border' , 'none');
      this.renderer.setStyle(this.codeActions.nativeElement,'max-width', '17.8em');
    }
    else{
      const colors: number[] = this.getRGB();
      this.renderer.setStyle(this.glass,'border', `${this.borderinput}px solid rgba(${colors[0]},${colors[1]},${colors[2]},${this.opacityinput/100})`);
      this.renderer.setStyle(this.codeActions.nativeElement,'max-width', '18.8em');
    }
    this.generateCSS();
  }

  changeBorderRadius(): void {
    this.renderer.setStyle(this.glass, 'border-radius', `${this.borderradius}px`);
    this.generateCSS();
  }

  getRGB(): number[] {
    const r: number = parseInt(this.colorinput.substring(1, 3), 16);
    const g: number = parseInt(this.colorinput.substring(3, 5), 16);
    const b: number = parseInt(this.colorinput.substring(5, 7), 16);
    return [r, g, b];
  }

  changeColor(): void {
    const colors: number[] = this.getRGB();
    this.renderer.setStyle(this.glass, 'background', `rgba(${colors[0]},${colors[1]},${colors[2]},0.1)`);
    this.renderer.setStyle(this.actionButton.nativeElement, 'background', `rgba(${colors[0]},${colors[1]},${colors[2]},0.1)`);
    this.colorHover = `rgba(${colors[0]},${colors[1]},${colors[2]},0.3)`;
    this.colorNonHover = `rgba(${colors[0]},${colors[1]},${colors[2]},0.1)`;
    this.generateCSS();
  }

  changeOpacity(): void {
    const colors: number[] = this.getRGB();
    this.renderer.setStyle(this.glass, 'background', `rgba(${colors[0]},${colors[1]},${colors[2]},${this.opacityinput}%)`);
    this.generateCSS();
  }

  changeBackgroundImage(path: string): void {
    this.renderer.setStyle(this.wrapperDiv.nativeElement, 'background-image', `url(${path})`);
  }

  addBackground(path: string): void {
    this.bgImages.push(path);
    this.changeBackgroundImage(path);
    this.cd.detectChanges();
  }

  generateCSS(): void {
    this.copied = false;
    const colors: number[] = this.getRGB();
    this.cssCode = `background : rgba(${colors[0]},${colors[1]},${colors[2]},${this.opacityinput/100});\nborder-radius : ${this.borderradius}px;\n${(this.borderinput > 0 ? `border : ${this.borderinput}px solid rgba(${colors[0]},${colors[1]},${colors[2]},${this.opacityinput/100});\n`: "")}backdrop-filter: blur(${this.blurinput}px);\n-webkit-backdrop-filter: blur(${this.blurinput}px);\nbox-shadow: 0 0 4px 0 rgba(0,0,0,30%);`
  }

  copyCssCode(): void {
    let el: any = document.createElement('textarea');
    el.value = this.cssCode;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.copied = true;
  }

}

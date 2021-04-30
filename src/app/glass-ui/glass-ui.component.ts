import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { 
  faCopy,
  faCheckCircle,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

type Images = {
  path:string;
  alt:string;
}

@Component({
  selector: 'app-glass-ui',
  templateUrl: './glass-ui.component.html',
  styleUrls: ['./glass-ui.component.scss']
})
export class GlassUIComponent implements AfterViewInit {

  faCopy = faCopy;
  faCheckCircle = faCheckCircle;
  faGithub = faGithub;
  faHeart = faHeart;
  title = 'playground';
  heightinput: number = 20;
  widthinput: number = 25;
  blurinput: number = 16;
  borderinput:number = 0;
  borderradius: number = 12;
  colorinput: string = "#FFFFFF";
  opacityinput: number = 10;
  addBackgroundActive: boolean = false;
  bgImages: Images[] = [
    {
      path:"assets/pawel-czerwinski-JEV7CrJTUNE-unsplash.jpg",
      alt: "pawel-czerwinski-JEV7CrJTUNE-unsplash.jpg",
    },
    {
      path:"assets/pawel-czerwinski-yn97LNy0bao-unsplash.jpg",
      alt: "pawel-czerwinski-yn97LNy0bao-unsplash.jpg",
    },
    {
      path:"assets/pawel-czerwinski-UF4SrDnu8ns-unsplash.jpg",
      alt: "pawel-czerwinski-UF4SrDnu8ns-unsplash.jpg",
    }
  ]
  cssCodeActive: boolean = false;
  cssCode!: string;
  copied: boolean = false;
  imageurl!:string;
  emptyImageURL:boolean = false;
  invalidImageURL:boolean= false;
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
    }
    else{
      const colors: number[] = this.getRGB();
      this.renderer.setStyle(this.glass,'border', `${this.borderinput}px solid rgba(${colors[0]},${colors[1]},${colors[2]},${this.opacityinput/100})`);
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

  validateImageURL():boolean{
    let regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    if(!this.imageurl){
      this.emptyImageURL = true;
      this.invalidImageURL = false;
      return true;
    }
    else if(this.imageurl.match(regex)){
      this.invalidImageURL = false;
      this.emptyImageURL = false;
      return false;
    }
    else{
      this.invalidImageURL = true;
      this.emptyImageURL = false;
      return true;
    }
  }

  addBackground(): void {
    if(!this.validateImageURL()){
      let image:Images ={
        path: this.imageurl,
        alt: this.imageurl.substring((this.imageurl.lastIndexOf('/')+1),this.imageurl.length)
      }
      this.bgImages.push(image);
      this.changeBackgroundImage(image.path);
      this.cd.detectChanges();
    }
  }

  generateCSS(): void {
    this.copied = false;
    const colors: number[] = this.getRGB();
    this.cssCode = `background : rgba(${colors[0]},${colors[1]},${colors[2]},${this.opacityinput/100});\nborder-radius : ${this.borderradius}px;\n${(this.borderinput > 0 ? `border : ${this.borderinput}px solid rgba(${colors[0]},${colors[1]},${colors[2]},${this.opacityinput/100});\n`: `border : 1px transparent;\n`)}backdrop-filter: blur(${this.blurinput}px);\n-webkit-backdrop-filter: blur(${this.blurinput}px);\nbox-shadow: 0 0 4px 0 rgba(0,0,0,30%);`
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
    setTimeout(()=>{
      this.copied = false;
    },2000);
  }

}

import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appFontWeight]'
})
export class FontWeightDirective {

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeFontWeight('bold');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeFontWeight(null);
  }

  private changeFontWeight(fontWeight: string) {
    this.el.nativeElement.style.fontWeight = fontWeight;
  }
}

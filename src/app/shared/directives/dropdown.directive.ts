import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpened = false;

  // constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') toggleOpen() {
    this.isOpened = !this.isOpened;
    // if (this.isOpened) {
    //   this.renderer.addClass(this.elementRef.nativeElement, 'open');
    // } else {
    //   this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    // }
  }
}

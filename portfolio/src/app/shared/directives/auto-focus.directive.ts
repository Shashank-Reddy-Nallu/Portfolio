import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[autoFocusInvalidInput]',
  standalone: true
})
export class AutoFocusDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('submit')
  onFormSubmit() {
    const invalidElements = this.elementRef.nativeElement.querySelectorAll('.ng-invalid');
    if (invalidElements.length) {
      invalidElements[0].focus();
    }
  }

}

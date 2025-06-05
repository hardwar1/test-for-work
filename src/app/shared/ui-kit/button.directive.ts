import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appBtn]',
  standalone: true,
})
export class BtnDirective implements OnChanges, OnInit {
  @Input('appButtonMode') modeClass?: '' | 'btn--primary' = '';
  @Input('titleText') text?: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'btn');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modeClass'] && this.modeClass) {
      this.renderer.addClass(this.el.nativeElement, this.modeClass);

      if (this.text) {
        this.renderer.setAttribute(
          this.el.nativeElement,
          'title',
          this.text
        );
      }
    }
  }
}

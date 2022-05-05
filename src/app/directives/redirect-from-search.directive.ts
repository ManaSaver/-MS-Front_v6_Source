import { Directive, HostListener } from '@angular/core';

@Directive({
    selector : '.redirect-to-item', // <---selects only .bar elements

})

export class RedirectFromSearchDirective
{
    @HostListener('click', ['$event']) onClick($event: any) {
       // console.info('clicked: ',  $event);
    }
}


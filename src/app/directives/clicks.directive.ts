import { Directive, HostListener } from '@angular/core';

import { ItemService } from "../services/item.service";

@Directive({
    selector: '[appClicks]'
})

export class ClicksDirective
{

    constructor(
        private ItemService: ItemService
    )
    {

    }

    @HostListener('click', ['$event']) onClick($event: any) {
        console.info('clicked on clicks: ',  $event, this);
        //ItemService.MenuService.openMenu(item.uuid)
    }
}

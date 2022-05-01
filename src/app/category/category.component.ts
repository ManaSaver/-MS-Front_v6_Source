import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService } from "../services/item.service";

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: [
        './sidebar.css',
        './menu.component.css',
        './category.component.css',
        './title.component.css',
        './paragraph.component.css',
        './code.component.css',
    ]
})

export class CategoryComponent implements OnInit
{
    @ViewChild('page') page: any = ElementRef

    indentPixels = 40;

    constructor
    (
        private router: Router,
        private route: ActivatedRoute,
        public ItemService: ItemService,
    )
    {
        this.route.params.subscribe(obj => {
            if(obj.hasOwnProperty('uuid')) {
                this.ItemService.setRoot(obj['uuid'])
            } else {
                this.ItemService.setRoot('')
            }

        });

    }

    ngOnInit() {}

    ngAfterViewInit(): void
    {
        this.setSidebarPosition()
    }

    ngOnChanges() {}
    ngOnDestroy() {}

    setSidebarPosition()
    {
        if(this.page == undefined) {
            return
        }

        if(this.ItemService.ConfigService.sidebarPosition == 'left') {
            this.page.nativeElement.classList.add('sidebar-left')
            this.page.nativeElement.classList.remove('sidebar-right')
        } else if(this.ItemService.ConfigService.sidebarPosition == 'left') {
            this.page.nativeElement.classList.add('sidebar-right')
            this.page.nativeElement.classList.remove('sidebar-left')
        }
    }

    goToParentUUID(uuid: string | null)
    {
        this.ItemService.MenuService.closeAllMenus()

        if(uuid == null || uuid == '') {
            this.router.navigate(['/'])
        } else {
            this.router.navigate(['category/' + uuid])
        }
    }

    isArray(obj: any): boolean
    {
        return Array.isArray(obj);
    }

    textEllipsis(str: string, maxLength: number, { side = "end", ellipsis = "..." } = {})
    {
        if(str == null) {
            return ''
        }

        if (str.length > maxLength) {
            switch (side) {
                case "start":
                    return ellipsis + str.slice(-(maxLength - ellipsis.length));
                case "end":
                default:
                    return str.slice(0, maxLength - ellipsis.length) + ellipsis;
            }
        }
        return str;
    }

    copyToClipboard(text: string)
    {

        // navigator clipboard api needs a secure context (https)
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method'
            //his.copiedIcon = true;
            setTimeout(() => {
                //this.copiedIcon = false;
            }, 1000);

            return navigator.clipboard.writeText(text);
        } else {
            // text area method
            let textArea = document.createElement("textarea");
            textArea.value = text;

            // make the textarea out of viewport
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
           // this.copiedIcon = true;
            setTimeout(() => {
              //  this.copiedIcon = false;
            }, 1000);


            return new Promise((res, rej) : void => {
                // here the magic happens
                //document.execCommand('copy') ? res() : rej();
                document.execCommand('copy');
                textArea.remove();
            });

        }

    }


}

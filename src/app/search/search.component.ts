import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService } from "../services/item.service";
import { SearchService } from "../services/search.service";
import lgZoom from "lightgallery/plugins/zoom";
import fullscreen from "lightgallery/plugins/fullscreen";
import rotate from "lightgallery/plugins/rotate";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: [
        './search.component.css',
        '../category/files.component.css',
    ],
    host: {
        '(document:keydown)': 'handleKeyboardEvents($event)'
    }
})

export class SearchComponent implements OnInit
{

    lightGallerySettings = {
        plugins: [lgZoom, fullscreen, rotate],
        speed: 100, backdropDuration: 100, defaultCaptionHeight: 1,
        showCloseIcon: true,
        flipHorizontal: true,
        hideScrollbar : true,
        licenseKey: "1234-1234-123-1234"
    };

    constructor
    (
        private Title: Title,
        private router: Router,
        private route: ActivatedRoute,
        public ItemService: ItemService,
        public SearchService: SearchService,
    ) { }

    ngOnInit(): void
    {
        this.Title.setTitle('Пошук дописів');
        this.SearchService.getResults(this.SearchService.searchParam.offset)

    }




    goToParentUUID(uuid: string | null)
    {
        if(uuid == null || uuid == '') {
            this.router.navigate(['/'])
        } else {
            this.router.navigate(['category/' + uuid])
        }
    }

    goToTitle(categoryUUID: string, uuid: string)
    {
        if(uuid == null || uuid == '') {
            this.router.navigate(['/'])
        } else {
            this.router.navigate(['category/' + categoryUUID])
            this.ItemService.MenuService.deferredScroll(uuid)
        }
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

    searchCodeByTag(tag: string)
    {
        this.SearchService.searchCodeByTag(tag)
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

    handleKeyboardEvents(event: KeyboardEvent) {
        /*
        if(event.ctrlKey && event.keyCode == 37) {
            // left
            this.SearchService.prevPage()
        }
        if(event.ctrlKey && event.keyCode == 39) {
            // right
            this.SearchService.nextPage()
        }
        */
        if(event.keyCode == 37) {
            // left
            this.SearchService.prevPage()
        }
        if(event.keyCode == 39) {
            // right
            this.SearchService.nextPage()
        }

    }

}

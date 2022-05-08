import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class MenuService
{
    /**
     * Події, які я хочу відслідковувати:
     */
    loaders: any = {
        'items_are_loading': false,
        'items_already_loaded': false,
        'root_not_found': false,
        //'items_loading_failed': false,


        'items_are_linking': false, // Чи потрібне мені це?
        'items_already_linked': false,
    }

    menu: any = {
        'is_opened': false,
        'uuid': '',
    }

    editing: any = {
        'is_opened': false,
        'uuid': '',
        'is_updating': false,
        'deleting_mode': false,
    }

    creating: any = {
        'is_opened': false,
        'parent_uuid': '',
        'order_index': -1,
        'type': '',
        'is_creating': false,
        'indent_pixels': 40
    }

    codeTabs: any = {
        //
    }

    deferredScrollToUUID: null | string = null


    constructor
    (
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    closeAllMenus()
    {
        this.closeMenu()
        this.closeEditing()
        this.closeCreating()
    }

    openMenu(uuid: string | null)
    {
        if(this.menu.is_opened) {
            if(this.menu.uuid == uuid) {
                this.closeMenu()
                return
            }
        }

        this.menu.uuid = uuid
        this.menu.is_opened = true

        console.log('openMenu', this.menu)
    }

    closeMenu()
    {
        this.menu.uuid = ''
        this.menu.is_opened = false
    }


    openEditing(uuid: string)
    {
        this.editing.deleting_mode = false

        if(this.editing.is_opened) {
            if(this.editing.uuid == uuid) {
                this.closeMenu()
                return
            }
        }

        this.editing.uuid = uuid
        this.editing.is_opened = true

        this.closeMenu()
        this.closeCreating()

        setTimeout( () => {
            this.scrollTo(this.editing.uuid, 'edit-uuid', 50)
        }, 150)

        // console.log('open editing', this.editing)
    }

    closeEditing()
    {
        this.editing.uuid = ''
        this.editing.is_opened = false
    }

    openCreating(parent_uuid: string | null, order_index: number, type: string, redirectToParent: boolean = false)
    {
        this.creating.is_opened = true
        this.creating.parent_uuid = parent_uuid
        this.creating.order_index = order_index
        this.creating.type = type

        if(type == 'title') {
            this.creating.indent_pixels = 20
        } else if(type == 'paragraph') {
            this.creating.indent_pixels = 0
        } else {
            this.creating.indent_pixels = 40
        }

        this.closeMenu()
        this.closeEditing()

        if(redirectToParent) {
            // todo
            // console.log('redirectToParent ', redirectToParent, parent_uuid)
            this.router.navigate(['category/' + parent_uuid])
        }

         console.log('this.creating', this.creating)
    }

    closeCreating()
    {
        this.creating.is_opened = false
        this.creating.parent_uuid = ''
        this.creating.order_index = -1
        this.creating.type = ''
    }

    openDeleting(uuid: string)
    {
        this.openEditing(uuid)
        this.editing.deleting_mode = true
    }

    cancelDeleting()
    {
        this.editing.deleting_mode = false
    }

    activateCodeTab(parentUUID: string, codeUUID: string)
    {
        // console.log('activateCodeTab', parentUUID, codeUUID)

        if(!this.codeTabs.hasOwnProperty(parentUUID)) {
            this.codeTabs[parentUUID] = codeUUID
        } else {
            this.codeTabs[parentUUID] = codeUUID
        }

        this.closeCreating()
        this.closeEditing()
    }

    scrollTo(uuid: string, tag: string, top: number = 20)
    {
        const element = document.querySelector('[' + tag + '="' + uuid + '"]');
        if (element) {
            // console.log('success scrollTo:', uuid)
            window.scrollTo({top: element.getBoundingClientRect().top + window.pageYOffset - top, behavior: 'smooth'});
            return true;
        }

        return false;

    }

    deferredScroll(uuid: string, numberOfAttempts: number = 10, delay: number = 10)
    {
        this.deferredScrollToUUID = uuid

        for(let i = 1; i <= numberOfAttempts; i++) {
            setTimeout( () => {
                if(this.deferredScrollToUUID != null) {
                    this.scrollTo(this.deferredScrollToUUID, 'uuid', 20)
                    this.deferredScrollToUUID = null
                }
            }, delay * 10)
        }
    }


}

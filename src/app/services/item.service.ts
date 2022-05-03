import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MenuService }      from "./menu.service";
import { ConfigService }    from "./config.service";
import { IconService }      from "./icon.service";
import { SoundService  }    from "./sound.service";
import { TinymceService } from "./tinymce.service";


@Injectable({
    providedIn: 'root'
})

export class ItemService
{
    root: any = {
        uuid: '',
        children: [],
        breadcrumbs: []
    }
    items: any = {}
    itemsChange = new BehaviorSubject<Array<any>>([]);
    itemsAreBackuping: boolean = false

    loadingType: string = 'full_reload' // enum: [full_reload, update]

    codeLanguages: any = ['php', 'js', 'typescript', 'css', 'xml', 'html', 'go', 'bash', 'sql']


    constructor
    (
        private Title           : Title,
        private HttpClient      : HttpClient,
        public MenuService      : MenuService,
        public ConfigService    : ConfigService,
        public IconService      : IconService,
        public SoundService     : SoundService,
        public TinymceService   : TinymceService,
    )
    {
        // console.log('s', ConfigService.backend)
    }

    setRoot(uuid: string | null)
    {
        if(uuid == null) {
            uuid = ''
        }

        if(this.root.uuid != uuid) {
            this.loadingType = 'full_reload' // якщо відбулась зміна кореня, то видалю і встановлю заново всі дописи
            this.root.uuid = uuid
        } else {
            this.loadingType = 'update' // якщо не було зміни кореня, то оновлю дописи і додав нові
        }

        this.loadRoot()
    }

    /**
     * Завантажую артефакти і оновлюю, якщо вони вже були завантажені раніше
     */
    loadRoot()
    {

        if(this.loadingType == 'full_reload') {
            this.MenuService.loaders.items_are_loading = true
            this.MenuService.loaders.root_not_found = false
        }

        let url = '', breadURL = ''
        if(this.root.uuid.length > 0) {
            url = this.ConfigService.backend + '/items/' + this.root.uuid + '?database=' + this.ConfigService.database
            breadURL = this.ConfigService.backend + '/bread_crumbs/' + this.root.uuid + '?database=' + this.ConfigService.database
        } else {
            url = this.ConfigService.backend + '/items' + '?database=' + this.ConfigService.database
        }

        this.HttpClient.get(url).subscribe( (response: any) => {

            if(this.loadingType == 'full_reload') {
                this.items = {}
                this.root.children = [];
            }

            // Додаю, або оновлюю дописи:
            for(let item of response.response_data) {

                if(this.items.hasOwnProperty(item.uuid)) {

                    this.items[item.uuid].parent = null
                    this.items[item.uuid].likes = item.likes
                    this.items[item.uuid].order_index = item.order_index
                    this.items[item.uuid].parent_uuid = item.parent_uuid
                    this.items[item.uuid].src = item.src
                    this.items[item.uuid].tags = item.tags
                    this.items[item.uuid].text = item.text
                    this.items[item.uuid].title = item.title
                    this.items[item.uuid].updated_at = item.updated_at
                    this.items[item.uuid].created_at = item.created_at

                } else {
                    item.children = []
                    this.items[item.uuid] = item
                }

            }

            // console.log('this.items', Object.keys(this.items).length)

            // Встановлюю перший рівень дописів:
            if(this.root.uuid == '' || this.root.uuid == null) {

                for(let key in this.items) {
                    if(this.items[key].parent_uuid == null) {
                        this.addObjectToArrayIfNotExits(this.items[key], this.root.children)
                    }
                }

                this.Title.setTitle('MS ver.' + this.ConfigService.msVersion);

            } else {
                if(this.items.hasOwnProperty(this.root.uuid)) {

                    for(let key in this.items) {
                        if(this.items[key].parent_uuid == this.root.uuid) {
                            this.addObjectToArrayIfNotExits(this.items[key], this.root.children)
                        }
                    }

                    this.Title.setTitle(this.items[this.root.uuid].title);

                } else {
                    console.error('Не можу знайти корінний допис!', this.items, this.root.uuid)
                }
            }

            // TODO: children with sort
            this.sortChildren(this.root.children)
            this.setChildren()
            this.setParents()

            //console.log('loadRoot Request success', response.response_data, response.request_data)
            //console.log('this.items', this.items)
            // console.log('root', this.root)
            this.MenuService.loaders.items_already_loaded = true
            this.MenuService.loaders.items_are_loading = false

            this.itemsChange.next([])

            // Вмикаю перші таби кодів:
            if(this.loadingType == 'full_reload') {
                for (let item of response.response_data) {
                    if (item.type == 'paragraph') {
                        if (this.items.hasOwnProperty(item.uuid)) {
                            if (this.items[item.uuid].children.length > 0) {
                                this.MenuService.codeTabs[item.uuid] = this.items[item.uuid].children[0].uuid
                            }
                        }
                    }
                }
            }

        },(error: any) => {
            console.error('loadRoot Request failed with error', error.error, error)
            this.MenuService.loaders.items_already_loaded = false
            this.MenuService.loaders.items_are_loading = false

            if(error.status == 404) {
                this.MenuService.loaders.root_not_found = true
            }
        })

        if(breadURL.length == 0) {
            this.root.breadcrumbs = []
            return
        }

        this.HttpClient.get(breadURL).subscribe( (response: any) => {
            // console.log('breadcrumbs', response)
            this.root.breadcrumbs = response.response_data
        },(error: any) => {
            // console.log('breadcrumbs error', error)
        })


    }

    setParents()
    {
        for(let key in this.items) {

            if(!this.items[key].hasOwnProperty('parent')) {
                this.items[key].parent = null
            }

            if(this.items.hasOwnProperty(this.items[key].parent_uuid)) {
                this.items[key].parent = this.items[this.items[key].parent_uuid]
            }

        }
    }

    setChildren()
    {
        for(let key in this.items) {

            this.items[key].children = [] // треба видалити всі дочірні, бо інакше видалені залишаються

            for(let subkey in this.items) {
                if(this.items[subkey].parent_uuid == key) {
                    this.addObjectToArrayIfNotExits(this.items[subkey], this.items[key].children)
                }
            }

            this.sortChildren(this.items[key].children)
        }
    }

    addObjectToArrayIfNotExits(object: any, array: any)
    {
        const found = array.some( (el: any) => {
            return el.uuid === object.uuid
        });

        if (!found) array.push(object);
    }

    sortChildren(array: any)
    {
        array.sort((a: any, b: any) => {
            if (a.order_index < b.order_index) return -1;
            else if (a.order_index > b.order_index) return 1;
            else return 0;
        });
    }

    setParent()
    {
        // TODO: потрібно лише категоріям? щоб будувати хлібні крихти
        // ще може бути потрібно параграфами і титулами, при пошуку, щоб до них доїхати
    }

    /**
     *
     */
    createItem(item: any, subItem: any = null)
    {
        // Оновлення цілої гілки:
        this.loadingType = 'update'

        this.HttpClient.post(this.ConfigService.backend + '/items?database=' + this.ConfigService.database, item).subscribe( (response: any) => {


            this.MenuService.creating.order_index = item.order_index
            this.MenuService.creating.is_creating = false
            this.loadRoot()
            console.log('create item', item, response, this.MenuService.creating)

            if(item.type == 'paragraph') {
                // Якщо це парграф з кодом:

                if(item.tags.includes('has_codes')) {
                    setTimeout(() => {
                        this.MenuService.openCreating(response.response_data[0].uuid, 0, 'code')
                    }, 20)
                }
            }

            if(item.type == 'code') {
                // TODO: після створення коду відкрий редагування цього коду
                this.MenuService.closeCreating()

                // Вмикаю перший таб:
                //console.log('Вмикаю перший таб:', item, this.MenuService.codeTabs)
                if (this.items.hasOwnProperty(item.parent_uuid)) {
                    //if (this.items[item.parent_uuid].children.length == 0) {
                        this.MenuService.codeTabs[item.parent_uuid] = response.response_data[0].uuid
                    //}
                }

                setTimeout(() => {
                    this.MenuService.openCreating(item.parent_uuid, item.order_index, item.type)
                }, 20)
            }



        }, (error: any) => {
            // console.error('updateItem Request failed with error', error.error, error)
        })
    }


    updateItem(item: any)
    {
        // Оновлення цілої гілки:
        this.loadingType = 'update'

        let url = this.ConfigService.backend + '/items/' + item.uuid + '?database=' + this.ConfigService.database

        this.HttpClient.put(url, item).subscribe( (response: any) => {
            console.log('update item', item, response)

            this.MenuService.editing.is_updating = false
            this.loadRoot()

        }, (error: any) => {
           // console.error('updateItem Request failed with error', error.error, error)
        })


    }

    /**
     *
     */
    deleteItem(item: any)
    {
        this.HttpClient.delete(this.ConfigService.backend + '/items?database=' + this.ConfigService.database, {
            headers: { 'Content-Type': 'application/json'},
            body : item
        }).subscribe( (response: any) => {

            if(this.items.hasOwnProperty(item.uuid)) {
                delete this.items[item.uuid]
            }

            this.root.children = this.root.children.filter((obj: any) =>  {
                return obj.uuid !== item.uuid
            });

            this.loadRoot()

            if(item.type == 'code') {
                if (item.order_index > 1) {

                    // this.MenuService.activateCodeTab()
                    // todo: - після видалення відкрити попередній, або наступний якщо нема
                }

                this.MenuService.closeEditing()

                setTimeout( () => {
                    // Після видалення коду, відкриваю перший таб, якщо він існує:
                    if (this.items.hasOwnProperty(item.parent_uuid)) {
                        if (this.items[item.parent_uuid].children.length > 0) {
                            this.MenuService.codeTabs[item.parent_uuid] = this.items[item.parent_uuid].children[0].uuid
                        }
                    }
                }, 20)

            }

            console.log('this.items', this.items, item)
        }, (error: any) => {
            console.error('updateItem Request failed with error', error.error, error)
        })
    }


    /**
     * TODO:
     */
    reorderItems()
    {
        console.log('reorderItems')
    }

    /**
     *
     */
    backup()
    {
        console.log('backup()')

        this.itemsAreBackuping = true

        this.HttpClient.post(this.ConfigService.backend + '/backup?database=' + this.ConfigService.database, {
            headers: { 'Content-Type': 'application/json'},
            body : {}
        }).subscribe( (response: any) => {
            this.itemsAreBackuping = false
        }, (error: any) => {
            console.error('backup Request failed with error', error.error, error)
        })


    }

    /**
     *
     */
    search(data: any)
    {
        console.log('search')

        this.HttpClient.post(this.ConfigService.backend + '/search?database=' + this.ConfigService.database, {
            headers: { 'Content-Type': 'application/json'},
            body : data
        }).subscribe( (response: any) => {
            console.log('search result', response)
        }, (error: any) => {
            console.error('backup Request failed with error', error.error, error)
        })


    }

    /**
     * Знайти дочірній елемент до вказаного, по його позиції
     * @param parentUUID
     * @param orderIndex
     */
    findChildByOrderIndex(parentUUID: string, orderIndex: number)
    {
        if(parentUUID == null) {
            for (let child of this.root.children) {
                if (child.order_index == orderIndex) {
                    return child
                }
            }
        } else {
            if (this.items.hasOwnProperty(parentUUID)) {
                if (this.items[parentUUID].hasOwnProperty('children')) {
                    for (let child of this.items[parentUUID].children) {
                        if (child.order_index == orderIndex) {
                            return child
                        }
                    }
                }
            }
        }

        return null
    }

    createParagraphWithCodes(parent_uuid: string | null, order_index: number, type: string, redirectToParent: boolean = false)
    {
        this.MenuService.closeMenu()
        this.createItem
        ({
                parent_uuid: parent_uuid,
                type: 'paragraph',
                order_index: order_index + 1,
                title: null,
                text: null,
                src: null,
                likes: 0,
                tags: ['has_codes'],
            }
        )

    }

}

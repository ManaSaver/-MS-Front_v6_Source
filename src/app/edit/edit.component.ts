import { Component, OnInit, Input } from '@angular/core';

import { ItemService } from "../services/item.service";

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/php/php';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/go/go';
import 'codemirror/mode/shell/shell'; // bash
import 'codemirror/mode/sql/sql';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit
{
    @Input() item: any
    @Input() indent: any

    newItem: any = {
        parent_uuid: '',
        type: '',
        title: null,
        text: null,
        src: null,
        likes: 0,
        tags: [],
    }
    itemsSubscription: any

    isLast: boolean = false
    isCollapsed: boolean = false
    orderIndex: number = 0
    lastOrderIndex: number = 0

    // Paragraph tags:
    paragraphContains: number = 1

    formHasErrors: boolean = false
    titleError: string = ''

    hideTinyMCE: boolean = false

    editorOptions = {
        lineNumbers: true,
        theme: 'dracula',
        mode: 'php',
        height: 'auto'
    };

    code: string = '';
    tagsString: string = '';
    tagsArray: any = [];

    constructor
    (
        public ItemService: ItemService
    )
    {
    }

    ngOnInit(): void
    {
        this.itemsSubscription = this.ItemService.itemsChange.subscribe((data) => {

                if (this.ItemService.items.hasOwnProperty(this.item.uuid)) {

                    this.hideTinyMCE = true

                    this.newItem.uuid = this.ItemService.items[this.item.uuid].uuid
                    this.newItem.parent_uuid = this.ItemService.items[this.item.uuid].parent_uuid
                    this.newItem.type = this.ItemService.items[this.item.uuid].type
                    this.newItem.title = this.ItemService.items[this.item.uuid].title
                    this.newItem.text = this.ItemService.items[this.item.uuid].text
                    this.newItem.src = this.ItemService.items[this.item.uuid].src
                    this.newItem.likes = this.ItemService.items[this.item.uuid].likes
                    this.newItem.tags = this.ItemService.items[this.item.uuid].tags

                    if (this.newItem.tags.includes('last')) {
                        this.isLast = true
                    }

                    if (this.newItem.tags.includes('collapsed')) {
                        this.isCollapsed = true
                    }

                    if (this.newItem.tags.includes('has_codes')) {
                        this.paragraphContains = 2
                    }

                    if (this.newItem.tags.includes('has_files')) {
                        this.paragraphContains = 3
                    }

                    if(this.newItem.type == 'code') {
                        this.tagsArray = this.ItemService.items[this.item.uuid].tags
                        this.tagsString = this.tagsArray.join(', ')
                    }

                    if(this.newItem.type == 'file') {
                        this.tagsArray = this.ItemService.items[this.item.uuid].tags
                        this.tagsString = this.tagsArray.join(', ')
                    }

                    this.orderIndex = this.ItemService.items[this.item.uuid].order_index

                    if (this.item.parent_uuid != null) {
                        if (this.ItemService.items.hasOwnProperty(this.item.parent_uuid)) {
                            if (this.ItemService.items[this.item.parent_uuid].hasOwnProperty('children')) {
                                for (let child of this.ItemService.items[this.item.parent_uuid].children) {
                                    if (child.order_index > this.lastOrderIndex) {
                                        this.lastOrderIndex = child.order_index
                                    }
                                }
                            }
                        }
                    } else {
                        for (let child of this.ItemService.root.children) {
                            if (child.order_index > this.lastOrderIndex) {
                                this.lastOrderIndex = child.order_index
                            }
                        }
                    }

                    setTimeout( () => {
                        this.hideTinyMCE = false
                    }, 3)

                    if(this.ItemService.items[this.item.uuid].type == 'code') {
                        this.code = this.ItemService.items[this.item.uuid].text
                        this.switchEditorLang()
                    }

                }
        });
    }

    ngAfterViewInit()
    {

    }

    ngOnDestroy()
    {
        this.itemsSubscription.unsubscribe();
    }

    switchEditorLang()
    {
        if(this.newItem.src == null) {
            this.editorOptions.mode = 'text/x-php'
            return
        }

        if(this.newItem.src == 'bash') {
            this.editorOptions.mode = 'shell'
            return
        }

        if(this.newItem.src == 'typescript' || this.newItem.src == 'js') {
            this.editorOptions.mode = 'javascript'
            return
        }

        if(this.newItem.src == 'html') {
            this.editorOptions.mode = 'xml'
            return
        }

        if(this.newItem.src == 'php') {
            this.editorOptions.mode = 'text/x-php'
            return
        }

        this.editorOptions.mode = this.newItem.src
    }

    save()
    {

        this.ItemService.MenuService.editing.is_updating = true

        if(this.newItem.type == 'category') {

            if(this.newItem.title == null) {
                this.titleError = 'Title cannot be empty!'
                this.formHasErrors = true
                return
            }

            if(this.newItem.title.length > 100) {
                this.titleError = 'Title too long!'
                this.formHasErrors = true
                return
            }

            this.newItem.tags = []

            if(this.isLast && !this.newItem.tags.includes('last')) {
                this.newItem.tags.push('last')
            }

            if(this.isCollapsed && !this.newItem.tags.includes('collapsed')) {
                this.newItem.tags.push('collapsed')
            }

        }

        if(this.newItem.type == 'paragraph') {

            this.newItem.tags = []

            if(this.paragraphContains == 1) {

            } else if(this.paragraphContains == 2) {
                this.newItem.tags.push('has_codes')
            } else if(this.paragraphContains == 3) {
                this.newItem.tags.push('has_files')
            }

            this.newItem.text = this.ItemService.TinymceService.editor.activeEditor.getContent()
        }


        if(this.newItem.type == 'code') {

            if(this.newItem.title == null) {
                this.titleError = 'Title cannot be empty!'
                this.formHasErrors = true
                return
            }

            if(this.newItem.title.length > 100) {
                this.titleError = 'Title too long!'
                this.formHasErrors = true
                return
            }

            this.newItem.text = this.code
            this.newItem.tags = this.tagsArray
        }

        if(this.newItem.type == 'file') {
            this.newItem.tags = this.tagsArray
        }

        console.log('update item', this.newItem)

        this.ItemService.updateItem(this.newItem)
    }

    confirmDeleteRequest()
    {
        this.ItemService.deleteItem({
            uuid: this.newItem.uuid,
            parent_uuid: this.newItem.parent_uuid,
            type: this.newItem.type
        })
    }

    cancelDeleteRequest()
    {
        this.ItemService.MenuService.cancelDeleting()
    }

    moveUp()
    {
        if(this.orderIndex <= 1) {
            console.log('this is first record')
            return
        }

        let object = {
            uuid: this.newItem.uuid,
            parent_uuid: this.newItem.parent_uuid,
            order_index: this.orderIndex - 1,
        }

        if(object.order_index <= 1) {
            object.order_index = 1
        }

        console.log('moveUp', object)
        this.ItemService.MenuService.editing.is_updating = true
        this.ItemService.updateItem(object)
    }

    moveDown()
    {
        if(this.orderIndex >= this.lastOrderIndex) {
            console.log('this is last record')
            return
        }

        let object = {
            uuid: this.newItem.uuid,
            parent_uuid: this.newItem.parent_uuid,
            order_index: this.orderIndex + 1
        }

        // console.log('moveDown', object)
        this.ItemService.MenuService.editing.is_updating = true
        this.ItemService.updateItem(object)
    }

    changeTagsString()
    {
        this.tagsArray = this.tagsString.split(',').map(item => item.trim());

        for(let key in this.tagsArray) {
            if(this.tagsArray[key].length == 0) {
                delete this.tagsArray[key]
            }
        }

        this.tagsArray =  this.tagsArray.filter((el: any) => {
            return el.length > 0;
        });
    }

}

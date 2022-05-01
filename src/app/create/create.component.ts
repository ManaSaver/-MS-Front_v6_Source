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
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit
{
    @Input() item: any
    @Input() indent: any
    @Input() position: string = ''

    newItem: any = {
        parent_uuid: '',
        type: '',
        order_index: 1,
        title: null,
        text: null,
        src: null,
        likes: 0,
        tags: [],
    }

    // Category tags:
    isLast: boolean = false
    isCollapsed: boolean = false

    // Paragraph tags:
    paragraphContains: number = 1


    formHasErrors: boolean = false
    titleError: string = ''

    editorOptions = {
        lineNumbers: true,
        theme: 'dracula',
        mode: 'php',
        height: 'auto'
    };

    code: string = ''
    tagsString: string = ''
    tagsArray: any = [];

    parentItem: any | null = null
    prevItem: any | null = null
    nextItem: any | null = null

    constructor
    (
        public ItemService: ItemService
    )
    {

    }

    ngOnInit(): void
    {
        if(this.item == undefined) {
            this.item = {
                parent_uuid: null,
                children: []
            }

            return
        }

        if(this.item.type == 'paragraph') {
            if(this.ItemService.MenuService.creating.parent_uuid == this.item.uuid) {
                this.newItem.src = 'php'
            }
        }

        if(this.item.type == 'code') {
            this.code = this.newItem.text
        }

        this.setPrevAndNextItems()
    }

    ngAfterViewInit(): void
    {
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

    /**
     * При створення всі поля є обовязкові!!!!! Крім uuid, його назначить бек
     */
    create()
    {
        this.ItemService.MenuService.creating.is_creating = true
        this.newItem.type = this.ItemService.MenuService.creating.type
        this.newItem.tags = []

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

            if(this.isLast) {
                this.newItem.tags.push('last')
            }

            if(this.isCollapsed) {
                this.newItem.tags.push('collapsed')
            }



        }

        if(this.newItem.type == 'title') {
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


        }

        if(this.newItem.type == 'paragraph') {
            if(this.paragraphContains == 1) {

            } else if(this.paragraphContains == 2) {
                this.newItem.tags.push('has_codes')
            } else if(this.paragraphContains == 3) {
                this.newItem.tags.push('has_files')
            }

            this.newItem.text = this.ItemService.TinymceService.editor.activeEditor.getContent()
        }

        if(this.newItem.type == 'code') {
            this.newItem.text = this.code
            this.newItem.tags = this.tagsArray


        }

        this.newItem.parent_uuid    = this.ItemService.MenuService.creating.parent_uuid
        this.newItem.order_index    = this.ItemService.MenuService.creating.order_index + 1

        // console.log('create', this.newItem)

        this.ItemService.createItem(this.newItem)
    }

    isArray(obj: any): boolean
    {
        return Array.isArray(obj)
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
            return el.length > 0
        });
    }

    setPrevAndNextItems()
    {
        if(this.item.parent_uuid != null) {
            if(this.item.type == 'title') {
                if(this.position != 'child') {
                    if (this.ItemService.items.hasOwnProperty(this.item.parent_uuid)) {
                        this.parentItem = this.ItemService.items[this.item.parent_uuid]
                    }
                }
            } else {
                if (this.ItemService.items.hasOwnProperty(this.item.parent_uuid)) {
                    this.parentItem = this.ItemService.items[this.item.parent_uuid]
                }
            }

        }

        if(this.position == 'next') {
            let prev = this.ItemService.findChildByOrderIndex(this.item.parent_uuid, this.item.order_index)

            if (prev != null) {
                this.prevItem = prev
            }

            let next = this.ItemService.findChildByOrderIndex(this.item.parent_uuid, this.item.order_index + 1)

            if (next != null) {
                this.nextItem = next
            }
        }

        if(this.position == 'first') {
            let next = this.ItemService.findChildByOrderIndex(this.item.parent_uuid, this.item.order_index)

            if (next != null) {
                this.nextItem = next
            }
        }
    }


}

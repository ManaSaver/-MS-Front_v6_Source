import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService }    from "./config.service";
import { MenuService }    from "./menu.service";

@Injectable({
    providedIn: 'root'
})

export class SearchService
{
    results: any = []

    searchParam: any = {
        type: 'all',
        title: '',
        description: '',
        src: '',
        tags: [],
        limit: 5,
        offset: 0,

        order_by: 'created_at',
        sort: 'desc',
    }

    lang: string = 'any'
    attachment: string = ''

    visibleInputs: any = {
        all: ['title', 'description', 'src', 'tags'],
        category: ['title', 'description'],
        title: ['title'],
        paragraph: ['description', 'attachment'],
        code: ['title', 'description', 'tags', 'lang'],
        file: ['title', 'description', 'src', 'tags'],
    }

    tagsString: string = ''

    constructor
    (
        private HttpClient      : HttpClient,
        public ConfigService    : ConfigService,
        public MenuService      : MenuService,
    )
    {

    }

    search(data: any)
    {


        this.HttpClient.post(this.ConfigService.backend + '/search?database=' + this.ConfigService.database, {
            headers: { 'Content-Type': 'application/json'},
            body : data
        }).subscribe( (response: any) => {
            console.log('search result', response)
            this.results = response.response_data

            for(let item of this.results) {

                item['bread_crumbs'] = []
                item['parent_category'] = null
                item['children'] = []

                this.HttpClient.get(this.ConfigService.backend + '/bread_crumbs/' + item.uuid + '?database=' + this.ConfigService.database).subscribe( (response: any) => {
                    item['bread_crumbs'] = response.response_data

                    for(let breadcrumb of response.response_data) {
                        if(breadcrumb.type == 'category') {
                            item['parent_category'] = breadcrumb
                        }
                    }

                },(error: any) => {
                    // console.log('breadcrumbs error', error)
                })

                // console.log('result item:', item)
                if(item.type == 'paragraph') {
                    if(item.tags.includes('has_codes') || item.tags.includes('has_files')) {
                        this.HttpClient.get(this.ConfigService.backend + '/items/' + item.uuid + '?database=' + this.ConfigService.database).subscribe( (response: any) => {


                            for(let child of response.response_data) {
                                if(child.type == 'code' || child.type == 'file') {
                                    item['children'].push(child)
                                }
                            }

                            if (item['children'].length > 0) {
                                 this.MenuService.codeTabs[item.uuid] = item['children'][0].uuid
                            }


                        },(error: any) => {
                            // console.log('breadcrumbs error', error)
                        })
                    }
                }
               // url = this.ConfigService.backend + '/items/' + this.root.uuid + '?database=' + this.ConfigService.database
            }

        }, (error: any) => {
            console.error('backup Request failed with error', error.error, error)
        })



    }


    getResults(offset: number = 0)
    {
        // Очищую значення, які не підходять до обраного типу дописів:
        switch(this.searchParam.type) {

            case 'category': {
                this.searchParam.src = ''
                this.searchParam.tags = []
                break;
            }

            case 'title': {
                this.searchParam.description = ''
                this.searchParam.src = ''
                this.searchParam.tags = []
                break;
            }

            case 'paragraph': {
                this.searchParam.title = ''
                this.searchParam.src = ''

                this.searchParam.tags = []
                if(this.attachment.length > 0) {
                    this.searchParam.tags.push(this.attachment)
                }

                break;
            }

            case 'code': {
                this.searchParam.src = this.lang
                break;
            }

            case 'file': {
                //statements;
                break;
            }

            default: {
                //statements;
                break;
            }
        }

        this.searchParam.offset = offset
        console.log('getResults()', this.searchParam)

        this.search(this.searchParam)
    }

    typeChange()
    {
        if(this.searchParam.type == 'code') {
            this.searchParam.src = this.lang
        } else {
            this.searchParam.src = ''
        }

        this.removeSpecialTags()
        this.tagsChange(false)
        this.getResults()
    }

    tagsChange(getResults: boolean = true)
    {
        this.searchParam.tags = this.tagsString.split(',').map(item => item.trim());

        for (let key in this.searchParam.tags) {
            if (this.searchParam.tags[key].length == 0) {
                delete this.searchParam.tags[key]
            }
        }

        this.searchParam.tags = this.searchParam.tags.filter((el: any) => {
            return el.length > 0
        });

        if (getResults) {
            this.getResults()
        }
    }

    removeSpecialTags()
    {
        this.searchParam.tags = this.searchParam.tags.filter((el: any) => {
            if(this.searchParam.type == 'code') {
                if(el == 'has_codes') return false
                if(el == 'has_files') return false
            }
            return true
        });
    }

    langChange()
    {
        this.searchParam.src = this.lang
        this.getResults()
    }

    attachmentChange()
    {
        this.searchParam.tags = []

        if(this.attachment.length > 0) {
            this.searchParam.tags.push(this.attachment)
        }

        this.getResults()
    }


    prevPage()
    {
        if(this.searchParam.offset >= this.searchParam.limit) {
            this.searchParam.offset = (this.searchParam.offset - this.searchParam.limit)
        }

        this.getResults(this.searchParam.offset)
    }

    nextPage()
    {
        this.searchParam.offset = (this.searchParam.offset + this.searchParam.limit)
        this.getResults(this.searchParam.offset)
    }

    searchCodeByTag(tag: string)
    {
        this.searchParam =  {
            type: 'code',
            title: '',
            description: '',
            src: '',
            tags: [tag],
            limit: 5,
            offset: 0,

            order_by: 'created_at',
            sort: 'desc',
        }

        this.tagsString = tag

        this.getResults()
    }


}

import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit
{
    results: any = []

    searchParam: any = {
        type: 'all',
        title: '',
        description: '',
        src: '',
        tags: [],
        limit: 10,
        offset: 0,

        order_by: 'created_at',
        sort: 'desc',
    }

    lang: string = 'php'
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
        private Title: Title,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void
    {
        this.Title.setTitle('Пошук дописів');

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

    goToParentUUID(uuid: string | null)
    {
        if(uuid == null || uuid == '') {
            this.router.navigate(['/'])
        } else {
            this.router.navigate(['category/' + uuid])
        }
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

}

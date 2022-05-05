import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { Router, ActivatedRoute } from '@angular/router';

import { ItemService } from "../services/item.service";
import { SearchService } from "../services/search.service";

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
        public ItemService: ItemService,
        public SearchService: SearchService,
    ) { }

    ngOnInit(): void
    {
        this.Title.setTitle('Пошук дописів');
        this.SearchService.getResults()

    }




    goToParentUUID(uuid: string | null)
    {
        if(uuid == null || uuid == '') {
            this.router.navigate(['/'])
        } else {
            this.router.navigate(['category/' + uuid])
        }
    }



}

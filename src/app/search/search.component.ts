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



}

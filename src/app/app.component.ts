import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ItemService } from "./services/item.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent
{

    constructor
    (
        public ItemService: ItemService,
        private route: ActivatedRoute,
        private router: Router
    )
    {

    }

    ngOnInit(): void
    {
    }

    goToSearchPage()
    {
        this.router.navigate(['/search'])
    }

    goToTop()
    {
        window.scrollTo({top: -20, behavior: 'smooth'});
    }

}

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class ConfigService
{
    msVersion: string = '6.0.3' // версія програми

    sidebarPosition = 'right'; // enum: [left, right]


    //backend = 'http://ms5-back.local'; // без слеша
    //backend = 'http://ms5-back.local/pure_php'; // без слеша
    backend = 'http://ms5-back-simple.com.yy'; // без слеша

    database: string | null = null
    editDatabaseWindow: boolean = false

    constructor()
    {
        this.database = localStorage.getItem('ms_database_name')
    }

    toggleEditDatabase()
    {
        this.editDatabaseWindow = !this.editDatabaseWindow
    }

    closeEditDatabase()
    {
        this.editDatabaseWindow = false
    }

    saveDBtoLocalStorage()
    {
        console.log('saveDBtoLocalStorage', this.database)
        localStorage.setItem('ms_database_name', this.database == null ? '' : this.database);
    }

}

import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import { IconService } from "../../services/icon.service";

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})

export class ButtonComponent implements OnInit
{
    @ViewChild('button') button: any = ElementRef

    // Вхідні параметри:
    @Input('text')              text:               string | null = null // Надпис на кнопці
    @Input('icon_name')         icon_name:          string | null = null
    @Input('sound_name')        sound_name:         string | null = null
    @Input('animation_type')    animation_type:     string | null = null
    @Input('is_disabled')       is_disabled:        boolean = false
    @Input('debug')             debug:              boolean = false
    @Input('size')              size:               string | null = 'normal'
    @Input('color')             color:              string = 'gray'

    default: any = {
        color:          ['green', 'red', 'yellow', 'gray', 'transparent'],
        size:          ['nano', 'small', 'normal', 'big', 'normal_wide'],
        animation_type: ['press']
    }



    clickIsBlocked: boolean = false

    constructor
    (
        public IconService: IconService
    )
    {

    }

    ngOnInit(): void
    {
        if(this.debug) {
            console.log('button debug', this)
        }

        if(this.icon_name != null) {
            if (!this.IconService.icons.hasOwnProperty(this.icon_name)) {
                this.icon_name = null
            }
        }


        if(!this.default.color.includes(this.color)) {
            this.color = 'gray'
        }

        if(!this.default.size.includes(this.size)) {
            this.size = 'normal'
        }
    }

    clicked()
    {
        this.button.nativeElement.classList.add('clicked')
        // this.playSoundClickedSound()
    }

    unClicked()
    {
        this.button.nativeElement.classList.remove('clicked')
        //this.playSoundUnClickedSound()
        this.leave()
    }




    hover()
    {
        this.button.nativeElement.classList.add('hover-animation')
    }

    leave()
    {
        this.button.nativeElement.classList.remove('hover-animation')
    }

    onClick()
    {
        if(this.clickIsBlocked) {
            return
        }

        this.clicked()
    }

    onTouchStart()
    {
        this.clickIsBlocked = true
        this.clicked()

        setTimeout( () => {
            this.clickIsBlocked = false
        }, 100)
    }

    onTouchEnd()
    {

        //this.unClicked()
    }

}

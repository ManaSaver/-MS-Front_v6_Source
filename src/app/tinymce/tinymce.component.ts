import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, ElementRef  } from '@angular/core';

import { TinymceService } from "../services/tinymce.service";

@Component({
    selector: 'app-tinymce',
    templateUrl: './tinymce.component.html',
    styleUrls: ['./tinymce.component.css']
})

export class TinymceComponent implements OnInit
{
    @Input('text') text: string = ''

    constructor
    (
        private TinymceService: TinymceService
    )
    {

    }

    ngOnInit(): void
    {
    }

    ngAfterViewInit(): void
    {
         // this.init()
    }

    ngOnChanges(changes: SimpleChanges)
    {
        if (this.TinymceService.editor.activeEditor != null) {
            this.TinymceService.editor.EditorManager.execCommand('mceRemoveEditor', true, 'editor');
        }

        this.init()
    }

    init()
    {
        let selector = 'textarea'

        // console.log('init tinycme', this.text)

        this.TinymceService.editor.init({

            /*theme_url: '../assets/tinymce/themes/silver/theme.min.js',*/
            selector: selector,
            menubar: false,
            statusbar: false,
            plugins: 'code link lists advlist image autoresize paste fullscreen',
            toolbar: 'undo redo | bold italic underline strikethrough | numlist bullist blockquote | link unlink | alignleft aligncenter | indent outdent | pastetext removeformat code fullscreen',
            skin_url: '../assets/tinymce/skins/ui/tinymce-5',
            skin: 'tinymce-5',
            content_css: false,
            // content_style: contentUiCss.toString() + '\n' + contentCss.toString(),
            branding: false,

            default_link_target: "_blank",
            link_context_toolbar: true,
            target_list: [
                {title: 'None', value: ''},
                {title: 'Same page', value: '_self'},
                {title: 'New page', value: '_blank'},
                {title: 'LIghtbox', value: '_lightbox'}
            ],


            width: '100%',
            height: 500,
            autoresize_min_height: 400,
            autoresize_max_height: 800,
            autoresize_bottom_margin: 127,
            content_style:`
            body {
    font-family: "Open Sans",sans-serif;
    font-size: 15px;
    letter-spacing: -.21px;
    line-height: 150%;
            }
            `
            ,
            setup: function (editor: any) {
                editor.on('init', function (e: any) {
                    // console.log('on init', e)
                });

                editor.on('NodeChange', function(e: any) {
                });
            },
        });

        this.TinymceService.editor.activeEditor.on('init', () => {
            this.TinymceService.editor.activeEditor.setContent(this.text);
        });

        // console.log('TinymceComponent', this.TinymceService.editor )

    }

    ngOnDestroy()
    {

    }

}

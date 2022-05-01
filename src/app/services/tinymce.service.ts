import { Injectable } from '@angular/core';

/* Import TinyMCE */
import tinymce from 'tinymce';
import 'tinymce/themes/silver';

import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin.css';

/* Import plugins */
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/code';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/image';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/fullscreen';

@Injectable({
    providedIn: 'root'
})

export class TinymceService
{
    editor: any

    constructor()
    {
        this.editor = tinymce
        // console.log('tinymce', tinymce)
    }


}

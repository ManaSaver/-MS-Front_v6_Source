import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class IconService
{
    icons: any =
    {
        'category': {
            'svg': '<svg data-svgs-path="sm1/label_outline.svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="nonzero" d="M3.914 11.086l6.5-6.5A2 2 0 0 1 11.828 4H18a2 2 0 0 1 2 2v6.172a2 2 0 0 1-.586 1.414l-6.5 6.5a2 2 0 0 1-2.828 0l-6.172-6.172a2 2 0 0 1 0-2.828zm.707.707a1 1 0 0 0 0 1.414l6.172 6.172a1 1 0 0 0 1.414 0l6.5-6.5a1 1 0 0 0 .293-.707V6a1 1 0 0 0-1-1h-6.172a1 1 0 0 0-.707.293l-6.5 6.5zM14.75 10.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"></path></svg>',
            'width': 0,
            'height': 0,
        },
        'list': {
            'svg': '<svg width="24" height="24"><path fill="currentColor" d="M10 11.5c0-.3.2-.5.5-.5h7c.3 0 .5.2.5.5s-.2.5-.5.5h-7a.5.5 0 0 1-.5-.5zm0 4c0-.3.2-.5.5-.5h7c.3 0 .5.2.5.5s-.2.5-.5.5h-7a.5.5 0 0 1-.5-.5zm0-8c0-.3.2-.5.5-.5h7c.3 0 .5.2.5.5s-.2.5-.5.5h-7a.5.5 0 0 1-.5-.5zm-4 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'menu': {
            'svg': '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M13 6.5A1.5 1.5 0 0114.5 5h3A1.5 1.5 0 0119 6.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 0113 9.5v-3zM6.5 13A1.5 1.5 0 005 14.5v3A1.5 1.5 0 006.5 19h3a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 009.5 13h-3zm8 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3zm-8-8A1.5 1.5 0 005 6.5v3A1.5 1.5 0 006.5 11h3A1.5 1.5 0 0011 9.5v-3A1.5 1.5 0 009.5 5h-3z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 6h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 0013 6.5v3a1.5 1.5 0 001.5 1.5h3A1.5 1.5 0 0019 9.5v-3A1.5 1.5 0 0017.5 5h-3zm-8 9h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 016.5 13h3a1.5 1.5 0 011.5 1.5v3A1.5 1.5 0 019.5 19h-3A1.5 1.5 0 015 17.5v-3zm9.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm-1.5.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5v-3zM6.5 6h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM5 6.5A1.5 1.5 0 016.5 5h3A1.5 1.5 0 0111 6.5v3A1.5 1.5 0 019.5 11h-3A1.5 1.5 0 015 9.5v-3z" fill="currentColor"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'edit': {
            'svg': ' <svg width="24" height="24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M9.5 19h10a.5.5 0 110 1h-10a.5.5 0 110-1z"></path><path stroke="currentColor" d="M4.42 16.03a1.5 1.5 0 00-.43.9l-.22 2.02a.5.5 0 00.55.55l2.02-.21a1.5 1.5 0 00.9-.44L18.7 7.4a1.5 1.5 0 000-2.12l-.7-.7a1.5 1.5 0 00-2.13 0L4.42 16.02z"></path></g></svg>',
            'width': 24,
            'height': 24,
        },
        'new_prev_item': {
            'svg': '<svg width="24" height="24"><path fill="currentColor" d="M9 6.74L6.35 9.4a.5.5 0 0 1-.7-.7l3.53-3.54a.5.5 0 0 1 .7 0l3.55 3.53a.5.5 0 0 1-.71.7L10 6.69V18.5a.5.5 0 1 1-1 0V6.74zM17 15h2.5a.5.5 0 1 1 0 1H17v2.5a.5.5 0 1 1-1 0V16h-2.5a.5.5 0 1 1 0-1H16v-2.5a.5.5 0 1 1 1 0V15z"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'new_next_item': {
            'svg': '<svg width="24" height="24"><path fill="currentColor" d="M9 17.26L6.35 14.6a.5.5 0 0 0-.7.7l3.53 3.54a.5.5 0 0 0 .7 0l3.55-3.53a.5.5 0 0 0-.71-.7L10 17.31V5.5a.5.5 0 1 0-1 0v11.76zM17 9h2.5a.5.5 0 1 0 0-1H17V5.5a.5.5 0 1 0-1 0V8h-2.5a.5.5 0 1 0 0 1H16v2.5a.5.5 0 1 0 1 0V9z"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'new_child_item': {
            'svg': '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g id="Layer_1"><title>Layer 1</title><line shape-rendering="crispEdges" stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_1" y2="17.99747" x2="7.22581" y1="3.67995" x1="7.22581" fill="none"></line><line shape-rendering="crispEdges" stroke="#000" stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_5" y2="17.51613" x2="15.89203" y1="17.51613" x1="6.78539" fill="none"></line><path id="svg_18" d="m18.54839,20.74194" opacity="undefined" stroke="#000" fill="none"></path><line shape-rendering="crispEdges" stroke="#000" id="svg_21" y2="17.87573" x2="16.39185" y1="14.06452" x1="12.58065" fill="none"></line><line shape-rendering="crispEdges" id="svg_23" y2="20.87358" x2="12.6748" y1="17.19355" x1="16.35484" stroke="#000" fill="none"></line></g></svg>',
            'width': 24,
            'height': 24,
        },
        'trash': {
            'svg': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><rect width="14" height="1" x="5" y="6" fill="currentColor" rx=".5"></rect><path fill="currentColor" d="M10 9h1v8h-1V9zm3 0h1v8h-1V9z"></path><path stroke="currentColor" d="M17.5 6.5h-11V18A1.5 1.5 0 0 0 8 19.5h8a1.5 1.5 0 0 0 1.5-1.5V6.5zm-9 0h7V5A1.5 1.5 0 0 0 14 3.5h-4A1.5 1.5 0 0 0 8.5 5v1.5z"></path></g></svg>',
            'width': 24,
            'height': 24,
        },
        'cancel': {
            'svg': '<svg viewBox="0 0 24 24" width="24" height="24" class="icon_close"><path fill="currentColor" fill-rule="nonzero" d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'confirm': {
            'svg': '<svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm0-1a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.9-11.4a.5.5 0 0 1 .7.8l-6 6a.5.5 0 0 1-.7 0l-2.5-2.5a.5.5 0 0 1 .7-.8l2.1 2.2L16 8.6z"></path></svg>',
            'width': 24,
            'height': 24,
        },

        'arrow_up': {
            'svg': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="5 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.854 5.146l3 3a.502.502 0 01-.708.708L17 6.707V18.5a.5.5 0 01-1 0V6.707l-2.146 2.147a.502.502 0 01-.708-.708l3-3a.502.502 0 01.708 0zM7.5 5a.5.5 0 01.5-.5z"></path></svg>',
            'width': 0,
            'height': 0,
        },

        'arrow_down': {
            'svg': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 24" aria-hidden="true"><path fill="currentColor" d="M16.854 0 01.708 0zM7.5 5a.5.5 0 01.5.5v11.791l2.146-2.145a.502.502 0 01.708.708l-3 3a.502.502 0 01-.708 0l-3-3a.502.502 0 01.708-.708L7 17.293V5.5a.5.5 0 01.5-.5z"></path></svg>',
            'width': 0,
            'height': 0,
        },
        'reload': {
            'svg': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M5.06 11.085l-1.17.955a.5.5 0 11-.633-.774l1.68-1.372a1 1 0 011.379.11l1.44 1.615a.5.5 0 01-.747.665l-.957-1.074a6 6 0 0010.934 4.13l.718.718A7 7 0 015.06 11.085zm13.905 1.62l1.07-.936a.5.5 0 01.66.752l-1.618 1.415a1 1 0 01-1.4-.082l-1.359-1.502a.5.5 0 01.742-.67l.902.997A6 6 0 007.014 8.661l-.718-.719a7 7 0 0112.67 4.764z"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'search': {
            'svg': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" class="search_icon"><path d="M10.5 3a7.5 7.5 0 015.645 12.438l4.709 4.708a.502.502 0 01-.708.708l-4.708-4.709A7.5 7.5 0 1110.5 3zm0 1a6.5 6.5 0 100 13 6.5 6.5 0 000-13z" fill="currentColor"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'backup': {
            'svg': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 18a3.75 3.75 0 01-1.243-7.29 3 3 0 013.81-3.098 5.5 5.5 0 0110.178 3.1A3.751 3.751 0 0117.751 18H14v-1h3.75a2.75 2.75 0 00.914-5.345l-.695-.245.028-.736L18 10.5a4.5 4.5 0 00-8.331-2.361l-.397.641-.726-.205a2.002 2.002 0 00-2.541 2.067l.053.76-.72.252A2.751 2.751 0 006.25 17H11v1H6.25zM13 11.707V20.5a.5.5 0 01-1 0v-8.793l-1.646 1.647a.5.5 0 01-.708-.708l2.5-2.5a.5.5 0 01.708 0l2.5 2.5a.5.5 0 01-.708.708L13 11.707z" fill="currentColor"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'copy': {
            'svg': '<svg width="24" height="24"><g _ngcontent-btd-c18="" fill="none"><path _ngcontent-btd-c18="" fill="currentColor" d="M11 13h2.5c.3 0 .5.2.5.5s-.2.5-.5.5H11v2.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V14H7.5a.5.5 0 0 1-.5-.5c0-.3.2-.5.5-.5H10v-2.5c0-.3.2-.5.5-.5s.5.2.5.5V13z"></path><rect _ngcontent-btd-c18="" width="12" height="12" x="4.5" y="7.5" stroke="currentColor" rx="2"></rect><path _ngcontent-btd-c18="" fill="currentColor" d="M19 16.7V6a1 1 0 0 0-1-1H7.3c.2-.3.4-.6.7-.7.3-.2.7-.3 1.6-.3h7.8c1 0 1.3 0 1.6.3.3.1.6.4.7.7.2.3.3.7.3 1.6v7.8c0 1 0 1.3-.3 1.6-.1.3-.4.5-.7.7zm-1.6.3H9.6h7.8z"></path></g></svg>',
            'width': 24,
            'height': 24,
        },
        'db_name': {
            'svg': '<svg width="24" height="24"><g fill="none"><path stroke="currentColor" d="M5.5 9.5V18A1.5 1.5 0 0 0 7 19.5h10a1.5 1.5 0 0 0 1.5-1.5V9.5h-13zm-1 0h15V7A1.5 1.5 0 0 0 18 5.5H6A1.5 1.5 0 0 0 4.5 7v2.5z"></path><rect width="6" height="1" x="9" y="12" fill="currentColor" rx=".5"></rect></g></svg>',
            'width': 24,
            'height': 24,
        },
        'attach': {
            'svg': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.646 5.646c1.3-1.3 3.408-1.3 4.708 0 1.251 1.252 1.298 3.253.139 4.56l-.14.148-4.824 4.825c-.845.844-2.213.844-3.058 0-.802-.802-.842-2.078-.12-2.927l.12-.13 3.325-3.326c.196-.195.512-.195.708 0 .173.174.192.443.057.638l-.057.07-3.325 3.325c-.454.453-.454 1.189 0 1.642.42.422 1.085.452 1.541.09l.101-.09 4.825-4.825c.91-.909.91-2.383 0-3.292-.868-.868-2.25-.908-3.165-.119l-.127.119-6.175 6.175c-1.365 1.364-1.365 3.578 0 4.942 1.316 1.317 3.42 1.364 4.793.141l.15-.14 3.674-3.676c.196-.195.512-.195.708 0 .173.174.192.443.057.638l-.057.07-3.675 3.675c-1.756 1.755-4.602 1.755-6.358 0-1.7-1.701-1.753-4.425-.159-6.19l.16-.168 6.174-6.175z"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'heart': {
            'svg': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill="none" stroke="currentColor" d="M12 18.345c5.642-4.767 6.354-5.448 7.099-6.988a3.79 3.79 0 0 0 .401-1.69c0-2.307-1.772-4.167-3.944-4.167-1.252 0-2.407.62-3.15 1.657L12 7.725l-.407-.568C10.851 6.12 9.696 5.5 8.444 5.5 6.272 5.5 4.5 7.36 4.5 9.667c0 .582.13 1.13.401 1.69.745 1.54 1.457 2.221 7.099 6.988z"></path></svg>',
            'width': 24,
            'height': 24,
        },
        'settings': {
            'svg': '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true"><g fill="none" fill-rule="evenodd"><path d="M3 3h18v18H3z"></path><path fill="currentColor" fill-rule="nonzero" d="M8.82 6.62l-.33.2-.82-.83a.63.63 0 00-.9 0l-.77.8a.62.62 0 00-.01.89l.82.82-.2.34a6.21 6.21 0 00-.66 1.6l-.1.38H4.69a.63.63 0 00-.63.64v1.1c0 .36.28.64.63.64h1.16l.1.37a6.21 6.21 0 00.66 1.61l.2.34-.82.82a.63.63 0 000 .9l.79.77a.62.62 0 00.89.01l.82-.82.34.2a6.21 6.21 0 001.6.66l.38.1v1.16c0 .35.28.63.64.63h1.1a.62.62 0 00.64-.63v-1.16l.37-.1a6.21 6.21 0 001.61-.67l.34-.2.82.83c.25.25.64.24.9 0l.77-.79a.62.62 0 00.01-.89l-.82-.82.2-.33a6.21 6.21 0 00.66-1.62l.1-.37h1.16a.63.63 0 00.63-.64v-1.1a.62.62 0 00-.63-.64h-1.16l-.1-.37a6.21 6.21 0 00-.67-1.61l-.2-.34.83-.82a.63.63 0 000-.9l-.8-.78a.62.62 0 00-.89-.01l-.82.82-.33-.2a6.21 6.21 0 00-1.62-.66l-.37-.1V4.69a.63.63 0 00-.64-.63h-1.1a.62.62 0 00-.64.63v1.16l-.37.1a6.21 6.21 0 00-1.61.66zm1-1.53v-.4c0-.9.72-1.63 1.63-1.63h1.1c.9 0 1.64.72 1.64 1.63v.4c.4.12.78.28 1.15.48l.28-.29a1.62 1.62 0 012.3.01l.79.78c.64.64.65 1.67 0 2.3l-.28.29c.2.37.36.75.48 1.15h.4c.9 0 1.63.73 1.63 1.64v1.1c0 .9-.73 1.64-1.63 1.64h-.4a7.2 7.2 0 01-.48 1.15l.29.28a1.62 1.62 0 01-.01 2.3l-.78.79a1.63 1.63 0 01-2.3 0l-.29-.28c-.37.2-.75.36-1.15.48v.4c0 .9-.73 1.63-1.64 1.63h-1.1A1.63 1.63 0 019.8 19.3v-.4a7.2 7.2 0 01-1.15-.48l-.29.29a1.62 1.62 0 01-2.3-.01l-.78-.78a1.63 1.63 0 010-2.3l.27-.29a7.2 7.2 0 01-.47-1.15h-.4c-.9 0-1.63-.73-1.63-1.64v-1.1c0-.9.72-1.64 1.63-1.64h.4c.12-.4.28-.78.47-1.15l-.28-.29a1.62 1.62 0 01.01-2.3l.78-.78a1.63 1.63 0 012.3 0l.29.27c.37-.19.75-.35 1.15-.47z"></path><path fill="currentColor" fill-rule="nonzero" d="M12 14a2 2 0 100-4 2 2 0 000 4zm0 1a3 3 0 110-6 3 3 0 010 6z"></path></g></svg>',
            'width': 0,
            'height': 0,
        },


        't': {
            'svg': '',
            'width': 0,
            'height': 0,
        },
        //
    }



    constructor() { }
}

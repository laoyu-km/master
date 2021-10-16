function tab(filed) {
    switch (filed) {
        case 'tab':
            return `<div class="tab-item {{ currentName }} "> {{ tab }} </div>`;
        case 'page':
            return `<div class="page-item {{ currentName }} "> {{ page }} </div>`;
        default:
            break;
    }
}

export default { tab };
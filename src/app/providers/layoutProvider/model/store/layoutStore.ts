import { defineStore } from 'pinia';
import { IBreadcrumb } from '../types/breadcrumb';

interface LayoutStore {
    dataLoading: boolean;
    extraBreadcrumb: IBreadcrumb[];
    replacementBreadcrumb: IBreadcrumb[];
}

export const useLayoutStore = defineStore('layout', {
    state: (): LayoutStore => ({
        dataLoading: false,
        extraBreadcrumb: [],
        replacementBreadcrumb: [],
    }),
    actions: {
        setExtraBreadcrumb(breadcrumb: IBreadcrumb[]) {
            this.extraBreadcrumb = breadcrumb;
        },
        setReplacementBreadcrumb(breadcrumb: IBreadcrumb[]) {
            this.replacementBreadcrumb = breadcrumb;
        },
        setDataLoading(value: boolean) {
            this.dataLoading = value;
        },
    },
});

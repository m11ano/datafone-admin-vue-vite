import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouterProvider } from '@/shared/lib/injectHooks';
import { IBreadcrumb } from '../model/types/breadcrumb';
import { getModuleRoutePath } from '@/shared/lib/getters/getModuleRoutePath/getModuleRoutePath';
import { useLayoutStore } from '../model/store/layoutStore';

type IBreadcrumbCanBe = IBreadcrumb | (() => IBreadcrumb);
type ITitleCanBe = string | (() => string);

const processBreadcrumb = (breadcrumb: IBreadcrumbCanBe): IBreadcrumb => (typeof breadcrumb === 'function' ? breadcrumb() : { ...breadcrumb });
const processTitle = (title: ITitleCanBe): string => (typeof title === 'function' ? title() : title);

export const useGetBreadcrumb = () => {
    const { routeData } = useRouterProvider();
    const route = useRoute();
    const layoutStore = useLayoutStore();

    return computed<IBreadcrumb[]>(() => {
        const result: IBreadcrumb[] = [];

        if (layoutStore.replacementBreadcrumb.length > 0) {
            /** If replacement breadcrumb set */
            result.push(...layoutStore.replacementBreadcrumb);
        } else {
            if (routeData.value.type === 'page' && route.meta.breadcrumb) {
                /** For routes with type "page" */
                if (Array.isArray(route.meta.breadcrumb)) {
                    route.meta.breadcrumb.forEach((breadcrumb) => {
                        result.push(processBreadcrumb(breadcrumb));
                    });
                } else {
                    result.push(processBreadcrumb(route.meta.breadcrumb as IBreadcrumbCanBe));
                }
            } else if (routeData.value.type === 'module' && routeData.value.module) {
                /** For routes with type "module" */
                const modulePath = getModuleRoutePath(routeData.value.module.data);

                result.push({
                    title: routeData.value.module.data.config.title,
                    url: modulePath,
                });

                if (routeData.value.module.data.config.routes) {
                    let routesItems = routeData.value.module.data.config.routes;
                    let url = modulePath;
                    routeData.value.module.routes.every((rId) => {
                        if (!routesItems[rId]) {
                            return false;
                        }

                        const { kids, meta, path } = routesItems[rId];
                        if (meta && meta.title) {
                            const title = processTitle(meta.title);
                            url = [url, path].filter((v) => v.length > 0).join('/');

                            result.push({
                                title,
                                url,
                            });
                        }

                        if (kids) {
                            routesItems = kids;
                        }

                        return true;
                    });
                }
            }

            if (layoutStore.extraBreadcrumb.length > 0) {
                result.push(...layoutStore.extraBreadcrumb);
            }
        }

        return result;
    });
};

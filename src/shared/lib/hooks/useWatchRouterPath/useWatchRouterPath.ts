import { watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';

export const useWatchRouterPath = (handler: (route: RouteLocationNormalizedLoaded, oldRoute?: RouteLocationNormalizedLoaded) => void) => {
    const router = useRouter();

    watch(
        router.currentRoute,
        (value, oldValue) => {
            handler(value, oldValue);
        },
        { immediate: true },
    );
};

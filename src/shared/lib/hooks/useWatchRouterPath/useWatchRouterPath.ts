import { watch } from 'vue';
import { useRouter } from 'vue-router';

export const useWatchRouterPath = (handler: () => void) => {
    const router = useRouter();

    watch(
        router.currentRoute,
        () => {
            handler();
        },
        { immediate: true },
    );
};

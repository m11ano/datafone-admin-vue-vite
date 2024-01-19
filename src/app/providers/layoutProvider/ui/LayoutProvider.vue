<script setup lang="ts">
import { watch, provide, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { NotAuthLayout } from '@/layouts/NotAuthLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { layoutProviderInjectKey } from '@/injectionKeys';
import { useGetBreadcrumb } from '../hooks/useGetBreadcrumb';
import { useLayoutStore } from '../model/store/layoutStore';
import { useSessionUserProvider } from '@/shared/lib/injectHooks';

const props = defineProps<{
    routerLoading: boolean;
}>();

const {
    data: { isAuth },
} = useSessionUserProvider();

const router = useRouter();
const layoutStore = useLayoutStore();

const breadcrumb = useGetBreadcrumb();

provide(layoutProviderInjectKey, {
    breadcrumb,
    setExtraBreadcrumb: layoutStore.setExtraBreadcrumb,
    setReplacementBreadcrumb: layoutStore.setReplacementBreadcrumb,
    setDataLoading: layoutStore.setDataLoading,
});

router.afterEach((from, to) => {
    if (from.fullPath !== to.fullPath) {
        layoutStore.setExtraBreadcrumb([]);
        layoutStore.setReplacementBreadcrumb([]);
    }
});

watch(
    breadcrumb,
    () => {
        const mainTitle = 'Панель управления';
        const titles = [...breadcrumb.value].reverse().map((item) => item.title);
        titles.push(mainTitle);
        document.title = titles.join(' / ');
    },
    { immediate: true },
);
</script>

<template>
    <template v-if="isAuth">
        <AuthLayout
            :routerLoading="props.routerLoading"
            :dataLoading="layoutStore.dataLoading"
        >
            <slot></slot>
        </AuthLayout>
    </template>
    <template v-else>
        <NotAuthLayout :routerLoading="props.routerLoading">
            <slot></slot>
        </NotAuthLayout>
    </template>
</template>

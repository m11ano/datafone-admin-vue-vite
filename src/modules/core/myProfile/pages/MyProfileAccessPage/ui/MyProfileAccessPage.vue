<script setup lang="ts">
import classNames from 'classNames';
import { ref } from 'vue';
import { useLayoutProvider } from '@/shared/lib/injectHooks';
import { useWatchRouterPath } from '@/shared/lib/hooks/useWatchRouterPath';

defineProps<{
    className?: string;
}>();

const { setDataLoading, setReplacementBreadcrumb } = useLayoutProvider();

const breadcrumb = ref<string>('');

const loadData = (): Promise<void> =>
    new Promise((resolve) => {
        setDataLoading(true);
        setTimeout(() => {
            breadcrumb.value = 'TEST';
            setDataLoading(false);
            resolve();
        }, 1000);
    });

useWatchRouterPath(async (route, oldRoute) => {
    if (!oldRoute || route.params.id !== oldRoute.params.id) {
        await loadData();
    }
    // setReplacementBreadcrumb([{ title: breadcrumb.value }]);
});
</script>

<template>
    <div :class="classNames($style.myProfileAccessPage, className)">
        Мой профиль - доступ
        <RouterLink to="/myProfile/">маин</RouterLink>
        !
        <RouterLink to="/myProfile/access">доступ</RouterLink>
        !
        <RouterLink to="/myProfile/access/12">субкид</RouterLink>
        !
        <RouterLink to="/myProfile/access/12?1=1">субкид 2</RouterLink>
    </div>
</template>

<style lang="less" module>
// @import '~includes.less';
.myProfileAccessPage {
}
</style>

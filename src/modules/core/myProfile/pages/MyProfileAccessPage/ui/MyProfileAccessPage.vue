<script setup lang="ts">
import classNames from 'classNames';

import { useLayoutProvider } from '@/shared/lib/injectHooks';
import { useWatchRouterPath } from '@/shared/lib/hooks/useWatchRouterPath';

defineProps<{
    className?: string;
}>();

const { setExtraBreadcrumb, setDataLoading } = useLayoutProvider();

const setBreadcrumb = () => {
    setDataLoading(true);
    setTimeout(() => {
        setExtraBreadcrumb([{ title: 'TEST' }]);
        setDataLoading(false);
    }, 1000);
};

useWatchRouterPath(() => {
    setBreadcrumb();
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

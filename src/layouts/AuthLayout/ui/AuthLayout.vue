<script setup lang="ts">
import classNames from 'classNames';
import { useLayoutProvider } from '@/shared/lib/injectHooks';
import AuthLayoutHeader from './AuthLayoutHeader.vue';
import Loader from '@/shared/ui/Loader/Loader.vue';

const props = defineProps<{
    routerLoading: boolean;
    dataLoading: boolean;
}>();

const { breadcrumb } = useLayoutProvider();
</script>

<template>
    <div class="authLayout">
        <AuthLayoutHeader />
        <div
            v-if="props.routerLoading || props.dataLoading"
            :class="$style.loaderWrapper"
        >
            <Loader position="center" />
        </div>

        <div
            v-if="!props.routerLoading"
            :class="classNames(props.dataLoading ? $style.hide : false)"
        >
            {{ breadcrumb }}!
            <slot></slot>
        </div>
    </div>
</template>

<style lang="less" module>
.loaderWrapper {
    padding: 20px;
}

.hide {
    width: 1px;
    height: 1px;
    overflow: hidden;
    opacity: 0.01;
}
</style>

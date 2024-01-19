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
        <template v-if="props.routerLoading || props.dataLoading"
            ><div :class="$style.loaderWrapper"><Loader position="center" /></div
        ></template>
        <template v-if="!props.routerLoading">
            <div :class="classNames(props.dataLoading ? $style.hide : false)">
                {{ breadcrumb }}!
                <slot></slot>
            </div>
        </template>
    </div>
</template>

<style lang="less" module>
.loaderWrapper {
    padding: 20px;
}

.hide {
    display: none;
}
</style>

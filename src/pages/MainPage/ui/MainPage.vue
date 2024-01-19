<script setup lang="ts">
import Title from 'ant-design-vue/es/typography/Title';
import classNames from 'classNames';
import { useRoute } from 'vue-router';

defineProps<{
    className?: string;
}>();

const route = useRoute();
</script>

<template>
    {{ route.meta }}
    <div :class="classNames($style.mainPage, className)">
        <Title :level="4">Добро пожаловать в админку!</Title>
        <RouterLink to="/gg">To test</RouterLink>
    </div>
</template>

<style lang="less" module>
// @import '~includes.less';
.mainPage {
}
</style>

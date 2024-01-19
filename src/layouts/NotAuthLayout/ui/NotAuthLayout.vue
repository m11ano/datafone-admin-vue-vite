<script setup lang="ts">
const props = defineProps<{
    routerLoading: boolean;
}>();
</script>

<template>
    <FullPageLoader v-if="props.routerLoading" />
    <div
        class="notAuthLayout"
        v-else
    >
        <slot></slot>
    </div>
</template>

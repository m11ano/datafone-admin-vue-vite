import { inject } from 'vue';
import { layoutProviderInjectKey } from '@/injectionKeys';

export const useLayoutProvider = () => inject(layoutProviderInjectKey)!;

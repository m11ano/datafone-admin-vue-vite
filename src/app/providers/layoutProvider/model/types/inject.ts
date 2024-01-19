import { useGetBreadcrumb } from '../../hooks/useGetBreadcrumb';
import { IBreadcrumb } from './breadcrumb';

export interface LayoutProviderInject {
    breadcrumb: ReturnType<typeof useGetBreadcrumb>;
    setExtraBreadcrumb: (data: IBreadcrumb[]) => void;
    setReplacementBreadcrumb: (data: IBreadcrumb[]) => void;
    setDataLoading: (value: boolean) => void;
}

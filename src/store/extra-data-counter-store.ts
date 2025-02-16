import { SourceDataTable } from '@/types/source';
import { create } from 'zustand';
import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}

export type Data = {
    sources?: SourceDataTable[];
  };

interface useExtraDataCounterStore {
    data: Data;
    setData: (data: any) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useExtraDataCounter = createSelectors(create<useExtraDataCounterStore>((set) => ({
    data: {},
    isLoading: false,
    setIsLoading: (isLoading) => {
        set(() => ({ isLoading }))
    },
    setData: (data) => {
        set(() => ({ data }))
    },
})));

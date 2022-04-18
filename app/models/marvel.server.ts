import type { IMarvelResponse } from '~/types/global';
import { api } from '~/Utils/AxiosConfig';

export async function searchHeroData(heroName: string) {
    const response = await api.get<IMarvelResponse>(`/characters`, {
        params: {
            nameStartsWith: heroName
        }
    }).then(res => res.data.data.results);

    return response
}

export async function getHeroData(heroId: string) {
    const response = await api.get<IMarvelResponse>(`/characters/${heroId}`, {})
        .then(res => res.data.data.results[0]);

    return response
}

export async function getComicsData(heroId: string) {
    const response = await api.get<IMarvelResponse>(`/characters/${heroId}/comics`, {})
        .then(res => res.data.data.results);

    return response
}
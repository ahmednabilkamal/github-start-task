import { useQuery } from '@tanstack/react-query';

import { fetchRepositories } from '../api/githubAPI';
import { useAppStore } from '../store/useAppStore';

export function useFetchRepos() {
  const { top, language, createdFrom } = useAppStore();
  return useQuery({
    queryKey: ['repos', top, language, createdFrom],
    queryFn: () => fetchRepositories({ language, createdFrom, per_page: top }),
  });
}

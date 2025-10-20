import axios from 'axios';

export async function fetchRepositories({
  language,
  createdFrom,
  per_page,
}: {
  language: string;
  createdFrom: string;
  per_page: number;
}) {
  const query = `language:${language}+created:>${createdFrom}`;
  const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=${per_page}`;
  const { data } = await axios.get(url);
  return data.items;
}

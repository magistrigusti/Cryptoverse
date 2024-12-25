import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Заголовки API
const cryptoNewsHeaders = {
  'x-rapidapi-key': '3454bd42c9msh63c0bbba9b04360p1d3819jsn7488e5931c28',
  'x-rapidapi-host': 'crypto-news16.p.rapidapi.com',
};

// Базовый URL API
const baseUrl = 'https://crypto-news16.p.rapidapi.com/news/yahoo';

// Функция для создания запросов
const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// Конфигурация RTK Query
export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi', // Уникальный путь в state Redux
  baseQuery: fetchBaseQuery({ baseUrl }), // Базовый запрос с fetchBaseQuery
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest(''), // Пустая строка, так как маршрут фиксированный
    }),
  }),
});

// Экспортируем хук
export const { useGetCryptoNewsQuery } = cryptoNewsApi;

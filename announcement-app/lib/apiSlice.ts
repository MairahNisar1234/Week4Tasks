import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 1. Define the shape of a single announcement
export interface Announcement {
  id: number;
  message: string;
  date: string;
}

export const appApi = createApi({
  reducerPath: 'appApi',
  // baseUrl should not have a trailing slash
  baseQuery: fetchBaseQuery({ baseUrl: 'https://announcement-page.onrender.com' }),
  tagTypes: ['Announcement'],
  endpoints: (builder) => ({
    
    // GET: Fetch all announcements
    getAnnouncements: builder.query<Announcement[], void>({
      query: () => '/announcements',
      providesTags: ['Announcement'],
    }),

    // POST: Send a new announcement to the server
    addAnnouncement: builder.mutation<void, string>({
      query: (message) => ({
        url: '/announcement', 
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: ['Announcement'],
    }),

  }),
});

export const { useGetAnnouncementsQuery, useAddAnnouncementMutation } = appApi;
"use client";
import { useGetAnnouncementsQuery } from '@/lib/apiSlice';
import { useParams } from 'next/navigation';

export default function AnnouncementDetailPage() {
  const params = useParams();
  const id = params?.id;
  
  const { data: announcements, isLoading } = useGetAnnouncementsQuery();

  const post = announcements?.find((a) => a.id.toString() === id);

  if (isLoading) return <div className="p-10 text-center">Loading announcement...</div>;

  if (!post) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">404 - Not Found</h1>
        <p className="text-zinc-500">We couldn't find an announcement with ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-zinc-100">
        <h1 className="text-4xl font-black text-zinc-900 mb-6">{post.message}</h1>
        <p className="text-zinc-400 text-sm">
          Posted on: {new Date(post.date).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
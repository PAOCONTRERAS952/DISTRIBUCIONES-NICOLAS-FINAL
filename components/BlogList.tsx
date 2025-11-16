
import React from 'react';
import type { BlogPost } from '../types';
import { BlogPostCard } from './BlogPostCard';

interface BlogListProps {
  posts: BlogPost[];
  onViewPost: (post: BlogPost) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ posts, onViewPost }) => {
  return (
    <div className="bg-neutral-bg">
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-neutral-text">Nuestro Blog de Bienestar</h1>
                <p className="mt-4 text-lg text-neutral-subtle max-w-2xl mx-auto">
                    Consejos, guías y novedades sobre salud y limpieza para ayudarte a cuidar de ti y de los tuyos.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <BlogPostCard key={post.id} post={post} onReadMore={onViewPost} />
                ))}
            </div>
        </div>
    </div>
  );
};

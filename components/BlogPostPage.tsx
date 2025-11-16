
import React from 'react';
import type { BlogPost } from '../types';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBack }) => {
  return (
    <div className="bg-neutral-bg py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <button onClick={onBack} className="text-neutral-accent hover:underline flex items-center gap-2 mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Volver al Blog
                </button>
                <article className="bg-neutral-card p-6 sm:p-10 rounded-xl shadow-lg border border-slate-200/50">
                    <header>
                        <p className="text-base font-semibold text-neutral-secondary mb-2">{post.category}</p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-text leading-tight mb-4">{post.title}</h1>
                        <div className="text-sm text-neutral-subtle flex items-center gap-4">
                            <span>Por <strong>{post.author}</strong></span>
                            <span>{post.date}</span>
                        </div>
                    </header>
                    <div className="my-8 rounded-lg overflow-hidden">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[400px] object-cover" />
                    </div>
                    <div className="prose prose-lg max-w-none text-neutral-text leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </div>
                </article>
            </div>
        </div>
    </div>
  );
};

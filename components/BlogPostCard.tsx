
import React from 'react';
import type { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onReadMore }) => {
  return (
    <div className="bg-neutral-card rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group flex flex-col">
      <div className="overflow-hidden h-56">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div>
          <p className="text-sm font-semibold text-neutral-secondary mb-2">{post.category}</p>
          <h3 
            className="text-xl font-bold text-neutral-text leading-tight group-hover:text-neutral-accent transition-colors"
            title={post.title}
          >
            {post.title}
          </h3>
          <p className="text-neutral-subtle my-3 text-base h-20 overflow-hidden">
            {post.excerpt}
          </p>
        </div>
        <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center">
            <div className="text-sm text-neutral-subtle">
                <span>{post.author}</span> &bull; <span>{post.date}</span>
            </div>
            <button 
                onClick={() => onReadMore(post)}
                className="text-sm font-bold text-neutral-accent hover:underline"
            >
                Leer Más
            </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import mediumPosts from '../data/medium-posts.json';
import '../css/medium-cards.css';

interface Post {
    title: string;
    link: string;
    pubDate: string;
    image: string;
    description: string;
    categories: string[];
}

const MediumCards: React.FC = () => {
    const posts = (mediumPosts as Post[]).slice(0, 9);

    return (
        <div className="medium-grid">
            {posts.map((post, index) => (
                <a
                    key={index}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="medium-card"
                >
                    {post.image ? (
                        <div className="medium-card-media">
                            <img src={post.image} alt="" loading="lazy" />
                        </div>
                    ) : (
                        <div className="medium-card-media medium-card-media--empty">
                            <span>&gt;_</span>
                        </div>
                    )}
                    <div className="medium-card-body">
                        <div className="medium-card-tags">
                            {post.categories.slice(0, 3).map(cat => (
                                <span key={cat} className="medium-card-tag">#{cat}</span>
                            ))}
                        </div>
                        <h3 className="medium-card-title">{post.title}</h3>
                        <p className="medium-card-desc">{post.description}</p>
                        <div className="medium-card-footer">
                            <span className="medium-card-date">
                                {new Date(post.pubDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </span>
                            <span className="medium-card-read">read ↗</span>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default MediumCards;

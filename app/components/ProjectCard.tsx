import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectCardProps {
  title: string;
  image: string;
  points: string[];
  imageType?: 'gif' | 'static';
  arxiv?: string;
  website?: string;
  video?: string;
  code?: string;
  twitter?: string;
  authors?: string[];
  role?: string;
}

export default function ProjectCard({ 
  title, 
  image, 
  points, 
  imageType = 'static',
  arxiv,
  website,
  video,
  code,
  twitter,
  authors,
  role
}: ProjectCardProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (code && code.includes('github.com')) {
      const repoPath = code.split('github.com/')[1].replace(/\/$/, '');
      fetch(`https://api.github.com/repos/${repoPath}`)
        .then(res => res.json())
        .then(data => {
          if (data.stargazers_count) {
            setStars(data.stargazers_count);
          }
        })
        .catch(err => console.error('Error fetching GitHub stars:', err));
    }
  }, [code]);

  return (
    <div className="flex flex-col md:flex-row items-start bg-white p-6 rounded-3xl shadow-md max-w-6xl mx-auto space-y-6 md:space-y-0 md:space-x-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50 group">
      <div className="w-full md:w-[500px] h-[300px] relative rounded-2xl overflow-hidden bg-gray-100 transition-transform duration-300 group-hover:scale-[1.02]">
        {imageType === 'gif' ? (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        )}
        {role && (
          <div className="absolute top-4 left-4 bg-[#000000]/80 text-white px-3 py-1 rounded-full text-sm font-medium">
            {role}
          </div>
        )}
        {authors && (
          <div className="absolute bottom-0 left-0 right-0 bg-[#000000]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            <div className="text-white">
              <h3 className="text-sm font-semibold mb-1">Authors</h3>
              <div className="text-xs leading-relaxed">
                {authors.map((author, index) => (
                  <span key={index}>
                    {author.includes("Wenli Xiao") ? (
                      <span className="font-bold text-blue-300">{author}</span>
                    ) : (
                      author
                    )}
                    {index < authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {website ? (
            <a 
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors duration-300"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </h2>
        <div className="text-sm text-gray-500 mb-4">
          {points.map((point, index) => (
            <div key={index} className="mb-1">
              {point}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 mt-4 text-sm">
          {arxiv && (
            <a 
              href={arxiv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              arXiv
            </a>
          )}
          {website && (
            <a 
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
              </svg>
              Website
            </a>
          )}
          {video && (
            <a 
              href={video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Video
            </a>
          )}
          {twitter && (
            <a 
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              Twitter
            </a>
          )}
          {code && (
            <a 
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"></path>
              </svg>
              Code
              {stars !== null && (
                <span className="text-gray-400 text-xs flex items-center gap-0.5">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  {stars.toLocaleString()}
                </span>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 
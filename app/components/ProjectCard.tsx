import Image from "next/image";

interface ProjectCardProps {
  title: string;
  image: string;
  points: string[];
  link?: string;
  imageType?: 'gif' | 'static';
  arxiv?: string;
  website?: string;
  video?: string;
  code?: string;
  twitter?: string;
  authors?: string[];
}

export default function ProjectCard({ 
  title, 
  image, 
  points, 
  link, 
  imageType = 'static',
  arxiv,
  website,
  video,
  code,
  twitter,
  authors
}: ProjectCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-start bg-white p-6 rounded-3xl shadow-md max-w-6xl mx-auto space-y-6 md:space-y-0 md:space-x-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50 group">
      <div className="w-full md:w-[500px] h-[300px] relative rounded-2xl overflow-hidden bg-gray-100 transition-transform duration-300 group-hover:scale-[1.02]">
        {imageType === 'gif' ? (
          <img
            src={image}
            alt={title}
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
        {authors && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
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

      <div className="flex-1">
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
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          {arxiv && (
            <a 
              href={arxiv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              arXiv
            </a>
          )}
          {website && (
            <a 
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Website
            </a>
          )}
          {video && (
            <a 
              href={video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Video
            </a>
          )}
          {code && (
            <a 
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Code
            </a>
          )}
          {twitter && (
            <a 
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
  );
} 
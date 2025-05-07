import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="flex items-center bg-[#f8f6ff] p-8 rounded-3xl shadow-lg max-w-[1200px] mx-auto space-x-8">
      <div className="flex-shrink-0">
        <Image
          className="h-40 w-40 rounded-full border-4 border-white shadow-md"
          src="/images/wenli-ny.jpeg"
          alt="Profile"
          width={160}
          height={160}
        />
      </div>
      <div className="flex-1">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Wenli Xiao</h2>
        <p className="text-xl font-medium text-gray-600 mb-4">PhD Student in Robotics at CMU School of Computer Science</p>
        <p className="text-gray-500 text-lg leading-relaxed">
          I am a PhD student in Robotics at Carnegie Mellon University's School of Computer Science, advised by Prof. Guanya Shi and Prof. John Dolan. 
          Currently doing research intern at NVIDIA GEAR Lab working with Dr. Jim Fan and Prof. Yuke Zhu on foundation model for humanoids.
        </p>
        <div className="mt-6 flex gap-6">
          <a href="mailto:randyxiao64@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors text-lg">Email</a>
          <a href="https://scholar.google.com/citations?user=WGbVYzsAAAAJ&hl=en" className="text-blue-600 hover:text-blue-800 transition-colors text-lg">Google Scholar</a>
          <a href="https://twitter.com/_wenlixiao" className="text-blue-600 hover:text-blue-800 transition-colors text-lg">Twitter</a>
          <a href="https://github.com/WENLIXIAO-CS" className="text-blue-600 hover:text-blue-800 transition-colors text-lg">Github</a>
        </div>
      </div>
    </div>
  );
} 
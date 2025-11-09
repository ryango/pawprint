
import React from 'react';
import { ImageFile } from '../types';

interface ImageGridProps {
    originalImage: ImageFile;
    generatedImages: string[];
    hasPaid?: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({ originalImage, generatedImages, hasPaid = false }) => {
    const handleDownload = (imageSrc: string, index: number) => {
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = `pet-pic-party-${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Original Image */}
            <div className="lg:col-span-1 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-slate-300 mb-4">Your Pet</h2>
                <div className="aspect-square w-full max-w-sm lg:max-w-none bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                    <img
                        src={`data:${originalImage.type};base64,${originalImage.base64}`}
                        alt="Original Pet"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Generated Images */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-slate-300 mb-4 text-center lg:text-left">AI Remix!</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {generatedImages.map((src, index) => (
                        <div key={index} className="relative aspect-square bg-slate-800 rounded-lg overflow-hidden shadow-lg animate-fade-in transition-transform duration-300 hover:scale-105 group">
                            <img
                                src={src}
                                alt={`Generated Pet ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {hasPaid && (
                                <button
                                    onClick={() => handleDownload(src, index)}
                                    className="absolute bottom-2 right-2 bg-pink-600 text-white p-2 rounded-lg shadow-lg hover:bg-pink-700 transition-all opacity-0 group-hover:opacity-100"
                                    title="Download image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                     {generatedImages.length > 0 && generatedImages.length < 4 && Array.from({ length: 4 - generatedImages.length }).map((_, index) => (
                        <div key={`placeholder-${index}`} className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center animate-pulse">
                            <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10m16-10v10M4 17h16M4 7h16M9 4v16M15 4v16"></path></svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageGrid;

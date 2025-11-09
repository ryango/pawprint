
import React from 'react';
import { ImageFile } from '../types';

interface ImageGridProps {
    originalImage: ImageFile;
    generatedImages: string[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ originalImage, generatedImages }) => {
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
                        <div key={index} className="aspect-square bg-slate-800 rounded-lg overflow-hidden shadow-lg animate-fade-in transition-transform duration-300 hover:scale-105">
                            <img
                                src={src}
                                alt={`Generated Pet ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
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

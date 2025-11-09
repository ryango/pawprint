
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Loader from './components/Loader';
import ImageGrid from './components/ImageGrid';
import { generateFunnyPetImages } from './services/geminiService';
import { ImageFile } from './types';

const App: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = useCallback(async (file: ImageFile) => {
        setOriginalImage(file);
        setGeneratedImages([]);
        setError(null);
        setIsLoading(true);

        try {
            const images = await generateFunnyPetImages(file);
            setGeneratedImages(images);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Oops! Something went wrong. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleReset = () => {
        setOriginalImage(null);
        setGeneratedImages([]);
        setError(null);
        setIsLoading(false);
    };

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }
        if (error) {
            return (
                <div className="text-center bg-red-900/50 border border-red-700 p-4 rounded-lg">
                    <p className="text-red-300">{error}</p>
                    <button
                        onClick={handleReset}
                        className="mt-4 px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            );
        }
        if (originalImage) {
            return (
                <div className="w-full flex flex-col items-center gap-6">
                    <ImageGrid originalImage={originalImage} generatedImages={generatedImages} />
                     <button
                        onClick={handleReset}
                        className="mt-6 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105"
                    >
                        Upload Another Pet!
                    </button>
                </div>
            );
        }
        return <FileUpload onFileUpload={handleFileUpload} disabled={isLoading} />;
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans">
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center">
                {renderContent()}
            </main>
            <footer className="text-center p-4 text-slate-500 text-sm">
                <p>Powered by Gemini. For entertainment purposes only.</p>
            </footer>
        </div>
    );
};

export default App;

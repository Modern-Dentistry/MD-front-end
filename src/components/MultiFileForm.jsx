        import { useState, useRef } from 'react';
        import AddPhotoIcon from '../assets/icons/AddPhoto';
        import CloseIcon from '../assets/icons/Close';
        import DownloadIcon from '../assets/icons/Download';

        const MultiFileForm = ({ initialFiles = [], mode = 'edit' }) => {
        const [files, setFiles] = useState(initialFiles || []);
        const [selectedImage, setSelectedImage] = useState(null);
        const fileInputRef = useRef(null);
        
        const handleDeleteImage = (index) => {
            setFiles(prev => prev.filter((_, i) => i !== index));
        };

        const handleImageClick = (file) => {
            if (mode === 'view') {
            setSelectedImage(file);
            }
        };

        const handleDownload = (file) => {
            const link = document.createElement('a');
            link.href = file;
            link.download = 'image.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        
        const handleFileSelect = (event) => {
            const selectedFiles = Array.from(event.target.files);
            const imageUrls = selectedFiles.map(file => URL.createObjectURL(file));
            setFiles(prev => [...prev, ...imageUrls]);
        };

        const handleUploadClick = () => {
            fileInputRef.current.click();
        };

        return (
            <div className='flex flex-col w-full border border-[#E5E7EB] rounded-lg p-4 gap-2'>
                {mode === 'edit' && (
                    <div className='flex justify-start items-center'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                            multiple
                            className="hidden"
                        />
                        <button 
                            className='flex items-center gap-2 bg-[#155EEF] text-white px-4 py-2 rounded-lg'
                            onClick={handleUploadClick}
                            type='button'
                        >
                            <AddPhotoIcon />
                            <span>Fayl yüklə</span>
                        </button>
                    </div>
                )}

                <div className='flex flex-wrap gap-4'>
                    {files.map((file, index) => (
                        <div key={index} className='relative'>
                            <div 
                                className='w-[85px] h-[85px] rounded-lg overflow-hidden border border-[#121926] cursor-pointer'
                                onClick={() => handleImageClick(file)}
                            >
                                <img 
                                    src={file} 
                                    alt={`file-${index}`}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            {mode === 'edit' ? (
                                <button 
                                    className='absolute -top-1 -right-1 text-white'
                                    onClick={() => handleDeleteImage(index)}
                                    type='button'
                                >
                                    <CloseIcon className="w-3 h-3" />
                                </button>
                            ) : (
                                <button 
                                    className='absolute -top-1 -right-1 text-white'
                                    onClick={() => handleDownload(file)}
                                    type='button'
                                >
                                    <DownloadIcon className="w-2 h-2" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <div 
                        className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className='max-w-[90vw] max-h-[90vh] rounded-lg overflow-hidden'>
                            <img 
                                src={selectedImage} 
                                alt="full-size"
                                className='max-w-full max-h-full object-contain'
                            />
                        </div>
                    </div>
                )}
            </div>
        );
        }
        export default MultiFileForm;
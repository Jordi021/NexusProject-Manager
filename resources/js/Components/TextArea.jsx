import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextArea({ className = '', isFocused = false, size = 'medium', ...props }, ref) {
    const textareaRef = ref || useRef();

    useEffect(() => {
        if (isFocused) {
            textareaRef.current.focus();
        }
    }, []);

    let sizeClass;
    switch (size) {
        case 'small':
            sizeClass = 'h-20';
            break;
        case 'medium':
            sizeClass = 'h-32';
            break;
        case 'large':
            sizeClass = 'h-48';
            break;
        default:
            sizeClass = 'h-32';
            break;
    }

    return (
        <textarea
            {...props}
            className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm resize-none ${sizeClass} ${className}`}
            ref={textareaRef}
        />
    );
});

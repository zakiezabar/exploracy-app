'use client';

interface CaptionProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}
const Caption: React.FC<CaptionProps> = ({
    title,
    subtitle,
    center
}) => {
    return ( 
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-4xl font-normal text-slate-300/50">
                {title}
            </div>
            <div className="font-light text-neutral-500 mt-2">
                {subtitle}
            </div>
        </div>
     );
}
 
export default Caption;
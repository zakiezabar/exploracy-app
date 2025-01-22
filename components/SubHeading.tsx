'use client';

interface SubHeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}
const SubHeading: React.FC<SubHeadingProps> = ({
    title,
    subtitle,
    center
}) => {
    return ( 
        <div className={center ? 'text-center' : 'text-start w-full col-span-1'}>
            <div className="text-base font-bold">
                {title}
            </div>
            <div className="text-sm font-light text-neutral-500">
                {subtitle}
            </div>
        </div>
     );
}
 
export default SubHeading;
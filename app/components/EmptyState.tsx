'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No activities available under this category",
    subtitle = "Try change to a different category",
    showReset
}) => {
    const router = useRouter();

    return (
    <div className="
        h-[40vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
    ">
        <Heading
            center
            title={title}
            subtitle={subtitle}
        />
        <div className="w-48 mt-4">
            {showReset && (
                <Button
                    outline
                    label="Show all"
                    onClick={() => router.push('/')}/>
            )}

        </div>
    </div> );
}
 
export default EmptyState;
'use client';

import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories = [
    {
        label: 'Outdoor adventures',
        icon: '/images/cat-mountain-master.png',
        description: 'Hiking, camping, rock or mountain climbing'
    },
    {
        label: 'Water activities',
        icon: '/images/cat-mountain-master.png',
        description: 'Kayaking, surfing, diving, fishing'
    },
    {
        label: 'Sports and games',
        icon: '/images/cat-mountain-master.png',
        description: 'Football, basketball, paintball, badminton'
    },
    {
        label: 'Fitness and wellbeing',
        icon: '/images/cat-mountain-master.png',
        description: 'Yoga, pilates, meditation, boot camps, gym'
    },
    {
        label: 'Cultural and Educational',
        icon: '/images/cat-mountain-master.png',
        description: 'Historical tours, museum, webinar'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname == '/';

    if (!isMainPage) {
        return null
    }
    
    return ( 
    <Container>
        <div className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        text-center	
        ">
          {categories.map((item) => (
            <CategoryBox
            key={item.label}
            label={item.label}
            selected={category == item.label}
            icon={item.icon}
            />
          ))}  
        </div>
    </Container>
    );
}
 
export default Categories;
'use client';

import Container from "../Container";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories = [
    {
        label: 'Outdoor adventures',
        icon: '/icons/category-outdoor.svg',
        description: 'Hiking, camping, rock or mountain climbing'
    },
    {
        label: 'Water activities',
        icon: '/icons/category-water-wanderer.svg',
        description: 'Kayaking, surfing, diving, fishing'
    },
    {
        label: 'Sports and fitness',
        icon: '/icons/category-sports.svg',
        description: 'Football, basketball, paintball, badminton, yoga, pilates, meditation, boot camps, gym'
    },
    {
        label: 'Indoor fun',
        icon: '/icons/category-indoor.svg',
        description: 'booard games, chess, cards, video games, escape rooms, karaoke, bowling, billiards, darts, table tennis, pool, foosball, laser tag, shooting, axe throwing, go-karting, trampoline park, roller skating, ice skating, bowling, mini golf, boot camps'
    },
    {
        label: 'Cultural and Educational',
        icon: '/icons/category-cultural.svg',
        description: 'Historical tours, museum, webinar'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null
    }
    
    return ( 
    <Container>
        <div className="text-2xl text-mono-900 font-bold py-4 ">
            Explore others
        </div>
        <div className="
        flex
        flex-row
        items-center
        gap-2
        overflow-x-auto
        text-center	
        ">
          {categories.map((item) => (
            <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
            />
          ))}  
        </div>
    </Container>
    );
}
 
export default Categories;
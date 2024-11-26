'use client';

import Container from "../Container";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories = [
    {
        label2: 'Pengembaraan dan aktiviti lasak',
        label: 'Outdoor adventures',
        icon: '/icons/category-outdoor.svg',
        description: 'Hiking, camping, rock or mountain climbing'
    },
    {
        label2: 'Aktiviti air',
        label: 'Water activities',
        icon: '/icons/category-water-wanderer.svg',
        description: 'Kayaking, surfing, diving, fishing'
    },
    {
        label2: 'Sukan dan kecergasan',
        label: 'Sports and fitness',
        icon: '/icons/category-sports.svg',
        description: 'Football, basketball, paintball, badminton, yoga, pilates, meditation, boot camps, gym'
    },
    {
        label2: 'Hiburan ruangan dalam',
        label: 'Indoor fun',
        icon: '/icons/category-indoor.svg',
        description: 'booard games, chess, cards, video games, escape rooms, karaoke, bowling, billiards, darts, table tennis, pool, foosball, laser tag, shooting, axe throwing, go-karting, trampoline park, roller skating, ice skating, bowling, mini golf, boot camps'
    },
    {
        label2: 'Kebudayaan dan pembelajaran',
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
        <div className="text-mono-900 font-bold py-4 flex flex-col">
            <p className="text-2xl ">
            Explore others&apos; activities
            </p>
        </div>
        <div className="
        flex
        flex-row
        align-top
        gap-2
        overflow-x-auto
        text-center	
        py-2
        ">
          {categories.map((item) => (
            <CategoryBox
            key={item.label}
            label={item.label}
            // label2={item.label2}
            selected={category === item.label}
            icon={item.icon}
            />
          ))}  
        </div>
    </Container>
    );
}
 
export default Categories;
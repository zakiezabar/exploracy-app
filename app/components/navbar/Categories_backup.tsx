'use client';

import Container from "../Container";
import { GiCampingTent } from "react-icons/gi";
import { TbKayak } from "react-icons/tb";
import { IoBasketballOutline } from "react-icons/io5";
import { IoMdFitness } from "react-icons/io";
import { LiaCitySolid } from "react-icons/lia";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories = [
    {
        label: 'Outdoor adventures',
        icon: GiCampingTent,
        description: 'Hiking, camping, rock or mountain climbing'
    },
    {
        label: 'Water activities',
        icon: TbKayak,
        description: 'Kayaking, surfing, diving, fishing'
    },
    {
        label: 'Sports and games',
        icon: IoBasketballOutline,
        description: 'Football, basketball, paintball, badminton'
    },
    {
        label: 'Fitness and wellbeing',
        icon: IoMdFitness,
        description: 'Yoga, pilates, meditation, boot camps, gym'
    },
    {
        label: 'Cultural and Educational',
        icon: LiaCitySolid,
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
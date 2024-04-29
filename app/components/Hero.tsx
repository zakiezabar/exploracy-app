"user client";

import Container from "./Container";

import Caption from "./Caption";

const Hero = () => {
  return (
    <div>
      <div className="relative flex flex-row gap-4 w-full">
          <div className="
            bg-hero
            w-full
            h-[300px]
          ">
            <div className="
              absolute
              bottom-0
              right-0
              justify-center
              p-2
            ">
              <Container>
               <Caption
               title="Different light to discover"
               />
              </Container>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Hero;

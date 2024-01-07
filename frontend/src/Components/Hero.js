import React from 'react';

const Hero = () => {
    return (
        <div className="bg-black text-white py-16 md:py-20 lg:py-32">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                <div className="flex flex-col w-full md:w-1/2 justify-center items-center md:items-start p-4 md:p-8">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl p-2 text-yellow-300 tracking-loose">
                    DynaTests
                    </h1>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl leading-relaxed md:leading-snug mb-2">
                         Featuring tests that suit you the best.
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg text-gray-50 mb-4">
                        Explore your favorite events and register now to showcase your talent and win exciting prizes.
                    </p>
                    <a
                        href="#"
                        className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
                    >
                        Explore Now
                    </a>
                </div>
                <div className="p-4 md:p-8 md:w-1/2 justify-center">
                    <div className="h-48 flex flex-wrap content-center">
                        <img
                            className="inline-block mt-8 md:mt-0 md:p-8 lg:p-0 w-full md:w-auto"
                            
                            alt="TechFest Image 1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;


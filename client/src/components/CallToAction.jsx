import React from "react";
import { Button } from "flowbite-react";
const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center
     rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 flex justify-center flex-col">
        <h2 className="text-2xl">
          Want to learn more about the MERN Stack Group of technologies?
        </h2>
        <p className="text-gray-500">
          Checkout these awesome resources with MERN JavaScript Projects.
        </p>
        <Button gradientDuoTone='purpleToPink' className="px-2 mt-5 rounded-tl-xl rounded-bl-none">
          <a 
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.tekstedia.com">
            MERN Stack Projects
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAg2n68y5tSKqRK_tw4ioZHQGT7zi1Piutng&usqp=CAU"
          alt="JavaScript"
        />
      </div>
    </div>
  );
};

export default CallToAction;

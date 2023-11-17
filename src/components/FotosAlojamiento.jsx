import { useState } from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {GoDotFill} from "react-icons/go";

const FotosAlojamiento = ({fotos}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? fotos.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === fotos.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const goToSlide = fotoIndex => {
        setCurrentIndex(fotoIndex);
    }

  return (
    <>
        <div className="h-full relative">
            <button className="absolute top-1/2 left-2 -translate-y-1/2 text-3xl font-bold text-white cursor-pointer bg-black rounded-full bg-opacity-20 hover:bg-opacity-30 md:p-1" onClick={goToPrevious}><IoIosArrowBack /></button>
            <button className="absolute top-1/2 right-2 -translate-y-1/2 text-3xl font-bold text-white cursor-pointer bg-black rounded-full bg-opacity-20 hover:bg-opacity-30 md:p-1" onClick={goToNext}><IoIosArrowForward /></button>
            <img className="w-full h-full object-cover" src={fotos[currentIndex]} alt="Foto de alojamiento" key={fotos} />
            <div className="flex justify-center my-2 gap-x-2">
                {fotos.map((foto, fotoIndex) => (
                    <button key={fotoIndex} className="cursor-pointer text-xl font-bold" onClick={() => goToSlide(fotoIndex)} >
                        {fotoIndex === currentIndex ? (
                            <GoDotFill className="text-primario" />
                        ) : (
                            <GoDotFill className="text-secundario" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    </>
  )
}

export default FotosAlojamiento
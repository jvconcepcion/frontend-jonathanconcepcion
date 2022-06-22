import Slider from "react-slick"

const CarouselComponent = ({ children }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true
  }
  
  return (
    <>
    <Slider {...settings}>
      {children}
    </Slider>
    </>
  )
}

export default CarouselComponent
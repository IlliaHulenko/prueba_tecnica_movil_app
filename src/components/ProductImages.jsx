import React, { useState } from 'react'

const images =[
    {
        id: 0, url:"https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: 1, url:"https://images.pexels.com/photos/1786433/pexels-photo-1786433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: 2, url:"https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: 3, url:"https://images.pexels.com/photos/1042143/pexels-photo-1042143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
]
const ProductImages = () => {
    const [index, setIndex] = useState(0);

    return (
      <div className="product-images-wrapper">
          <div className="product-images-container">
              <img 
                  src={images[index].url} 
                  sizes="50vw" 
                  alt="Phone" 
                  width={500} 
                  height={500} 
                  className="product-images-img" 
                  content="product-images-container-img"
              />
          </div>
          <div className="secondary-products-images-container">
              {images.map((image, index) => (
                  <div 
                      className="secondary-products-images" 
                      key={image.id}
                      onClick={() => setIndex(index)}
                  >
                      <img 
                          src={image.url} 
                          sizes="30vw" 
                          alt="Phone" 
                          width={200} 
                          height={200} 
                          className="product-images-img" 
                          content="product-images-container-img"
                      />            
              </div>
              ))}
          </div>       
      </div>
    )
}

export default ProductImages
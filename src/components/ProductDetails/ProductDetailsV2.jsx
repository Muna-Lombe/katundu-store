
import { ContentDetails, ContentPayment, PaymentType, PriceTag, DiscountInfo, BuyBtns, Faqs, OrderInfo, PinIco, PinLocation, Courier, PickupPoints, ContentViewer, ProductImageViewer } from '../';
import { PinIcon } from '../icons/otherIcons';
import RatingStars from '../RatingStars/RatingStars';

const ProductDetailsV2 = ({ productItem }) => {
  return (
    <ContentViewer>
      <section id="product-details" className="w-auto lg:w-full max-w-[60vw] flex flex-col lg:flex-row justify-between items-start gap-8">
        <ProductImageViewer images={productItem?.images}/>
        
        <ContentDetails 
          productName={productItem?.name}
          contentType={"product"}
        >
          <div className="flex flex-col gap-4">
            <RatingStars 
              rating={4.9} 
              reviewCount={28} 
              questionCount={191}
            />

            <div className="color-options">
              <h3 className="text-sm mb-2">Цвет: Синий, Зелёный, Серый</h3>
              <div className="flex gap-2">
                {productItem?.variations.map((variation, idx) => (
                  <div 
                    key={idx}
                    className="w-16 h-16 border rounded cursor-pointer hover:border-blue-500"
                  >
                    <img 
                      src={variation.image} 
                      alt={variation.color} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="size-selector">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm">Выберите размер:</h3>
                <button className="text-blue-500 text-sm">Таблица размеров</button>
              </div>
              <select className="w-full p-2 border rounded">
                <option>54 RU / 3XL</option>
              </select>
            </div>

            <div className="model-info text-sm text-gray-600">
              Модель: рост 183 см, 105/83/100. Размер на модели: 52
            </div>

            <div className="material-info">
              <h3 className="font-medium mb-2">О товаре</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <span className="text-gray-600">Материал</span>
                <span>Хлопок, Спандекс, Бамбуковое волокно</span>
                <span className="text-gray-600">Состав материала</span>
                <span>70% ХЛОПОК, 8% СПАНДЕКС, 22% БАМБУКОВОЕ ВОЛОКНО</span>
                <span className="text-gray-600">Коллекция</span>
                <span>Базовая коллекция</span>
                <span className="text-gray-600">Стиль</span>
                <span>Повседневный</span>
              </div>
            </div>
          </div>
        </ContentDetails>
      </section>

      <section id="product-price-details" className="w-fit">
        <ContentPayment>
          <PriceTag 
            tagFor={"product-variations"} 
            original={productItem?.oldPrice} 
            discount={productItem?.discountTag ? productItem?.new_price : false} 
            prodVars={productItem?.variations?.map(v => ({ id: v.uuid, stock: v.stock }))}
          />
          <DiscountInfo/>
          <BuyBtns 
            deliveryInfo={productItem?.deliveryOptions[0]} 
            id={productItem.uuid}
            prodVars={productItem?.variations.map(v=>({id:v.uuid, stock:v.stock}))}
          />
        </ContentPayment>
        <PaymentType>
          <Faqs />
          <OrderInfo>
            <span className="order-pin py-2">
              <PinIcon />
            </span>
            <span className="order-pin-points">
              <PinLocation />
              <span className="courier-points flex flex-col font-raleway lining-nums tabular-nums">
                <Courier />
                <PickupPoints />
              </span>
            </span>
          </OrderInfo> 
        </PaymentType>
      </section> 
    </ContentViewer>
  );
};

export default ProductDetailsV2; 
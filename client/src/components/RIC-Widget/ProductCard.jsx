import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../../../config.js';
import AvgRating from '../AvgRating.jsx';
import ActionButton from './ActionButton.jsx';

const ProductCard = ({ productId, index, listState, triggerDelete, triggerModal, offset }) => {
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState({default: 0, salePrice: null});

  const fetchProducts = async () => {
    let productData = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}`,
    { headers: { 'Authorization': auth.TOKEN } });

    let productStyles = await axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/products/${productId}/styles`,
    { headers: { 'Authorization': auth.TOKEN } });

    const product = productData.data;
    const firstStyle = productStyles.data.results[0];

    setCategory(product.category);
    setName(product.name);
    setImage(firstStyle.photos[0].thumbnail_url);
    setPrice({
      default: firstStyle.original_price,
      salePrice: firstStyle.sale_price
      });
  };

  useEffect(() => {
    fetchProducts().catch((err) => console.log(`Error fetching product info: ${err}`))
  }, [productId]);

  return (
    <div className='ProductCard' style={{ '--offset': offset }}>
      <ActionButton
        index={index}
        id={productId}
        listState={listState}
        triggerDelete={triggerDelete}
        triggerModal={triggerModal}/>

      <img className='ProductImage' src={image} alt={name}></img>
      <div className='ProductInfo'>
        <span id='prod-category'>{category}</span>
        <br />
        <b id='prod-name' /*onClick holder here*/>{name}</b>
        <br />
        {price.salePrice
          ? <span id="sale-price">${price.salePrice}<strike>${price.default}</strike> </span>
          : <span id='prod-price'>${price.default}</span>
        }
        <AvgRating
          productId={productId}/>
      </div>
    </div>
  );
};

export default ProductCard;

/*

onClick product name - navigate to detail page. Need to pass the productId back up to App and re-render page

Future Enhancements ???
*/
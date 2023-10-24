import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface ProductData {
  title: string;
  price: string;
  image: File | null;
}

function UploadProduct(): React.ReactElement {
  const [productData, setProductData] = useState<ProductData>({
    title: '',
    price: '',
    image: null,
  });
  const [foto, setFoto] = useState<string | null>('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setProductData({
      ...productData,
      image: file,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('price', productData.price);
    if (productData.image) {
      formData.append('image', productData.image);
    }

    try {
      const response = await axios.post('http://localhost:3000/upload', formData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error al subir producto:', error);
    }
  };

  const handleGetFoto = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getfoto');
      setFoto(response.data.imagepath);
    } catch (error) {
      console.error('Error al obtener la foto:', error);
    }
  };

  return (
    <div>
      <h2>Subir Producto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Título" onChange={handleInputChange} />
        <input type="text" name="price" placeholder="Precio" onChange={handleInputChange} />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Subir Producto</button>
      </form>
      <div>
        <button onClick={handleGetFoto}>
          Pedir foto
        </button>
        {foto && <img src={foto} alt="Foto" />}
      </div>
    </div>
  );
}

export default UploadProduct;

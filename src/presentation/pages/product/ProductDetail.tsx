import React, { useEffect, useState } from 'react';
import { IProduct } from '@/data/model/IProduct';
import { deleteAProduct, getASignleProducts } from '@/infra/http/client';
import Loading from '@/presentation/components/loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import defaultPhoto from '@/data/photo';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct>();
  const navigate = useNavigate();
  const handleUpdateProduct = async () => {
    navigate(`/products/edit/${productId}`);
  };
  const handleDeleteProduct = async () => {
    if (!productId) return;
    const res = await deleteAProduct(parseInt(productId, 10));
    if (res.status === 200) {
      navigate('/', { replace: true });
    }
  };
  useEffect(() => {
    (async () => {
      if (!productId) return;
      const res = await getASignleProducts(parseInt(productId, 10));
      setProduct(res.data);
    })();
  }, [productId]);
  return product && product?.id ? (
    <div className="min-w-screen min-h-screen flex items-center p-5 lg:p-10 overflow-hidden relative">
      <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <div className="md:flex items-center -mx-10">
          <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
            <div className="relative">
              <img
                src={product?.image || defaultPhoto}
                className="w-full relative z-10"
                alt="s"
              />
              <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-10">
            <div className="mb-10">
              <h1 className="font-bold text-2xl mb-5">{product.title}</h1>
              <p className="text-sm">{product.description}</p>
            </div>
            <div>
              <div className="inline-block align-bottom mr-5">
                <span className="text-2xl leading-none align-baseline">$</span>
                <span className="font-bold text-5xl leading-none align-baseline">
                  {product.price}
                </span>
              </div>
              <div className="inline-block align-bottom">
                <button
                  type="submit"
                  onClick={handleUpdateProduct}
                  className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
                >
                  <i className="mdi mdi-cart -ml-2 mr-2" /> Update
                </button>
                <button
                  type="submit"
                  onClick={handleDeleteProduct}
                  className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
                >
                  <i className="mdi mdi-cart -ml-2 mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ProductDetail;

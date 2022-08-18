import { ICreateProduct } from '@/data/model/IProduct';
import defaultPhoto from '@/data/photo';
import {
  addANewProduct,
  getASignleProducts,
  updateAProduct,
} from '@/infra/http/client';
import Loading from '@/presentation/components/loading/Loading';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ProductRegisteration: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigator = useNavigate();
  const fileInput = useRef() as MutableRefObject<HTMLInputElement>;
  const preview = useRef() as MutableRefObject<HTMLImageElement>;
  const [product, setProduct] = useState<ICreateProduct>({
    title: '',
    description: '',
    price: '',
    image: '',
  });
  const validateForm = () => {
    if (!product.title) {
      alert('상품명을 입력해주세요');
      return;
    }
    if (!product.description) {
      alert('상품 설명을 입력해주세요');
      return;
    }
    if (!product.price) {
      alert('상품 가격을 입력해주세요');
    }
  };
  const handleRegisterProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
    const res = await (isEdit
      ? updateAProduct(Number(productId), product)
      : addANewProduct(product));
    if (res.status === 200 || res.status === 201)
      navigator(`/products/${res.data.id}`, { replace: true });
  };

  const previewFile = () => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        preview.current.src = reader.result as string;
        setProduct((prev) => ({ ...prev, image: preview.current.src }));
      },
      false
    );
    if (fileInput?.current.files)
      reader.readAsDataURL(fileInput.current.files[0]);
  };
  const isNotNumber = (data: string) => {
    const regExp = /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    return regExp.test(data);
  };
  const handlePriceOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { data } = e.nativeEvent as InputEvent;
    if (data && isNotNumber(data)) {
      e.preventDefault();
      return;
    }
    setProduct({ ...product, price: e.target.value });
  };

  useEffect(() => {
    if (location.pathname.indexOf('add') !== -1) return;
    setIsEdit(true);
    setLoading(true);
    (async () => {
      const res = await getASignleProducts(Number(productId));
      setProduct(res.data);
      setLoading(false);
    })();
    return () => {
      setProduct({
        title: '',
        description: '',
        price: '',
        image: '',
      });
      setIsEdit(false);
      setLoading(false);
    };
  }, [isEdit, location.pathname, productId]);

  return loading || (isEdit && (!product || !product.title)) ? (
    <Loading />
  ) : (
    <div className="min-w-screen min-h-screen flex items-center p-5 lg:p-10 overflow-hidden relative">
      <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
        <form onSubmit={handleRegisterProduct}>
          <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div className="relative">
                <img
                  src={product.image || defaultPhoto}
                  className="w-full relative z-10"
                  ref={preview}
                  alt=""
                  width="600px"
                />
                <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0" />
              </div>
            </div>
            <div className="w-full md:w-1/2 px-5">
              <div className="mb-10">
                <label
                  className='className="font-bold text-xl mb-5"'
                  htmlFor="title"
                >
                  title
                  <input
                    id="title"
                    type="text"
                    value={product.title}
                    required
                    onChange={(e) =>
                      setProduct({ ...product, title: e.target.value })
                    }
                    className="mx-3 w-80 max-w-lg rounded-lg border border-black px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40 rounded-md"
                  />
                </label>
              </div>
              <div className="mb-10">
                <label
                  htmlFor="description"
                  className='className="font-bold text-xl mb-5"'
                >
                  description
                  <input
                    id="description"
                    type="text"
                    value={product.description}
                    required
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                    className="mx-3 w-80 max-w-lg rounded-lg border border-black px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40 rounded-md"
                  />
                </label>
              </div>
              <div className="mb-10">
                <label
                  htmlFor="price"
                  className='className="font-bold text-xl mb-5"'
                >
                  price
                  <input
                    id="price"
                    type="text"
                    value={product.price}
                    required
                    placeholder="$"
                    onChange={handlePriceOnChange}
                    className="mx-3 w-80 max-w-lg rounded-lg border border-black px-2 py-1 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40 rounded-md"
                  />
                </label>
              </div>
              <input
                type="file"
                ref={fileInput}
                onChange={previewFile}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <br />
              <button
                type="submit"
                className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
              >
                <i className="mdi mdi-cart -ml-2 mr-2" />{' '}
                {isEdit ? <>Update</> : <>Register</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductRegisteration;

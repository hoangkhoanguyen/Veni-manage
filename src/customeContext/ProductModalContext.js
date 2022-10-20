import { createContext, useMemo, useState } from "react";
import propTypes from "prop-types";

const ProductModalContext = createContext();

export function ProductModalProvider({ children }) {
  const initProductInfo = {};
  const [isOpenEditProductModal, setIsOpenEditProductModal] = useState(false);
  const [editProductInfo, setEditProductInfo] = useState(initProductInfo);
  const productModalValue = useMemo(
    () => ({
      isOpenEditProductModal,
      setIsOpenEditProductModal,
      editProductInfo,
      setEditProductInfo,
    }),
    [isOpenEditProductModal, setIsOpenEditProductModal, editProductInfo, setEditProductInfo]
  );
  return (
    <ProductModalContext.Provider value={productModalValue}>
      {children}
    </ProductModalContext.Provider>
  );
}

ProductModalProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default ProductModalContext;

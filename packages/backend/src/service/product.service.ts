import { Service } from "@app/core";
import { productAdaptor } from "../adaptor/product.adaptor.js";

export const productService = new Service.ProductService(productAdaptor);

// studio-1egacy-blog/schemaTypes/index.ts
import {postType} from './postType'
import {linajeType} from './linajeType'
import {productType} from './productType'
import {variantType} from './variantType'
import {authorType} from './authorType';
 // <-- 1. Importa la nueva plantilla

export const schemaTypes = [
  postType,
  linajeType,
  productType,
  variantType,
  authorType, // <-- 2. Añádela a la lista
]
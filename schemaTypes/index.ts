// studio-1egacy-blog/schemaTypes/index.ts
import {postType} from './postType'
import {linajeType} from './linajeType'
import {productType} from './productType'
import {variantType} from './variantType'
import {authorType} from './authorType';
import {topicType} from './topicType';
import {categoryType} from './categoryType' 
import {legacyPage} from './legacyPage'
// 1. IMPORTARLO
import order from './order'

export const schemaTypes = [
  postType,
  linajeType,
  productType,
  variantType,
  authorType, // <-- 2. Añádela a la lista
  topicType,
  categoryType,
  legacyPage,
  // 2. AGREGARLO A LA LISTA
  order
]
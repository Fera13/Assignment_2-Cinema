export function kebabify(str) {
  return str
    .toLowerCase()                   // to small letters
    .normalize('NFD')                // convert so that diacritics are separate
    .replace(/\p{Diacritic}/gu, '')  // remove diacritics
    .replace(/\s/g, '-')             // replace whitespaces with hyphens
    .replace(/[^\w-]/g, '')          // remove everything except \w [a-z0-9] and '-'
}
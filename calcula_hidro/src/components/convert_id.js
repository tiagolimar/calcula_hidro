export const convert_id = (text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(' ','_').replace('.','')
}

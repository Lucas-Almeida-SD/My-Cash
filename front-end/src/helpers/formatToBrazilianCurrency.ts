export default (value:number):string => (
  value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
);

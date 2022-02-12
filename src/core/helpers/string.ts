import path from 'path';
import numeral from 'numeral';
export function url(baseURL: string, ...segments: string[]) {
  return `${baseURL}/${path.join(...segments)}`;
}

export function formatNumber(value: any) {
  if(value===null||value===''||value===undefined) return '---';
  return numeral(value).format('0,0.[0000]');
}
export function formatMoneyBySuffix(value?: any, prefix: string='', suffix: string='') {
  if(value===null||value===''||value==='---'||value===undefined) return '---';
  let isNegative=false;
  if(value.toString().indexOf('-')===0){
    isNegative=true;
    value = value.toString().replace('-','');
  }
  return `${isNegative?'-':''}${prefix}${formatNumber(value)}${suffix}`;
}
export function formatMoneyByUnit(value?: any, unit?: string) {
  if(value===null||value===''||value==='---'||value===undefined) return '--';
  let suffix='';
  let prefix='';
  if(unit==='CNY')
    prefix='¥';
  else
    suffix='₫';
  return formatMoneyBySuffix(value,prefix,suffix);
}
export function formatNumberDay(value: any) {
  return `${formatNumber(value)} ngày`;
}

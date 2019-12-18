declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.module.scss" {
  const styles: { [className: string]: string };
  export default styles;
}

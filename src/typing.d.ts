// CSS modules
type CSSModuleClasses = { readonly [key: string]: string };

declare module "*.module.css" {
  const classes: CSSModuleClasses;
  export default classes;
}

// images
declare module "*.png" {
  const src: string;
  export default src;
}

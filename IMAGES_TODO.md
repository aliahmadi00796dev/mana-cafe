# تصاویر محصولات / Product images

**وضعیت: هیچ‌کدام از ۵۱ محصول هنوز عکس واقعی ندارد.**
در محیطی که این پروژه ساخته شد دسترسی به اینترنت وجود نداشت، پس عکسی از Unsplash/Pexels دانلود نشد.
هر محصول موقتاً تصویر SVG هم‌دسته (`public/images/categories/<category>.svg`) را نشان می‌دهد و در داده‌ها `imagePlaceholder: true` دارد.

## چطور جایگزین کنیم
1. برای هر محصول یک عکس مربع و مجاز (Unsplash/Pexels) انتخاب کنید و به WebP تبدیل کنید (حدود ۸۰۰×۸۰۰).
2. در `public/images/products/<category>/<slug>.webp` ذخیره کنید.
3. در `src/data/products.ts` مسیر `image` را عوض و `imagePlaceholder` را `false` کنید (یا از داشبورد دمو مسیر را تست کنید).
4. منبع، عکاس و لایسنس را در `public/images/ATTRIBUTION.md` ثبت کنید.

اسلاگ همهٔ محصولات: `src/data/products.ts`.

# مانا (MANA CAFÉ)

وب‌سایت فارسی کافه، پروژهٔ نمایشی PANDORUNT. Next.js (App Router) + TypeScript + Tailwind، خروجی استاتیک برای GitHub Pages.

## نصب و اجرا
```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck && npm run lint
npm run build        # خروجی استاتیک در out/
```

## انتشار روی GitHub Pages
1. ریپازیتوری بسازید (پیشنهاد: `mana-cafe`) و کد را روی شاخهٔ `main` پوش کنید.
2. Settings → Pages → Source: **GitHub Actions**.
3. ورک‌فلو `.github/workflows/deploy.yml` نام ریپازیتوری را خودکار از `github.event.repository.name` می‌خواند و `NEXT_PUBLIC_BASE_PATH=/<repo>` را تنظیم می‌کند. هیچ نامی در کد ثابت نیست.
4. بیلد محلی برای زیرمسیر: `NEXT_PUBLIC_BASE_PATH=/mana-cafe NEXT_PUBLIC_SITE_URL=https://USERNAME.github.io/mana-cafe npm run build`

## ساختار
`src/data` داده‌ها · `src/services/catalog.ts` رابط دسترسی به داده · `src/hooks` ذخیره‌سازی محلی · `src/components` رابط · `src/app` صفحه‌ها.

## داشبورد نمایشی
`/admin/` بدون ورود و **ناامن** است؛ تغییرات فقط در LocalStorage همان مرورگر (کلیدهای `mana_*`) می‌ماند. صفحه‌های جزئیات محصول در زمان بیلد ساخته می‌شوند، پس محصول جدیدِ افزوده‌شده از داشبورد در منو دیده می‌شود ولی صفحهٔ جزئیات ندارد.

## مهاجرت به بک‌اند
یک پیاده‌سازی جدید از `CatalogService` بنویسید (API/DB)، هوک‌های `src/hooks/useCatalog.ts` را به آن وصل کنید و احراز هویت واقعی سمت سرور اضافه کنید.

## محدودیت‌های شناخته‌شده
- عکس واقعی محصولات وجود ندارد؛ نگاه کنید به `IMAGES_TODO.md`.
- متن لوگو به path تبدیل نشده و با فونت Vazirmatn/Tahoma نمایش داده می‌شود؛ برای نسخهٔ نهایی در Figma/Inkscape outline کنید.
- عکس هیرو جایگزین گرافیک SVG است.

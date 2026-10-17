# Investedia: move off Yahoo data (approved 2026-10-17, option 1)

## Step 1 · Ask TradingView (owner sends; Claude can't send messages for you)
Form: https://www.tradingview.com/widget-docs/contact/ (or tradingview.com → Support → Widgets)

> Subject: Permission to embed free widgets on an educational website
>
> Hello TradingView team,
>
> I run investedia.com, a free investing-education website (Belgium, EU) operated by my small company, Guidify LLC. We currently show no ads, sell nothing and give no investment advice; the site explains markets to beginners.
>
> We would like to embed your free widgets (Advanced Chart, Symbol Overview, Ticker Tape, Market Overview, Screener) with the default TradingView branding and attribution kept visible.
>
> Your Terms of Use (section 3) say commercial use requires a separate agreement. Could you confirm in writing:
> 1. Whether this use on an educational site run by a company is allowed with the free widgets, and
> 2. If we later add ads or affiliate links, which agreement or plan we would need.
>
> Thank you,
> [Your name]
> investedia.com

## Step 2 · After a written yes (Claude does this, one commit per page group)
Today all 30 pages read prices for 243 symbols from assets/quotes.js, written by update_market.py from Yahoo's unofficial endpoint.
1. Asset page: main chart → TradingView Advanced Chart widget (symbol map from the existing YAHOO table).
2. Header: Ticker Tape widget; Markets/indices/stocks/crypto/currencies/commodities pages: Market Overview / Symbol Overview widgets.
3. Screener page → TradingView Screener widget.
4. Pages that compute from raw prices (calculator, compare, watchlist, dashboard): keep only what can work without raw prices, or use FRED (with its notice) for macro series.
5. Turn off the Yahoo calls in update_market.py / update_prices.py and their workflows; remove sample-price fallbacks so the site never shows made-up prices.
6. Update the footer source line; run build.py; check every page on phone and desktop.

## If TradingView says no (or only for non-commercial)
Get a quote for a licensed API that explicitly includes public display, or show only own content + FRED charts + links out. Until then the Yahoo setup stays as is (switching it off now would make the site show sample prices).

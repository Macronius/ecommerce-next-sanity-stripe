npx create-next-app

https://github.com/adrianhajdin/ecommerce_sanity_stripe/blob/main/package.json
switch dependencies to match the repo (versions)

npm install --legacy-peer-deps

Then: npm run dev - to run Sanity Studio

Other helpful commands
sanity docs - to open the documentation in a browser
sanity manage - to open the project settings in a browser
sanity help - to explore the CLI manual
╭────────────────────────────────────────────────────────────╮
│ │
│ To learn how commands have changed from Studio v2 to v3, │
│ see https://www.sanity.io/help/studio-v2-vs-v3 │
│ │
╰────────────────────────────────────────────────────────────╯
TODO: LOGIC

### [ ] - manage state with react context (single source) & localStorage

[ ] add items to the cart
[ ] purchase right away
[ ] change quantities
[ ] updating number of items in cart
[ ] display cart components

TODO: double check if sanity > schemas > schema.js file is actually needed. it seems like index.js is doing the job. Not sure why there is a difference, possibly a version delta, but I'm also unsure how that happened.

TODO: would make sense to change Product component name to ProductCard. This would conform to a style/convention that I

TODO: change the color scheme from red to \_\_whatever

TODO: debug - cart total reflects total items, not total unique items (is this ok?)

TODO: debug - from slug page, if toggle quantity to different number other than one, does not reset for a new item, remains changed number

TODO: debug - StateContext issue where updating cart item quantity changes original order
https://github.com/adrianhajdin/ecommerce_sanity_stripe/pulls

TODO: the redirecting toast everywhere would be nice

TODO:

## NOTE next.js

NOTE: whenever you're fetching data from an api or from a cms, use the getServerSideProps() function to prerender the page

NOTE: in \_app.js, the <Component {...pageProps} />

NOTE: With regard to pages > \_app.js, whenever you use <Component {...pageProps} />, in this case with the <Layout> wrapper, <Layout> has acces to to what is passed inside by destructuring children

NOTE: pages > api essentially serves the entire backend (server) of the application, which is not rendered on the front end

NOTE: with regard to stripe checkout from cart process...
essentially created one instance of a checkout. This specific user is going to be on that specific instance and it will be kept in the backend, even after they're gone, so if they want to return later and continue with a purchase, they will be able to do so.

### getStaticProps()

if you export a function called 'getStaticProps' (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by 'getStaticProps'

When to use:

- data required to render the page is available at build time ahead of a user's request
- the data comes from a headless CMS
- the data can be publicly cahced (not user specific)
- the page must be pre-rendered (for SEO) and be very fast
  NOTE: 'getStaticProps' generates HTML and JSON files, both of which can be cached by a CDN for performance
  https://nextjs.org/docs/basic-features/data-fetching/get-static-props

NOTE: when using getStaticProps(), must also use getStaticPaths()

### getStaticPaths()

if a page has Dynamic Routes and uses getStaticProps(), it needs to define a list of paths to be statically generated.

- getStaticPaths MUST be used with getStaticProps. You CANNOT use it with getServerSideProps
- this is a Next.js optimization requirement

# Q U E S T I O N S:

QUESTION: why does it matter what argument name a component receives when it is then destructured immediately?

QUESTION: with regard to StateContext being passed into each individual product page, how does qty distinguish between one product's quantity versus another product's quantity?
Or do I misunderstand the nature of qty?

# E R R O R S

v3:1 Uncaught (in promise) IntegrationError: Missing value for Stripe(): apiKey should be a string.
at ee (v3:1:79577)
at te (v3:1:79649)
at new e (v3:1:340236)
at Bs (v3:1:377738)
at initStripe (stripe.esm.js?ef25:101:1)
at eval (stripe.esm.js?ef25:125:1)
at async handleCheckout (Cart.jsx?a2f4:32:20)

- VM8212:1 Uncaught (in promise) SyntaxError: Unexpected token 'I', "Invalid AP"... is not valid JSON
- VM8429:1 Uncaught (in promise) SyntaxError: Unexpected token 'Y', "You did no"... is not valid JSON
- VM10398:1 Uncaught (in promise) SyntaxError: Unexpected token 'R', "Received u"... is not valid JSON

figure out how to serve rails app from here
look at Gumroad code a bit to see if it is the same SPA no matter the page <---------
how to disable scripts on a page?
compare "/products" with other gumroad pages

query to find SSR React Components
    $(".react-entry-point")

Component IDs look like this
    id="Profile-react-component-917d145d-7efd-4187-83ee-2724cca20e2e"


React Components Per Page
=========================

app.gumroad.com/dashboard - Home
    components: Nav, DashboardPage

app.gumroad.com/products - Products
    components: Nav, SearchPopover, ProductsPage

app.gumroad.com/checkout/discounts - Checkout
    components: Nav, DiscountsPage

app.gumroad.com/posts - Emails
    components: Nav, SearchPopover, PostsPreviewPopover, PostsPublishPopover

app.gumroad.com/workflows - Workflows
    components: Nav, WorkflowsPage

app.gumroad.com/customers - Sales
    components: Nav, AudienceCustomersPage

app.gumroad.com/dashboard/sales - Analytics
    components: Nav, AnalyticsProductsPopover, DateRangePicker, AnalyticsSalesStats, AnalyticsLocationsTable

app.gumroad.com/balance - Payouts
    components: Nav, 

discover.gumroad.com - Discover
    components: Discover

app.gumroad.com/library - Library
    components: Nav, LibraryPage

help.gumroad.com - Help
    hosted by helpscout: https://www.helpscout.com/knowledge-base/?co=Gumroad&utm_source=docs&utm_medium=footerlink&utm_campaign=Docs+Branding

---------

gumroad.gumroad.com/
    ref: https://gumroad.gumroad.com/
    newsletter for Products? you can subscribe in top right
    components:
        - id="Profile-react-component-917d145d-7efd-4187-83ee-2724cca20e2e"

gumroad.gumroad.com/posts
    blog posts you can subscribe to
    components:
        - id="ProfilePostsPage-react-component-fc96d9a5-08b4-4bc4-85d0-deccefc0bf2d"

app.gumroad.com/d
    page to display digital product
    e.g. https://app.gumroad.com/d/7131090ae72e4a75e85458a378a40433
    components:
        - id="DownloadPageWithContent-react-component-f4cb331a-5d25-41de-8734-662695ce7ebe"



This is the library that is used:
    https://github.com/shakacode/react_on_rails/

Find out if Gumroad uses Redux
    it looks like it does

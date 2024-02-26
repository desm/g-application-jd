Given user is on the page: New Product (/products/new)
When user clicks on: "Next: Customize"
Then a POST is sent to /links
    With payload 001-p
    And the response {success: true, redirect_to: '/products/tsxsi/edit'}
Then a GET is made to /products/tsxsi/edit
That redirects to the page: Edit Product (/products/tsxsi/edit)

Given user is on the page: Edit Product (/products/tsxsi/edit)
    And the tab is: Product
    And the product is not published
When user clicks on: "Save and continue"
Then an XHR POST is sent to /links/tsxsi.json
    With payload 002-p
    And the response is 002-r
And the URL changes to /products/tsxsi/edit#content

Given user is on the page: Edit Product (/products/tsxsi/edit)
    And the tab is: Content
    And the product is not published
When user clicks on: "Save changes"
Then an XHR POST is sent to /links/tsxsi.json
    With payload 003-p (same shape as 002-p)
    And the response is 003-r (same shape as 002-r)

Given user is on the page: Edit Product (/products/tsxsi/edit)
    And the tab is: Content
    And the product is not published
When user clicks on: "Publish and continue"
Then an XHR POST is sent to /links/tsxsi.json
    With payload 004-p (same shape as 002-p)
    And the response is 004-r (same shape as 002-r)
Then a POST is sent to /links/tsxsi/publish
    With NO payload
    And the response is {"success": true}
Then the URL changes to /products/xmyiv/edit#share

POST /links
    - 001-p
    - redirect
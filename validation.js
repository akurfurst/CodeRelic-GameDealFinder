export function validateForm(data){

    const errors = [];

    // {
    //     title: 'test',
    //     price: '10',
    //     original_price: '5',
    //     deal_url: 'https://github.com/akurfurst/CodeRelic-GameDealFinder',
    //     promo_code: 'ffff',
    //     expiry_date: '2026-04-01',
    //     platform: [ 'steam' ]
    // }

    //if no title
    if(data.title.trim() == "") errors.push("Title is required");

    //if title is too long
    if(data.title.length >= 50) errors.push("Title too long");

    //if no price
    if(data.price.trim() == "") errors.push("Price is required");
    
    //if price is negative
    if(parseFloat(data.price) < 0) errors.push("Price cannot be negative");

    //if no original price
    if(data.original_price == "") errors.push("Original Price is required");

    //if original price is smaller than price
    if(parseFloat(data.original_price) <= parseFloat(data.price)) errors.push("Original price must be more than discounted price");

    //check if valid html link
    if(!data.deal_url.startsWith("https://")) errors.push("Invlaid link");

    //if deal link is too long
    if(data.deal_url.length >= 200) errors.push("Deal link too long");

    //if promo code is too long
    if(data.promo_code.length >= 50) errors.push("Promo code is too long");

    //make sure platform is valid
    const platforms = ["steam", "xbox", "sony", "epic", "nintendo"];
    if(!data.platform || data.platform.length === 0) errors.push("At least one platform is required");
    return{
        isValid: errors.length === 0,
        errors
    };
}
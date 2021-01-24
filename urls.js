function scrape_list (barcode) {
  let scrape_list = [{
      name: 'Pharmacy 295',
      url: `https://www.pharmacy295.gr/el/catalog?query=${barcode}&utf8=✓`,
      class: '.final-price'
    },
    {
      name: 'Phavory',
      url: `https://www.phavory.com/search/${barcode}.htm`,
      class: '.fPrice'
    }
  ]
  return scrape_list
}

module.exports.scrape_list = scrape_list
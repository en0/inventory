'use strict';

const REGION = 'en_US'; //en_GB
const PRODUCT_URL = `https://www.youngliving.com/${REGION}/products`;
const Client = require('node-rest-client').Client;
const cheerio = require('cheerio');
const async = require('async');

var urls = [];
var library = [];
var products = {};
var groups = {};

async.waterfall([
    getUrls,
    processEach,
    compile
], function(err, data) {
    if(err)
        return console.error("FAILED", err);

    console.info(JSON.stringify(products, null, 4));

    console.error('Completed -----------------------------------');
    console.error(` - REGION: ${REGION}`)
    console.error(` - Found ${Object.keys(products).length} products.`);
});

function getUrls(done) {
    console.error("Retrieving product groups...");
    var client = new Client();
    client.get(PRODUCT_URL, function(data) {
        var $ = cheerio.load(data.toString());
        
        $('.product-links').each(function(_, node) {
            $('a', node).each(function(_, a) {
                if('href' in a.attribs) {
                    var href = `https://www.youngliving.com${a.attribs.href}`
                    urls.push(href);
                }
            });
        });
        done();

        console.error(`Found ${urls.length} product group(s).`);
    });
}

function processEach(done) {
    console.error('---------------------------------------------');
    async.eachSeries(urls, loadProductGroup, done);
}

function compile(done) {

    console.error("Compiling product list...");

    for(var i = 0; i < library.length; i++) {
        var _item = library[i];
        var c = products[_item.code] || {
            title: _item.title,
            image: _item.image,
            groups: [],
            categories: []
        };

        if(c.groups.indexOf(_item.group) < 0)
            c.groups.push(_item.group);

        if(c.categories.indexOf(_item.category) < 0)
            c.categories.push(_item.category);

        products[_item.code] = c;

        var g = groups[_item.group] || [];
        if(g.indexOf(_item.category) < 0)
            g.push(_item.category);

        groups[_item.group] = g;
    }
    done();
}

function loadProductGroup(item, callback) {
    var client = new Client();
    var _itemSplit = item.split('/');

    var category = _itemSplit.pop();
    var group = _itemSplit.pop();

    console.error(`Fetching product group: ${group}/${category}`);

    client.get(item, function(data) {
        var $ = cheerio.load(data.toString());
        var x = $('.product-thumb').each(function(i, node) {
            var u = $('.product-thumb-bg', node).css('background-image');
            library.push({
                title: $('.title', node).text(),
                image: formatImage(u),
                code: getCodeFromImageUrl(u),
                group: group,
                category: category
            });
        });
        callback();
    })
}

function formatImage(url) {
    var i1 = url.indexOf('(')+1;
    var i2 = url.lastIndexOf(')');
    return url.substr(i1, i2 - i1);
}

function getCodeFromImageUrl(url) {
    var i1 = url.lastIndexOf('/')+1;
    var i2 = url.lastIndexOf('.');
    return url.substr(i1, i2 - i1);
}

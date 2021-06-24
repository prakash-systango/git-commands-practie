var express = require('express'); 
var app = express();
var fs = require('th'); 

// Endpoint to Get a list of Product_Details
app.get('/get/Product_details', function(req, res){
    fs.readFile(__dirname + "/" + "productDetails.json", 'utf8', function(err, data){
      
        var Product_details = JSON.parse(data);
        let table = require("table");
        var table_Data = []    
        let table_header = [ 'Product', 'Country', 'CostPrice' ,"Tax Percentage"]
        table_Data.push(table_header)
        var country_Data = Product_details.map(MapProductDetails)
        var config;
        function MapProductDetails(data) {
            var rows = []
           
            rows.push(data.name)
            rows.push(data.country)
            rows.push(data.costPrice)
            rows.push(data.tax)
            table_Data.push(rows)
            
         }
           
            
        config = {
        
        // Predefined styles of table
        border: table.getBorderCharacters("ramac"),
        }
            
        let Data_Tabuler_format = table.table(table_Data, config);
        res.end(Product_details); 
    });
})

// Endpoint to Get a list of Product_Details with Sales_tax and MarketPrice
app.get('/get/SalesTaxAmount', function(req, res){
    fs.readFile(__dirname + "/" + "productDetails.json", 'utf8', function(err, data){
      
        var Product_details = JSON.parse(data);
        let table = require("table");
        var table_Data = []    
        let table_header = [ 'Product', 'Country', 'CostPrice' ,"Tax Percentage","Sales_Tax_Amount","Market_Price"]
        table_Data.push(table_header)
        var country_Data = Product_details.map(MapProductDetails)
        var config;
        function MapProductDetails(data) {
            var rows = []
            var sales_taxes = parseInt(data.costPrice)*parseInt(data.tax)/100
            var market_price = parseInt(sales_taxes)+parseInt(data.costPrice)
           
            rows.push(data.name)
            rows.push(data.country)
            rows.push(data.costPrice)
            rows.push(data.tax)
            rows.push(sales_taxes)
            rows.push(market_price)

            table_Data.push(rows)
            
         }
           
            
        config = {
        
        // Predefined styles of table
        border: table.getBorderCharacters("ramac"),
        }
            
        let Data_Tabuler_format = table.table(table_Data, config);
        res.end(Data_Tabuler_format); 
    });
})


app.get('/get/country/product', function(req, res){
    fs.readFile(__dirname + "/" + "productDetails.json", 'utf8', function(err, data){
      
        var Product_details = JSON.parse(data);
        let table = require("table");
        var table_Data = []    
        let table_header = [ 'Product', 'Country']
        table_Data.push(table_header)
        var country_Data = Product_details.map(MapProductDetails)
        var config;
        function MapProductDetails(data) {
            var rows = []
         
           
            rows.push(data.name)
            rows.push(data.country)
            table_Data.push(rows)
            
         }
           
            
        config = {
        
        // Predefined styles of table
        border: table.getBorderCharacters("ramac"),
        }
            
        let Data_Tabuler_format = table.table(table_Data, config);
        res.end(Data_Tabuler_format); 
    });
})


app.get('/get/product_Details/json', function(req, res){
    fs.readFile(__dirname + "/" + "productDetails.json", 'utf8', function(err, data){
      
        
        res.end(data); 
    });
})












// Create a server to listen at port 8080
var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Api demo", host, port)
})

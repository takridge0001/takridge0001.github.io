const axios = require('axios');
const nodemailer = require('nodemailer');



// Set information

const debug = false;

const caliber = [
	{size: '5.7x28mm', limit: 50.0},
	{size: '.45 ACP', limit: 30.0},
	{size: '.380 ACP', limit: 30.0}
];

const brand = [
	'Federal',
	'FNH'
];

const check = [
	{caliber: 0, brand: 0, type: 'AE TMJ', site: 'https://grabagun.com/federal-5-7x28-40gr-speer-tmj-50-rounds.html', text: 'Out of stock'},
	{caliber: 0, brand: 0, type: 'AE TMJ', site: 'https://www.targetsportsusa.com/federal-american-eagle-57x28mm-ammo-40-grain-total-metal-jacket-ae5728a-p-3549.aspx', text: 'out of stock'},
	{caliber: 0, brand: 0, type: 'AE TMJ', site: 'https://www.ammosupplywarehouse.com/west/index.php?main_page=product_info&products_id=20054', text: 'out of stock'},
	{caliber: 0, brand: 1, type: 'SS195LF JHP', site: 'https://lowestammo.com/handgun-ammo/5-7x28mm/fnh-usa-5-7x28mm-ammunition-ss195lf-27-gr-lead-free-jacketed-hollow-point-50-rounds/', text: 'out of stock'},
	{caliber: 0, brand: 0, type: 'AE TMJ', site: 'https://alamoammo.com/pistol-ammo/5.7x28mm/5.7x28mm-federal-american-eagle-40-gr-fmj-50-rnds-m-id-ae5728a-upc-029465063122', text: 'out of stock'},
	{caliber: 1, brand: 0, type: 'Aluminum FMJ', site: 'https://palmettostatearmory.com/federal-champion-45-acp-230-gr-fmj-aluminum-cased-50-rounds-cal45230.html?avad=74383_e1c612e4d&utm_source=Avantlink&utm_medium=Referral&utm_campaign=cl', text: 'Notify When In Stock'}
];

const regexPrice = [/[Pp][Rr][Ii][Cc][Ee].*[\">\:\n]+\$(\d+\.\d+)/];



// Execute the checks

let rows = [];
let errors = [];
let getSites = [];

for (i = 0; i < check.length; i++) {
	getSites.push(
		getSite(check[i], rows)
		.catch(function (error) {
			console.log(error); errors.push(error);
		})
	);
}

Promise.all(getSites).then(() => sendEmail(rows));



// Functions

function getSite(item, rows) {
	return axios.get(item.site)
	  .then(response => {
		  const paa = getPriceAndAvailability(response, item);
		  if (typeof paa !== 'undefined') {
		  	rows.push(paa);
		  }
		})
	  .catch(function (error) {
		console.log(error);
		return Promise.reject(error);
	  });
}

function getPriceAndAvailability(response, item) {
  	let outOfStock = false;
  	let price = 0.0;

	if (response.data.toLowerCase().indexOf(item.text.toLowerCase()) > -1) {
		outOfStock = true;
	}

	for (r = 0; r < regexPrice.length; r++) {
		var matches = response.data.match(regexPrice[r]);
		if (matches != null && matches.length > 1) {
			for (m = 1; m < matches.length; m++) {
				price = parseFloat(matches[m]);
			}
		}
	}

	if (debug || !outOfStock && price < caliber[item.caliber].limit) {
		return '<tr style="border-width: 1px; border-style: solid; bolor-color: black;"><td>' + (outOfStock ? 'OUT' : 'IN') + '</td><td>' + caliber[item.caliber].size + '</td><td><a href="' + item.site + '">' + brand[item.brand] + ' ' + item.type + '</a></td><td>' + price + '</td></tr>';
	}
}

function sendEmail(rows) {
	let html = '<table style="border-width: 1px; border-style: solid; bolor-color: black;">' +
		'<tr style="border-width: 1px; border-style: solid; bolor-color: black;"><th>Stock</th><th>Caliber</th><th>Type</th><th>Price</th></tr>';

	if (rows.length > 0) {
		rows.forEach(function (item) {html += item;});
	}

	html += '</table>';

	if (errors.length > 0) {
		html += '<br /><br />Errors:<br /><ul>';
		errors.forEach(function (item) {html += '<li>' + item + '</li>'});
		html += '</ul>';
	}

	const transporter = nodemailer.createTransport({
		host: 'smtp-relay.sendinblue.com',
		port: 587,
		auth: {
		  user: 'mercilessltd@gmail.com',
		  pass: 'vbnT8P0dBfcVtYN1'
		}
	  });
  
	  const mailOptions = {
		from: 'mercilessltd@gmail.com',
		to: 'mercilessltd@gmail.com',
		subject: 'Daily Availability',
		html: html
	  };
  //console.log(html);
	  transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  });
}
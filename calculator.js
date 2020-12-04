import cybersourceRestApi from 'cybersource-rest-client';
import configuration from './configuration';

const calculator = (callback) => {
	console.log('Entered calculator');
	try {
		var configObject = configuration();
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.TaxRequest();

		var clientReferenceInformation = new cybersourceRestApi.Vasv2taxClientReferenceInformation();
		clientReferenceInformation.code = 'TAX_TC001';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var taxInformation = new cybersourceRestApi.Vasv2taxTaxInformation();
		taxInformation.showTaxPerLineItem = 'Yes';
		requestObj.taxInformation = taxInformation;

		var orderInformation = new cybersourceRestApi.Vasv2taxOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.RiskV1DecisionsPost201ResponseOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Vasv2taxOrderInformationBillTo();
		orderInformationBillTo.address1 = '1 Market St';
		orderInformationBillTo.locality = 'San Francisco';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.postalCode = '94105';
		orderInformationBillTo.country = 'US';
		orderInformation.billTo = orderInformationBillTo;


		var lineItems =	new Array();
		var	lineItems1 = new cybersourceRestApi.Vasv2taxOrderInformationLineItems();
		lineItems1.productSKU = '07-12-00657';
		lineItems1.productCode = '50161815';
		lineItems1.quantity = 1;
		lineItems1.productName = 'Chewing Gum';
		lineItems1.unitPrice = '1200';
		lineItems.push(lineItems1);

		var	lineItems2 = new cybersourceRestApi.Vasv2taxOrderInformationLineItems();
		lineItems2.productSKU = '07-12-00659';
		lineItems2.productCode = '50181905';
		lineItems2.quantity = 1;
		lineItems2.productName = 'Sugar Cookies';
		lineItems2.unitPrice = '1240';
		lineItems.push(lineItems2);

		var	lineItems3 = new cybersourceRestApi.Vasv2taxOrderInformationLineItems();
		lineItems3.productSKU = '07-12-00658';
		lineItems3.productCode = '5020.11';
		lineItems3.quantity = 1;
		lineItems3.productName = 'Carbonated Water';
		lineItems3.unitPrice = '9001';
		lineItems.push(lineItems3);

		orderInformation.lineItems = lineItems;

		requestObj.orderInformation = orderInformation;


		var instance = new cybersourceRestApi.TaxesApi(configObject, apiClient);

		instance.calculateTax( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error, null, 2));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data, null, 2));
			}

			console.log('\nResponse : ' + JSON.stringify(response, null, 2));
			console.log('\nResponse Code of Calculate Taxes : ' + JSON.stringify(response['status'], null, 2));
			callback(error, data, response);
		});
	}
	catch (error) {
		console.log('\nException on calling the API : ' + error);
	}
};

export default calculator;

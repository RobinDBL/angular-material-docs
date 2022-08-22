import * as http from 'axios';
import { JSDOM } from 'jsdom';

export class HttpService {

constructor(private axios = http.default) { }

async getComponents() {
    // Fetch the angular-material component lists from their github page
	let res = await this.axios.get("https://github.com/angular/components/tree/main/src/material");
	// Get the html code
    let html = res.data;

    // Parse the html code
	const dom = new JSDOM(html);
    // Get all component "folders" from the html code
	const components: Element[] = Array.from(
		dom.window.document.getElementsByClassName('js-navigation-open Link--primary'),
		  );
	console.log(components);
}

}
